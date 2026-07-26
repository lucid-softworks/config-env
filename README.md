# `@lucid-softworks/config-env`

Explicitly maps environment variable names to nested configuration paths
without importing the global `process` object.

```ts
const env = environmentConfigSource(process.env, {
  "server.host": "APP_HOST",
  "server.port": "APP_PORT",
});
```

Undefined variables are omitted. Empty strings remain meaningful unless
`emptyAsMissing` is enabled.
