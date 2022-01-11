const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const { products } = require("./data");

const app = express();

const key_id = "rzp_test_KdmPif9u69gA6O";
const key_secret = "rxhgQFjKzMs5orA6iYvyQt32";
const instance = new Razorpay({
  key_id,
  key_secret,
});

app.use(cors());
app.use(express.json());
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/order/:prodId", (req, res) => {
  const { prodId } = req.params;
  const product = products.find((product) => product.id == prodId);
  const amount = product.price * 100 * 70;
  const currency = "INR";
  const receipt = "receipt#123";
  const notes = { desc: product.description };
  instance.orders.create(
    { amount, currency, notes, receipt },
    (error, order) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(order);
    }
  );
});

app.listen(8000, () => {
  console.log("server running at " + 8000);
});
