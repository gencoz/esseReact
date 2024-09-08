//abbraccio :"price_1Oj3LGEcXp5SRF9auoNWVpGc";
//bis : "price_1Oj3MOEcXp5SRF9aoGN9S37o";

const express = require("express");
let cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Oj3EkEcXp5SRF9avN79FqhGZzLF9RsLPrYCjdeMdbQIeg5JdaNlOkMjPrmYgbMhCs3auHvG3LZVffV8dQaK6V6u00yw5T4X3y"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  console.log(req.body.items);
  items.forEach((item) => {
    lineItems.push({
      price: item.stripe,
      quantity: item.quantity,
    });
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.post("/buynow", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  console.log(req.body.items);
  items.forEach((item) => {
    lineItems.push({
      price: item.stripe,
      quantity: 1,
    });
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("listening on port 4000"));
