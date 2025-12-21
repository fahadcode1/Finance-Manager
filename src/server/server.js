const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = __dirname + "/finance.json";

// ============ READ JSON FILE ============
function readData() {
  const data = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(data);
}

// ============ WRITE JSON FILE ============
function writeData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// ============ GET ALL FINANCE DATA ============
app.get("/api/data", (req, res) => {
  res.send(readData());
});

// ============ SAVE INCOME ============
app.post("/api/income", (req, res) => {
  const { income } = req.body;
  
  const data = readData();
  data.income = income;

  writeData(data);
  res.send({ success: true, income });
});

// ============ ADD EXPENSE ============
app.post("/api/expenses", (req, res) => {
  const { title, amount, repeat } = req.body;

  const data = readData();
  data.expenses.push({ title, amount, repeat });
  
  writeData(data);
  res.send({ success: true, expenses: data.expenses });
});

// ============ START SERVER ============
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
