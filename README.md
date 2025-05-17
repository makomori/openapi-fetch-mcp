[日本語](./README.ja.md)

# openapi-fetch-mcp

A CLI tool to register OpenAPI endpoints as Model Context Protocol (MCP) tools.

## Features

- Fetches OpenAPI YAML from a URL or local file
- Registers each GET endpoint as an MCP tool
- Supports custom headers and environment variable configuration

## Installation

```bash
npm install -g openapi-fetch-mcp
```

## Usage

Set the required environment variables and run the CLI:

```bash
OPENAPI_URL="https://example.com/openapi.yaml" \
API_URL="https://example.com/api" \
openapi-fetch-mcp
```

Or with a local file:

```bash
OPENAPI_FILE_PATH="./openapi.yaml" \
API_URL="https://example.com/api" \
openapi-fetch-mcp
```

### Environment Variables

- `OPENAPI_URL`: URL to the OpenAPI YAML file (optional if using `OPENAPI_FILE_PATH`)
- `OPENAPI_FILE_PATH`: Path to the local OpenAPI YAML file (optional if using `OPENAPI_URL`)
- `API_URL`: Base URL for the API server
- `CUSTOM_HEADERS`: (optional) JSON string for custom headers, e.g. `'{"Authorization":"Bearer ..."}'`

## Development

```bash
npm install
npm run build
npm run type-check
```

## License

MIT

## Author

makomori 