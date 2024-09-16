const mongoose = require("mongoose");
const usermodel = require("../model/UserRegisterModel");
const pdfService = require("../Utility/pdfService");

exports.pdfDownloads = async (req, res, next) => {
  const { id, purchased_id, cartId } = req.query;

  // Log the incoming query params for verification
  console.log("PDF generation started with params:", id, purchased_id, cartId);

  try {

    const user = await usermodel.findById(id);
    console.log(user);
    // const userDetail = {name:user.name,address:user.address,district:user.district,}
    
    // Set the response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");

    // Use pdfService to generate the PDF
    pdfService.generateInvoice(
       user,
      (chunk) => res.write(chunk),  // Write PDF chunk to response stream
      () => {
        res.end();  // End the stream once PDF generation is complete
        console.log("PDF generation complete");
      }
    );
  } catch (error) {
 
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};
