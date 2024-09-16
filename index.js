const express = require("express");
const app = express();
const mongoose = require("mongoose");
const InvoiceDetails = require("./models/InvoiceDetails");
const Unit = require("./models/unit");

mongoose
  .connect("mongodb://localhost:27017/interview")
  .then(() => console.log("DataBase connected"))
  .catch(()=>console.log("Problem in connection"))

app.use(express.json());

app.get("/InvoiceDetail", async (req, res) => {
  res.status(200).json({ InvoiceDetails: await InvoiceDetails.find().populate("unit") });
});

app.post("/InvoiceDetail", async (req, res) => {
  const { lineNo, unitId, expiryDate } = req.body;

  const InvoiceDetailFound = await InvoiceDetails.find({ lineNo });
  if (InvoiceDetailFound.length > 0)
    return res.status(400).json({ message: "InvoiceDetail Founded" });


  const invoice = await InvoiceDetails.create({
    ...req.body,
    expireDate: new Date(expiryDate),
    unit: unitId,
  });
  res.status(200).json({ InvoiceDetails: invoice });
});

app.put("/InvoiceDetail", async (req, res) => {
  const { lineNo, expiryDate } = req.body;
  const date = new Date(expiryDate);
  await InvoiceDetails.findOneAndUpdate(
    { lineNo },
    { ...req.body, expireDate: date }
  );
  res.json({ message: "Updated" });
});

app.delete("/InvoiceDetail/:id", async (req, res) => {
  const { id } = req.params;
  const DeletedInvoice = await InvoiceDetails.findOneAndDelete({ lineNo: +id });
  res.json({ message: "Deleted", DeletedInvoice });
});

app.get("/unit", async (req, res) => {
  res.status(200).json({ Units: await Unit.find() });
});

app.post("/unit", async (req, res) => {
  const { unitNo, unitName } = req.body;

  const unitFound = await Unit.find({ unitNo });
  if (unitFound.length > 0)
    return res.status(400).json({ message: "Unit Founded" });

  const unit = await Unit.create({ unitNo, unitName });
  res.status(200).json({ unit });
});

app.put("/unit", async (req, res) => {
  const { unitNo } = req.body;
  const { body } = req;
  const updateUnit = await Unit.findOneAndUpdate({ unitNo }, body);
  res.json({ message: "Updated" });
});

app.delete("/unit/:id", async (req, res) => {
  const { id } = req.params;
  const DeletedUnit = await Unit.findOneAndDelete({ unitNo: +id });
  res.json({ message: "Deleted", DeletedUnit });
});

app.listen(3000, () => console.log("Server Running...."));
