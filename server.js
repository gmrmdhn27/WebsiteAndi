const express = require("express");
const midtransClient = require("midtrans-client");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "copy dari panduan readme", // <--- GANTI INI
  clientKey: "copy dari panduan readme", // <--- GANTI INI
});

app.post("/api/payment", async (req, res) => {
  try {
    const { order_id, gross_amount, customer_details, item_details } = req.body;

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: gross_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: customer_details,
      item_details: item_details,
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    res.json({ token: transactionToken });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Routes for Pages
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
});

app.get("/orders", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "orders.html"));
});

// Serve index.html for root and fallback
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Fallback for SPA-like navigation if needed, or just 404
app.get("*", (req, res) => {
  // Check if it's looking for a file that doesn't exist to avoid loop
  if (req.url.includes(".")) {
    res.status(404).send("Not Found");
  } else {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}

module.exports = app;
