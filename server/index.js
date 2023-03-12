const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04b75e0f3a0c4c1dce9dbd48779cdddb85e6978028099b79de23820cca0d9695b6d41ed806cae6102cfaff6cfdc2db5392403be707a559bfebca871b2df68a1c25": 100,
  "04a041f903c0cb45ec9d24d48067832079204463eeb0fc7857061088fae232e9fa4a335f8f5e94ae1085a036378365ac03555d139bf01c0aded26b346699db940f": 50,
  "04c26d55116e61c5621b9baa2cbe2a29b6bdf5cac718732bd7219652124abf209276103e6916d399c5f460d4282b19d5b6373a02b916ebd82d5fcd66cfeacb48d6": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
