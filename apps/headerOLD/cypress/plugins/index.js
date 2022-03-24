const { configPlugin } = require("@hackney/mtfh-cypress/plugin");

module.exports = (on, config) => {
  return configPlugin(on, config);
};
