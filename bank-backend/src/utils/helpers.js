const getAmount = (num) => (num / 100).toFixed(2);
const setAmount = (num) => num * 100;

module.exports = { getAmount, setAmount };
