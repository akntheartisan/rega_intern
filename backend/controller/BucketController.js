const mongoose = require("mongoose");
const bucketmodel = require("../model/BuckerListModel");

exports.addBucket = async (req, res) => {
  console.log(req.body);
  const { userId, model, modelId } = req.body;
  try {
    const addBucket = await bucketmodel.updateOne(
      { _id: userId },

      {
        $push: {
          list: {
            "model":model,
            "subModelId":modelId,
          },
        },
      },
      {upsert:true}
    );

    console.log(addBucket);
  } catch (error) {
    console.log(error);
  }
};
