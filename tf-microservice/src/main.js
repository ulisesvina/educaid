const express = require("express"),
  app = express(),
  port = process.env.PORT || 8080;

const tensorflow = require("./routes/tensorflow"),
    tensorflowController = require("./controllers/tensorflow");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("/v1/tf", tensorflow);

app.listen(port, () => {
  console.log(`Tensorflow microservice running on port ${port}`);
  tensorflowController.train();
});
