const { validate_rule } = require("./src/actions/payload");
const { checkpayload } = require("./src/middleware/ValidatePayload");
const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Ajayi Solomon",
      github: "@temmyjay001",
      email: "temmyjay001@gmail.com",
      mobile: "07068767956",
      twitter: "uncu001",
    },
  });
});

app.post("/validate-rule", checkpayload(), (req, res) => {
  validate_rule(req, res);
});

app.on("error", (error) => {
  console.log(`::> an error occiurred in our server: \n ${error}`);
});

app.listen(port, () =>
  console.log(
    `::: server listening on port ${port}. Open via http://localhost:${port}/`
  )
);
