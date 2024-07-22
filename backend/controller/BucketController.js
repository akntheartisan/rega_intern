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

exports.getBucket = async (req,res) => {
  console.log(req.query);

  const {id} = req.query;

  try {
   
    const getBucket = await bucketmodel.findById(id).populate('list.subModelId').exec();
    console.log(getBucket);
    
  } catch (error) {
    console.log(error);
  }
}
