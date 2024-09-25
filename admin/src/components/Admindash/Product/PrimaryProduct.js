import React, { useState } from "react";
import { client } from "../../../Client/Clientaxios";
import { toast } from "react-hot-toast";
import "./product.css";
import { Paper } from "@mui/material";

const PrimaryProduct = () => {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState("");

  console.log(image, model);

  const submit = async () => {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("model", model);

    console.log(formData);

    try {
      const response = await client.post("/project/primary", formData);
      setImage(null);
      setModel("");
      if (response.status === 200) {
        toast.success("Model created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Paper elevation={5} sx={{padding:'15px'}}>
              <div className="row">
                <div className="col-md-8 offset-md-2 mt-4">
                  <div>
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      value={model}
                      name="model"
                      onChange={(e) => setModel(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-8 offset-md-2 mt-4">
                  <div>
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="form-control"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="col-md-4 offset-md-4 mt-4">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button className="btn btn-light">Cancel</button>
                    <button className="btn btn-success" onClick={submit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryProduct;
