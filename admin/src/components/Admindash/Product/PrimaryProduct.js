import React, { useState } from "react";
import { client } from "../../../Client/Clientaxios";
import { toast } from "react-hot-toast";

const PrimaryProduct = () => {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState("");
  const [modelError, setModelError] = useState("");
  const [imageError, setImageError] = useState("");

  const modelRegexAlphabetic = /^[a-zA-Z]+$/; 
  const modelRegexLength = /^.{3,30}$/; 
  const maxFileSize = 1 * 1024 * 1024; 

  
  const validateModel = (value) => {
    if (!modelRegexLength.test(value)) {
      setModelError("Product name must be between 3 to 30 characters.");
    } else if (!modelRegexAlphabetic.test(value)) {
      setModelError("Product name must be alphabetic and can't include spaces.");
    } else {
      setModelError(""); 
    }
  };


  const handleModelChange = (e) => {
    const value = e.target.value;
    setModel(value);
    validateModel(value);
  };

  const validateImage = (file) => {
    if (!file) {
      setImageError("Please select an image.");
    } else if (file.size > maxFileSize) {
      setImageError("Image size must be less than 1 MB.");
    } else {
      setImageError(""); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    validateImage(file);
  };

  // Submit form
  const submit = async () => {
    // Additional validation 
    if (modelError==="" || imageError==="") 
    {
      return false;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("model", model);

    try {
      const response = await client.post("/project/primary", formData);
      setImage(null);
      setModel("");
      if (response.status === 200) {
        toast.success("Model created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create model");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-4">
            <div>
              <label className="form-label">Product Name</label>
              <input
                type="text"
                value={model}
                name="model"
                onChange={handleModelChange}
                className="form-control"
              />
              {modelError && (
                <div className="text-danger">{modelError}</div>
              )}
            </div>
          </div>

          <div className="col-md-4 offset-md-4 mt-4">
            <div>
              <label className="form-label">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="form-control"
                accept="image/*"
              />
              {imageError && (
                <div className="text-danger">{imageError}</div>
              )}
            </div>
          </div>

          <div className="col-md-4 offset-md-4 mt-4">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="btn btn-light">Cancel</button>
              <button className="btn btn-success" onClick={submit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryProduct;
