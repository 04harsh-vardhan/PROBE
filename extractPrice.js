function extractPrice(data) {
  data.forEach((event) => {
    if (event?.s === "BTCUSDT") {
      console.log("price -> ", event?.c);
    }
  });
}
module.exports = {
  extractPrice,
};
