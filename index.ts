import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOpenApiToolsToMcpServer } from "./convertOpenApiToTools.js";

// Create an MCP server
const server = new McpServer({
  name: "openapi-to-mcp",
  version: "0.1.0",
});

await registerOpenApiToolsToMcpServer({
  server,
  openApiUrl:
    "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml",
  apiUrl: "https://pokeapi.co",
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
