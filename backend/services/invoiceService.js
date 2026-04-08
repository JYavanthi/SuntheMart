const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoice(data) {
  return new Promise((resolve, reject) => {
    try {
      const invoiceDir = path.join(__dirname, "../invoices");

      if (!fs.existsSync(invoiceDir)) {
        fs.mkdirSync(invoiceDir, { recursive: true });
      }

      const invoiceNo = data.InvoiceNo || `${Date.now()}`;
      const filePath = path.join(invoiceDir, `invoice_${data.orderId}.pdf`);

      const doc = new PDFDocument({ size: "A4", margin: 30 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      const pageWidth = 595.28;
      const contentLeft = 30;
      const contentWidth = 535;
      const teal = "#0a8f88";
      const dark = "#1f2937";
      const lightBorder = "#cfd8dc";

      const formatCurrency = (value) => `₹ ${Number(value || 0).toFixed(2)}`;

      const invoiceDate = new Date().toLocaleDateString("en-IN");

      const billingName = data.billingName || "Customer";
      const billingAddress = data.billingAddress || "N/A";

      const shippingName = data.shippingName || billingName;
      const shippingAddress = data.shippingAddress || "N/A";
      const logoPath = path.join(__dirname, "../assets/brihati_logo_transparent.png");

      /* ================= HEADER ================= */
      doc.rect(0, 0, pageWidth, 75).fill(lightBorder);
      // Bottom border line under header
doc
  .moveTo(0, 75)
  .lineTo(pageWidth, 75)
  .lineWidth(2)
  .stroke("#0a8f88");

      if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 20, 10, {
    width: 80,   // adjust size
    height: 60
  });
}

      doc
        .fillColor("#0a8f88")
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("INVOICE", 0, 26, { align: "right" });

      doc
        .fontSize(10)
        .font("Helvetica")
        .text("BRIHATI", 0, 52, { align: "right" });

      doc.fillColor(dark);

      /* ================= TOP INFO ================= */
      let y = 95;

      doc.font("Helvetica").fontSize(10);
      doc.text(`Invoice No : ${invoiceNo}`, contentLeft, y);
      doc.text(`Date : ${invoiceDate}`, 430, y);

      /* ================= BILLING / SHIPPING ================= */
      y += 22;

      const infoBoxY = y;
      const infoBoxHeight = 110;
      const halfWidth = 267.5;

      doc
        .roundedRect(contentLeft, infoBoxY, contentWidth, infoBoxHeight, 2)
        .lineWidth(1)
        .stroke(teal);

      doc
        .moveTo(contentLeft + halfWidth, infoBoxY)
        .lineTo(contentLeft + halfWidth, infoBoxY + infoBoxHeight)
        .stroke(lightBorder);

      doc.fillColor(teal).font("Helvetica-Bold").fontSize(11);
      doc.text("Billing To", 42, infoBoxY + 10);
      doc.text("Shipping To", contentLeft + halfWidth + 15, infoBoxY + 10);

      doc.fillColor(dark);

      doc.font("Helvetica-Bold").fontSize(10);
      doc.text(billingName, 42, infoBoxY + 30, {
        width: 220,
        align: "left",
      });

      doc.font("Helvetica").fontSize(10);
      doc.text(billingAddress, 42, infoBoxY + 48, {
        width: 220,
        align: "left",
        lineGap: 2,
      });

      doc.font("Helvetica-Bold").fontSize(10);
      doc.text(shippingName, contentLeft + halfWidth + 15, infoBoxY + 30, {
        width: 220,
        align: "left",
      });

      doc.font("Helvetica").fontSize(10);
      doc.text(shippingAddress, contentLeft + halfWidth + 15, infoBoxY + 48, {
        width: 220,
        align: "left",
        lineGap: 2,
      });

      /* ================= TABLE ================= */
      y = infoBoxY + infoBoxHeight + 22;

      const tableX = contentLeft;
      const colSno = 38;
      const colProduct = 265;
      const colRate = 70;
      const colQty = 55;
      const colAmount = 107;

      doc.rect(tableX, y, contentWidth, 24).fill(teal);

      doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(9);
      doc.text("S No", tableX + 8, y + 7, { width: colSno - 10 });
      doc.text("Product", tableX + colSno, y + 7, { width: colProduct - 10 });
      doc.text("Rate", tableX + colSno + colProduct, y + 7, { width: colRate - 10 });
      doc.text("Qty", tableX + colSno + colProduct + colRate, y + 7, { width: colQty - 10 });
      doc.text("Amount", tableX + colSno + colProduct + colRate + colQty, y + 7, {
        width: colAmount - 12,
        align: "right",
      });

      doc.fillColor(dark);

      let rowY = y + 24;
      const rowHeight = 24;

      data.items.forEach((item, index) => {
        doc
          .rect(tableX, rowY, contentWidth, rowHeight)
          .strokeColor(lightBorder)
          .lineWidth(0.6)
          .stroke();

        doc.font("Helvetica").fontSize(9).fillColor(dark);
        doc.text(String(index + 1), tableX + 8, rowY + 7, { width: colSno - 10 });

        doc.text(item.name || "-", tableX + colSno, rowY + 7, {
          width: colProduct - 10,
          ellipsis: true,
        });

        doc.text(Number(item.unitPrice || 0).toFixed(2), tableX + colSno + colProduct, rowY + 7, {
          width: colRate - 10,
        });

        doc.text(String(item.quantity || 0), tableX + colSno + colProduct + colRate, rowY + 7, {
          width: colQty - 10,
        });

        doc.text(Number(item.total || 0).toFixed(2), tableX + colSno + colProduct + colRate + colQty, rowY + 7, {
          width: colAmount - 12,
          align: "right",
        });

        rowY += rowHeight;
      });

      /* ================= TOTALS ================= */
      const totalsBoxWidth = 220;
      const totalsBoxX = contentLeft + contentWidth - totalsBoxWidth;
      const totalsStartY = rowY + 16;
  

      doc
        .roundedRect(totalsBoxX, totalsStartY, totalsBoxWidth, 95, 2)
        .strokeColor(teal)
        .lineWidth(1)
        .stroke();

      const labelX = totalsBoxX + 12;
      const valueX = totalsBoxX + 120;
      let totalsY = totalsStartY + 12;

      doc.font("Helvetica").fontSize(10).fillColor(dark);
      doc.text("Sub Total :", labelX, totalsY);
      doc.text((data.subtotal), valueX, totalsY, { width: 85, align: "right" });

      totalsY += 18;
      doc.text("Discount :", labelX, totalsY);
      doc.text(-(data.discount || 0), valueX, totalsY, { width: 85, align: "right" });

      const gstPercent = Number(data.items?.[0]?.gstPercent || 0);

      totalsY += 18;
      doc.text( `GST @ ${gstPercent}% :`, labelX, totalsY);
      doc.text((+(data.tax || 0).toFixed(2) ), valueX, totalsY, { width: 85, align: "right" });

      // Group GST by percent
// const gstMap = {};

// data.items.forEach(item => {
//   const percent = item.gstPercent || 0;
//   gstMap[percent] = (gstMap[percent] || 0) + (item.gstAmount || 0);
// });

// // Print GST rows dynamically
// Object.keys(gstMap).forEach(percent => {
//   totalsY += 18;
//   doc.text(`GST @ ${percent}% :`, labelX, totalsY);
//   doc.text(formatCurrency(gstMap[percent]), valueX, totalsY, {
//     width: 85,
//     align: "right"
//   });
// });

      // totalsY += 18;
      // doc.text("SGST @ 5% :", labelX, totalsY);
      // doc.text(formatCurrency((data.tax || 0) / 2), valueX, totalsY, { width: 85, align: "right" });

     

      totalsY += 24;
      doc.rect(totalsBoxX, totalsY - 6, totalsBoxWidth, 24).fill(teal);

      doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(11);
      doc.text("Grand Total", labelX, totalsY);
      doc.text((data.totalAmount).toFixed(2), valueX, totalsY, {
        width: 85,
        align: "right",
      });

      doc.fillColor(dark);

      /* ================= PAYMENT / BANK DETAILS ================= */
      y = totalsStartY + 125;

      const boxGap = 25;
      const smallBoxWidth = 255;
      const smallBoxHeight = 88;

      doc
        .roundedRect(contentLeft, y, smallBoxWidth, smallBoxHeight, 2)
        .strokeColor(teal)
        .lineWidth(1)
        .stroke();

      doc.fillColor(teal).font("Helvetica-Bold").fontSize(11);
      doc.text("SOLD BY", contentLeft + 10, y + 10);
      doc.fillColor(dark).font("Helvetica").fontSize(9);
      doc.text(" Brihati Natural Foods Pvt Ltd", contentLeft + 10, y + 42);
      doc.text("Frazer Road, Budh Vihar, Patna, Bihar 800001", contentLeft + 10, y + 56);
      doc.text("Contact : +91-9572965999", contentLeft + 10, y + 70);
      // doc.text("Email : care@brihati.in", contentLeft + 10, y + 70);

      const rightBoxX = contentLeft + smallBoxWidth + boxGap;

      doc
        .roundedRect(rightBoxX, y, smallBoxWidth, smallBoxHeight, 2)
        .strokeColor(teal)
        .lineWidth(1)
        .stroke();

      doc.fillColor(teal).font("Helvetica-Bold").fontSize(11);
      doc.text("Payment mode", rightBoxX + 10, y + 10);

      doc.fillColor(dark).font("Helvetica").fontSize(9);
      doc.text("COD", rightBoxX + 10, y + 28);
      // doc.text("UPI Number : 9360172293", rightBoxX + 10, y + 46);

      /* ================= TERMS ================= */
      y += 108;

      doc
        .roundedRect(contentLeft, y, contentWidth, 55, 2)
        .strokeColor(teal)
        .lineWidth(1)
        .stroke();

      doc.fillColor(teal).font("Helvetica-Bold").fontSize(11);
      doc.text("Terms & Conditions", contentLeft + 10, y + 10);

      doc.fillColor(dark).font("Helvetica").fontSize(9);
      doc.text(
        "Goods once sold will not be taken back. This is a system generated invoice.",
        contentLeft + 10,
        y + 28,
        { width: contentWidth - 20 }
      );

      /* ================= FOOTER ================= */
      y += 85;

      doc.fillColor(dark).font("Helvetica").fontSize(10);
      doc.text("Authorised Sign", 420, y);
      doc.text("Thank You", 0, y + 25, { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateInvoice };