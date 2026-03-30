const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Allow Metro to bundle .sql files as raw string exports.
// Without this, require('./migration.sql') would throw.
config.resolver.assetExts.push("sql");

// Serialize .sql files as JS modules that export the SQL string.
// Similar to Webpack's raw-loader or Vite's ?raw import.
const originalSerializer = config.serializer.customSerializer;
config.serializer.customSerializer = (entryPoint, preModules, graph, options) => {
  for (const module of graph.modules.values()) {
    if (module.path.endsWith(".sql")) {
      // Replace the module's code with a simple string export
      const sqlContent = module.read(module.path);
      module.code = `module.exports = ${JSON.stringify(sqlContent)};`;
    }
  }
  return originalSerializer
    ? originalSerializer(entryPoint, preModules, graph, options)
    : require("metro/src/DeltaBundler/Serializer").serialize(
        entryPoint,
        preModules,
        graph,
        options
      );
};

module.exports = withNativeWind(config, { input: "./global.css" });
