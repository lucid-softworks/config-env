# `@lucid-softworks/config-env`

Explicitly maps environment variable names to nested configuration paths
without importing the global `process` object.

```ts
import { environmentConfigSource } from "@lucid-softworks/config-env";

const env = environmentConfigSource(
  {
    APP_HOST: "localhost",
    APP_PORT: "3000",
  },
  {
    "server.host": "APP_HOST",
    "server.port": "APP_PORT",
  },
);
```

Undefined variables are omitted. Empty strings remain meaningful unless
`emptyAsMissing` is enabled.
