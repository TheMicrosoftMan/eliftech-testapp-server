const momment = require("moment");

const exportReportUtils = {};

function exportReport(orders) {
  const headers = ["user_email", "date", "amount"];
  const ordersRecords = [];

  orders.forEach(order => {
    ordersRecords.push([
      order._id.user_email,
      momment(order._id.date).format("MMM YYYY"),
      order.amount
    ]);
  });

  let str = "";
  str = `${headers.join(";")}\n`;
  ordersRecords.forEach(order => {
    str += `${order.join(";")}\n`;
  });

  return str;
}

exportReportUtils.exportReport = exportReport;

module.exports = exportReportUtils;
