{
  // Defaults to the Karma-Verbose-Reporter
  // See https://www.npmjs.com/package/karma-verbose-reporter
  reporters: ["verbose"],

  // The browsers will vary depending on the OS.
  // In CI/CD environments, FirefoxHeadless and ChromeHeadless are used instead.
  browsers: ["Firefox", "Chrome"],

  frameworks: [
    // Defaults to the Mocha test framework.
    "mocha",

    // This makes it easy to detect which browser your tests are running in.
    // Also provides access to environment variables.
    // See https://jstools.dev/karma-host-environment
    "host-environment"
  ],

  files: [
    // Assumes your tests are under the "test" folder and are named *.spec.js
    // or *.test.js.  (.mjs and .jsx file extensions are also supported)
    "test/**/*.+(spec|test).+(js|jsx|mjs)",

    // Allows your tests to dynamically access any file in the "test" folder.
    // Useful for loading test data from CSV or JSON files.
    { pattern: "test/**/*", included: false, served: true }
  ],

  preprocessors: {
    // Uses Webpack to bundle your tests and their dependencies
    "test/**/*.+(spec|test).+(js|jsx|mjs)": ["webpack"]
  },

  webpack: {
    // Webpack development mode it easier to debug failing tests
    mode: "development",

    // Inlne source maps ensure proper stack traces in errors,
    // and allow you to debug your original source code rather than bundled code.
    devtool: "inline-source-map",
  }
}