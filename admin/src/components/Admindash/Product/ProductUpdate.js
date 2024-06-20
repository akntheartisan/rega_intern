import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { client } from "../../../Client/Clientaxios";
import toast from "react-hot-toast";

export default function ProductUpdate({ updateOpen, setUpdateOpen, product, setProductData,getProduct }) {
  const handleClose = () => {
    setUpdateOpen(false);
  };

  const [updatedProduct, setUpdatedProduct] = React.useState(product);

  React.useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateSubmit = async () => {

//     console.log(updatedProduct);

//   console.log(updatedProduct._id);
//   const formData = new FormData();
//   formData.append('id',updatedProduct._id)
//   formData.append('model', updatedProduct.model);
//   formData.append('motor', updatedProduct.motor);
//   formData.append('battery', updatedProduct.battery);
//   formData.append('range', updatedProduct.range);
//   formData.append('tyresize', updatedProduct.tyresize);
//   formData.append('brakes', updatedProduct.brakes);
//   formData.append('ground', updatedProduct.ground);
//   formData.append('payload', updatedProduct.payload);
//   formData.append('frame', updatedProduct.frame);

    // Object.keys(updatedProduct).forEach((key) => {
    //   formData.append(key, updatedProduct[key]);
    // });

    // console.log(formData);

    try {
      const response = await client.post("/project/updateproject", updatedProduct);
      const updatedData = response.data.data;
      console.log(updatedData);
      if(response.status === 200){
        toast.success('Updated Successfully');
        getProduct();
        // setProductData(updatedData);
        setUpdateOpen(false);
      } 
    } catch (error) {
      console.log(Error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={updateOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="container">
              <div className="row">
                {/* <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                      Model
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      name="model"
                      value={updatedProduct.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="motor" className="form-label">
                      Motor
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="motor"
                      name="motor"
                      value={updatedProduct.motor}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="battery" className="form-label">
                      Battery
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="battery"
                      name="battery"
                      value={updatedProduct.battery}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="range" className="form-label">
                      Range
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="range"
                      name="range"
                      value={updatedProduct.range}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="tyresize" className="form-label">
                      Tyre Size and Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tyresize"
                      name="tyresize"
                      value={updatedProduct.tyresize}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="brakes" className="form-label">
                      Brakes
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brakes"
                      name="brakes"
                      value={updatedProduct.brakes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="ground" className="form-label">
                      Ground Clearance
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ground"
                      name="ground"
                      value={updatedProduct.ground}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="payload" className="form-label">
                      Payload
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="payload"
                      name="payload"
                      value={updatedProduct.payload}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
