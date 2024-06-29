import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function OrderView({
  openOrderView,
  setOpenOrderView,
  selectedProduct,
  setSelectedProduct,
}) {
  const handleClose = () => {
    setOpenOrderView(false);
  };

  console.log(selectedProduct);

  return (
    <React.Fragment>
      <Dialog
        open={openOrderView}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Order Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {selectedProduct.map((each) => (
                    <TableRow
                      key={each.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {each.name}
                      </TableCell>
                      <TableCell align="right">{each.calories}</TableCell>
                      <TableCell align="right">{each.fat}</TableCell>
                      <TableCell align="right">{each.carbs}</TableCell>
                      <TableCell align="right">{each.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
