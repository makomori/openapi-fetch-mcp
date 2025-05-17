# openapi-fetch-mcp

OpenAPIのエンドポイントをModel Context Protocol (MCP)ツールとして登録するCLIツールです。

## 特徴

- OpenAPI YAMLをURLまたはローカルファイルから取得
- 各GETエンドポイントをMCPツールとして登録
- カスタムヘッダーや環境変数による柔軟な設定

## インストール

```bash
npm install -g openapi-fetch-mcp
```

## 使い方

必要な環境変数を設定してCLIを実行します。

```bash
OPENAPI_URL="https://example.com/openapi.yaml" \
API_URL="https://example.com/api" \
openapi-mcp-fetch
```

ローカルファイルを使う場合:

```bash
OPENAPI_FILE_PATH="./openapi.yaml" \
API_URL="https://example.com/api" \
openapi-mcp-fetch
```

### 環境変数

- `OPENAPI_URL`: OpenAPI YAMLファイルのURL（`OPENAPI_FILE_PATH`使用時は不要）
- `OPENAPI_FILE_PATH`: ローカルのOpenAPI YAMLファイルのパス（`OPENAPI_URL`使用時は不要）
- `API_URL`: APIサーバーのベースURL
- `CUSTOM_HEADERS`: (任意) カスタムヘッダーのJSON文字列 例: `'{"Authorization":"Bearer ..."}'`

## 開発

```bash
npm install
npm run build
npm run type-check
```

## ライセンス

MIT

## 作者

makomori 