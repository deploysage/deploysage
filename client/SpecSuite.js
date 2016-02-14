// require all modules ending in "_test" from the
// parent directory and all subdirectories

var testsContext = require.context("./app", true, /Spec$/);
testsContext.keys().forEach(testsContext);
