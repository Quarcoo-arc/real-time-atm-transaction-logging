const { TransactionLogs } = require("../../models");

const getAllLogs = async (req, res) => {
  try {
    const data = await TransactionLogs.find({})
      .sort({ "meta.timestamp": -1 })
      .toArray();
    const failed = await TransactionLogs.countDocuments({
      "meta.status": "failed",
    });
    res.json({
      success: true,
      count: data.length,
      failed,
      passed: data.length - failed,
      data,
    });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
};

const filterLogs = async (req, res) => {
  try {
    const searchQuery = req.body.searchString;
    const regex = new RegExp(searchQuery, "i");
    const isValidDate =
      (searchQuery.length === 4 ||
        (searchQuery.length > 4 && searchQuery.match(/-|\//))) &&
      !isNaN(Date.parse(searchQuery));
    const data = await TransactionLogs.find(
      isValidDate
        ? { "meta.timestamp": { $gte: new Date(searchQuery) } }
        : {
            $or: [
              {
                "meta.accountNumber": regex,
              },
              { "meta.transactionId": { $gte: +searchQuery } },
              { "meta.amount": { $gte: +searchQuery } },
              { "meta.status": regex },
              { "meta.type": regex },
              { "meta.description": regex },
            ],
          }
    )
      .sort({ "meta.timestamp": -1 })
      .toArray();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
};

module.exports = { getAllLogs, filterLogs };
