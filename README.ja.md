# openapi-fetch-mcp

OpenAPIエンドポイントをModel Context Protocol（MCP）ツールとして登録するCLIツールです。CursorなどのMCPクライアントを通じてAPIリクエストを実行できます。

## 特徴

- URLまたはローカルファイルからOpenAPI YAMLを取得（現在はYAML形式のみ対応）
- 各**GET**エンドポイントをMCPツールとして登録（安全性のためGETリクエストのみ対応）
- カスタムヘッダーや環境変数の設定に対応

## Cursor MCP設定
### ローカルのOpenAPI仕様書を使う場合
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

### リモートのOpenAPI仕様書を使う場合
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

### 環境変数

- `OPENAPI_URL`: OpenAPI YAMLファイルのURL（`OPENAPI_FILE_PATH`を使う場合は省略可）
- `OPENAPI_FILE_PATH`: ローカルのOpenAPI YAMLファイルのパス（`OPENAPI_URL`を使う場合は省略可）
- `API_URL`: APIサーバーのベースURL
- `CUSTOM_HEADERS`: （任意）カスタムヘッダー用のJSON文字列 例: '{"Authorization":"Bearer ..."}'

## 例（PokeAPIを利用）

```json
    "openapi-fetch-mcp": {
      "command": "npx",
      "args": ["openapi-fetch-mcp"],
      "env": {
        "OPENAPI_URL": "https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/openapi.yml",
        "API_URL": "https://pokeapi.co"
      }
    }
```

## ライセンス

MIT

## 作者

makomori

[English](./README.md) 