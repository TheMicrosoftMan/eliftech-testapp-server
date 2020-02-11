const csv = require("csv-parser");
const fs = require("fs");

const fileUtils = {};

function readFileForExport(file) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    try {
      fs.createReadStream(file.path)
        .pipe(csv({ separator: ";" }))
        .on("data", data => results.push(data))
        .on("end", () => {
          const trimedOrders = trimWhitespaces(results);

          resolve({
            ok: true,
            orders: trimedOrders
          });
        });
    } catch (error) {
      reject({
        ok: false,
        message: error
      });
    }
  });
}

function trimWhitespaces(ordersArr) {
  const trimedOrders = [];

  ordersArr.forEach(order => {
    const trimedOrder = {};

    const keys = Object.keys(order).map(orderKey => orderKey.trim());
    const values = Object.values(order).map(orderValue => orderValue.trim());

    for (let i = 0; i < keys.length; i++) {
      trimedOrder[keys[i]] = values[i];
    }

    trimedOrders.push(trimedOrder);
  });

  return trimedOrders;
}

fileUtils.readFileForExport = readFileForExport;

module.exports = fileUtils;
