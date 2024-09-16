const PDFDocument = require("pdfkit");

function generateInvoice(user,dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 50 });


const {name,address,district,landmark,mobile,pincode,state} = user;
  // Stream PDF data
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // Add Invoice Title
  doc.fontSize(25).text("Invoice", { align: 'center' });
  
  // Add some spacing
  doc.moveDown(5);

  //
  doc
  .fontSize(14)
  .text(`Sold By : Rega Scooter`, 50, 80)  // This will place the name at y = 100
  .moveDown(1)  // Moves down one line (adjust this number as necessary)
  .text(`Order Id : `, 50, 115)  // Address starts at y = 115

  // Customer Information
  doc
  .fontSize(14)
  .text('Bill To :-', 300, 80)
  .moveDown(2)
  .fontSize(12)
  .text(`${name}`, 300, 100)  // This will place the name at y = 100
  .moveDown(1)  // Moves down one line (adjust this number as necessary)
  .text(`${address}`, 300, 115)  // Address starts at y = 115
  .moveDown(1)  // Another line break if needed
  .text(`${district}, ${state}, pincode - ${pincode}`, 300, 130)
  .moveDown(1)  // Another line break if needed
  .text(`Mobile - ${mobile}`, 300, 145);  // District, state, and pincode on the next line


  // Add some spacing
  doc.moveDown();

  // Invoice Table Header
  doc
    .fontSize(12)
    .text("Item", 50, 180)
    .text("Quantity", 150, 180)
    .text("Price", 250, 180)
    .text("Total", 350, 180);

  doc.moveTo(50, 195).lineTo(550, 195).stroke();

  // Add Invoice Table Rows
  const items = [
    { name: 'Item 1', quantity: 2, price: 20 },
    { name: 'Item 2', quantity: 1, price: 50 },
    { name: 'Item 3', quantity: 5, price: 15 },
  ];

  let total = 0;
  let y = 210;
  items.forEach((item) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    doc
      .fontSize(12)
      .text(item.name, 50, y)
      .text(item.quantity, 150, y)
      .text(`$${item.price.toFixed(2)}`, 250, y)
      .text(`$${itemTotal.toFixed(2)}`, 350, y);

    y += 20;
  });

  // Total Amount
  doc.moveDown().fontSize(14).text(`Total: $${total.toFixed(2)}`, { align: 'right' });

  // Footer
  doc.moveDown().fontSize(10).text("Thank you for your business!", { align: 'center' });

  // Finalize the PDF and end the stream
  doc.end();
}

module.exports = { generateInvoice };
