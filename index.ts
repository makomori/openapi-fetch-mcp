#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOpenApiToolsToMcpServer } from "./registerOpenApiToolsToMcpServer";
import dotenv from "dotenv";

dotenv.config();

const server = new McpServer({
  name: "openapi-mcp-fetch",
  version: "0.1.0",
});

await registerOpenApiToolsToMcpServer({
  server,
  openApiUrl: process.env.OPENAPI_URL || "",
  apiUrl: process.env.API_URL || "",
  customHeaders: process.env.CUSTOM_HEADERS
    ? JSON.parse(process.env.CUSTOM_HEADERS)
    : undefined,
  openApiFilePath: process.env.OPENAPI_FILE_PATH || undefined,
});

const transport = new StdioServerTransport();
await server.connect(transport);
