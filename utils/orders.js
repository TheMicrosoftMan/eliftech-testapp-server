const orderUtils = {};

const ORDERS_BY_PAGE = 5;

const paging = (orders, page) => {
  const start = page * ORDERS_BY_PAGE;
  const end = start + ORDERS_BY_PAGE;
  const ordersOnCurrentPage = orders.slice(start, end);

  return ordersOnCurrentPage;
};

orderUtils.paging = paging;

module.exports = orderUtils;
