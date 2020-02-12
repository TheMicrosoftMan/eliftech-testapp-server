const utils = {};

utils.readFileForExport = require("./files").readFileForExport;
utils.paging = require("./orders").paging;
utils.exportReport = require("./exportReport").exportReport;

module.exports = utils;
