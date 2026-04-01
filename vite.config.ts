import { defineConfig } from 'vite';

export default defineConfig({
  base: '/developers-tools/',
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        hashGenerator: 'hash-generator/index.html',
        jsonFormatter: 'json-formatter/index.html',
        jwtDecoder: 'jwt-decoder/index.html',
        base64: 'base64-encode-decode/index.html',
        uuidUlid: 'uuid-ulid-generator/index.html',
        urlEncode: 'url-encode-decode/index.html',
        timestamp: 'unix-timestamp-converter/index.html',
        regex: 'regex-tester/index.html',
        cron: 'cron-expression-builder-parser/index.html',
        diffChecker: 'diff-checker/index.html',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
