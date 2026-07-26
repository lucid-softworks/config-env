import {
  createConfigLayer,
  setConfigValue,
  type ConfigSource,
} from "@lucid-softworks/config-core";

export type EnvironmentConfig = Readonly<Record<string, string | undefined>>;
export type EnvironmentMapping = Readonly<Record<string, string>>;

export type EnvironmentConfigOptions = Readonly<{
  name?: string;
  emptyAsMissing?: boolean;
}>;

/** Maps dot-delimited config paths to explicit environment variable names. */
export function environmentConfigSource(
  environment: EnvironmentConfig,
  mapping: EnvironmentMapping,
  options: EnvironmentConfigOptions = {},
): ConfigSource {
  const name = options.name ?? "environment";
  return {
    name,
    load() {
      const values: Record<string, unknown> = {};
      for (const [path, environmentKey] of Object.entries(mapping)) {
        const value = environment[environmentKey];
        if (
          value === undefined ||
          (options.emptyAsMissing === true && value === "")
        )
          continue;
        const segments = path.split(".");
        if (segments.some((segment) => segment.length === 0))
          throw new TypeError(`Invalid config path: ${path}`);
        setConfigValue(values, segments, value);
      }
      return createConfigLayer(name, values);
    },
  };
}
