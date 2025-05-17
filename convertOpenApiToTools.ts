import { parse as ymlParse } from "yaml";
import type { OpenAPI } from "openapi-types";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from "fs";

const getOpenApiYmlFromUrl = async (url: string) => {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const openApi = ymlParse(text) as OpenAPI.Document;
    return openApi;
  } catch (err) {
    console.error("err", err);
    return null;
  }
  // if (contentType.includes("yaml")) {
  //   const openApi = ymlParse(await res.text()) as OpenAPI.Document;
  //   return openApi;
  // } else if (contentType.includes("json")) {
  //   const openApi = (await res.json()) as OpenAPI.Document;
  //   return openApi;
  // } else {
  //   throw new Error(
  //     "OpenAPIドキュメントのContent-Typeが不正です: " + contentType
  //   );
  // }
};

const getOpenApiYmlFromFile = (filePath: string) => {
  try {
    const text = fs.readFileSync(filePath, "utf-8");
    const openApi = ymlParse(text) as OpenAPI.Document;
    return openApi;
  } catch (err) {
    console.error("err", err);
    return null;
  }
};

const getRequest = (
  path: string,
  params: Record<string, any>,
  apiUrl: string,
  customHeaders?: Record<string, string>
) => {
  let urlPath = path;
  const paramsCopy = { ...params };
  urlPath = urlPath.replace(/\{([^}]+)\}/g, (_, key) => {
    const value = paramsCopy[key];
    delete paramsCopy[key];
    return encodeURIComponent(value);
  });
  const url = new URL(apiUrl + urlPath);
  Object.entries(paramsCopy).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value));
  });
  const headers = customHeaders || {};
  return fetch(url.toString(), { headers });
};

function convertParametersToZodSchema(
  parameters: OpenAPI.Parameters | undefined
): z.ZodObject<any> {
  const shape: Record<string, any> = {};
  for (const param of parameters ?? []) {
    if ("$ref" in param) continue;
    const { name, required, schema } = param;
    if (!name) continue;
    let zodType: z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodAny = z.any();
    if (schema?.type === "string") zodType = z.string();
    if (schema?.type === "number" || schema?.type === "integer")
      zodType = z.number();
    if (schema?.type === "boolean") zodType = z.boolean();
    shape[name] = required ? zodType : zodType.optional();
  }
  return z.object(shape);
}

export const registerOpenApiToolsToMcpServer = async ({
  server,
  openApiUrl,
  apiUrl,
  customHeaders,
  openApiFilePath,
}: {
  server: McpServer;
  openApiUrl: string;
  apiUrl: string;
  customHeaders?: Record<string, string>;
  openApiFilePath?: string;
}) => {
  let openApi = await getOpenApiYmlFromUrl(openApiUrl);
  if (!openApi && openApiFilePath) {
    openApi = getOpenApiYmlFromFile(openApiFilePath);
  }
  if (!openApi) {
    throw new Error("Could not get OpenAPI document");
  }
  for (const path in openApi.paths) {
    const pathItem = openApi.paths[path]?.get;
    if (!pathItem) {
      continue;
    }
    const { operationId, summary, description, parameters } = pathItem;
    if (!operationId) {
      continue;
    }
    const toolId = operationId
      .replace(/_([a-zA-Z0-9])/g, (_, c) => c.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "")
      .trim();
    const inputSchema = convertParametersToZodSchema(parameters);
    server.tool(
      toolId,
      description ?? summary ?? "",
      inputSchema.shape,
      async (args: Record<string, any>, extra: any) => {
        const { customHeaders: argHeaders, ...restArgs } = args;
        const headers = argHeaders || customHeaders;
        const res = await getRequest(path, restArgs, apiUrl, headers);
        let json: any;
        try {
          json = await res.json();
          return { content: [{ type: "text", text: JSON.stringify(json) }] };
        } catch (e) {
          const text = await res.text();
          return { content: [{ type: "text", text }] };
        }
      }
    );
  }
};
