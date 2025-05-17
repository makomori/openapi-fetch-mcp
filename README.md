# openapi-fetch-mcp

A CLI tool to register OpenAPI endpoints as Model Context Protocol (MCP) tools. You can make API requests through an MCP client such as Cursor.

## Features

- Fetches OpenAPI YAML from a URL or local file (Currently, only YAML format is supported)
- Registers each **GET** endpoint as an MCP tool (This library only supports GET requests for safety reasons)
- Supports custom headers and environment variable configuration

## Cursor MCP setting
### When using a local OpenAPI spec
```json
    "openapi-fetch-mcp": {
      "command": "npx",
      "args": ["openapi-fetch-mcp"],
      "env": {
        "API_URL": "https://your-api-url.com",
        "CUSTOM_HEADERS": "{\"X-Your-Api-Key\":\"xxxxxxxxx\"}",
        "OPENAPI_FILE_PATH": "/FULL_PATH_TO_OPEN_API_YAML_FILE"
      }
    }
```

### When using a remote OpenAPI spec
```json
    "openapi-fetch-mcp": {
      "command": "npx",
      "args": ["openapi-fetch-mcp"],
      "env": {
        "API_URL": "https://your-api-url.com",
        "CUSTOM_HEADERS": "{\"X-Your-Api-Key\":\"xxxxxxxxx\"}",
        "OPENAPI_URL": "https://your-open-api-url.com"
      }
    }
```

### Environment Variables

- `OPENAPI_URL`: URL to the OpenAPI YAML file (optional if using `OPENAPI_FILE_PATH`)
- `OPENAPI_FILE_PATH`: Path to the local OpenAPI YAML file (optional if using `OPENAPI_URL`)
- `API_URL`: Base URL for the API server
- `CUSTOM_HEADERS`: (optional) JSON string for custom headers, e.g. '{"Authorization":"Bearer ..."}'

## Example (Using PokeAPI)

```json
    "openapi2mcp": {
      "command": "npx",
      "args": ["openapi2mcp"],
      "env": {
        "OPENAPI_URL": "https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/openapi.yml",
        "API_URL": "https://pokeapi.co"
      }
    }
```

## License

MIT

## Author

makomori

[日本語](./README.ja.md)