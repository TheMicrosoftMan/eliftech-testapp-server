const csv = require("csv-parser");
const fs = require("fs");
const momment = require("moment");

const fileUtils = {};

function readFileForExport(file) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(file.path)
      .pipe(csv({ separator: ";" }))
      .on("data", data => results.push(data))
      .on("end", () => {
        const trimedOrders = trimWhitespaces(results);

        const isFileValid = fileValidation(trimedOrders);

        if (isFileValid.ok) {
          resolve({
            ok: true,
            orders: trimedOrders
          });
        } else {
          reject({
            ok: false,
            message: isFileValid.errors.join("\n")
          });
        }
      });
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

function fileValidation(rowsArrFromFile) {
  let errors = [];

  rowsArrFromFile.forEach(row => {
    if (!isEmailValid(row.user_email)) errors.push("Email is not valid");
    if (!isDateValid(row.date)) errors.push("Date is not valid");
    if (!isValueValid(row.value)) errors.push("Value is not valid");
    if (!isCurrencyValid(row.currency)) errors.push("Currency is not valid");
    if (!isStatusValid(row.status)) errors.push("Status is not valid");
  });

  return {
    ok: errors.length > 0 ? false : true,
    errors: errors
  };
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDateValid(dateString) {
  return momment(dateString, "DD.MM.YYYY HH:mm:ss").isValid();
}

function isValueValid(value) {
  const number = +value;

  if (isNaN(number)) {
    return false;
  }
  return true;
}

function isCurrencyValid(currency) {
  const validCurrencies = ["uah", "usd"];

  return validCurrencies.includes(currency.toLowerCase());
}

function isStatusValid(status) {
  const validStatuses = ["approved", "pending", "rejected"];

  return validStatuses.includes(status.toLowerCase());
}

fileUtils.readFileForExport = readFileForExport;

module.exports = fileUtils;
