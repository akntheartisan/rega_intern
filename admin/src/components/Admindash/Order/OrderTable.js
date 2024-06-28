import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { client } from "../../../Client/Clientaxios";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import ViewListIcon from "@mui/icons-material/ViewList";
import OrderView from "./OrderView";

export default function OrderTable({ product, setProduct }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderData, setOrderData] = useState();
  const [updateOpen, setUpdateOpen] = React.useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [deleteOpen, setDeleteOpen] = React.useState("");
  const [openOrderView, setOpenOrderView] = React.useState(false);

  const openEdit = (order) => {
    setSelectedProduct(order);
    setOpenOrderView(true);
  };

  const getOrder = async () => {
    console.log("getorder");
    try {
      const response = await client.get("/cart/getCart");
      console.log(response.data.data);
      const orderData = response.data.data;
      setOrderData(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  //   const deleteSubmit = async (id) => {
  //     console.log('deleted id:' + id);
  //     try {
  //       const response = await client.post("project/deleteproduct", {id});
  //       console.log(response);
  //       toast.error("Deleted Successfully");
  //       setDeleteOpen(false);
  //       getProduct();

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Customer Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Order
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Phone
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Order Status
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData &&
                orderData.map((each) => (
                  <TableRow
                    key={each._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {each.name}
                    </TableCell>
                    <TableCell align="center">{each.productId.model}</TableCell>
                    <TableCell align="center">{each.mobile}</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => openEdit(each)}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={productData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </Paper>
      <OrderView
        openOrderView={openOrderView}
        setOpenOrderView={setOpenOrderView}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      {/* <ProductUpdate
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        product={selectedProduct}
        setProductData={setProductData}
        getProduct={getProduct}
      />
      <ProductDelete
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        product={selectedProduct}
        deleteSubmit={deleteSubmit}
      /> */}
      <OrderView />
    </>
  );
}
