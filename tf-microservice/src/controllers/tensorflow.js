const tf = require("@tensorflow/tfjs-node"),
  fs = require("fs"),
  data = JSON.parse(
    fs.readFileSync(__dirname + "/../public/data.json", "utf8")
  );

module.exports = {
  predict: async (req, res) => {
    const model = await tf.loadLayersModel("file://./public/model/model.json");
    const tensorData = tf.tensor2d(req.body.questions);
    const prediction = model.predict(tensorData);
    const predictionData = prediction.dataSync();
    const diagnosis = [];

    res.status(200).send("Predicted");
  },
  train: async () => {
    let tensorData = [];
    let tensorLabel = [];

    for (let i = 0; i < data.length; i++) {
      tensorData.push(data[i].questions);
      switch (data[i].diagnosis) {
        case "autism":
          tensorLabel.push([1, 0, 0, 0, 0]);
          break;
        case "adhd":
          tensorLabel.push([0, 1, 0, 0, 0]);
          break;
        case "dyslexia":
          tensorLabel.push([0, 0, 1, 0, 0]);
          break;
        case "dyscalculia":
          tensorLabel.push([0, 0, 0, 1, 0]);
          break;
        case "schizophrenia":
          tensorLabel.push([0, 0, 0, 0, 1]);
          break;
      }
    }

    tensorData = tf.tensor2d(tensorData);
    tensorLabel = tf.tensor2d(tensorLabel);

    const model = tf.sequential();

    model.add(
      tf.layers.dense({ units: 24, inputShape: [25], activation: "sigmoid" })
    );
    model.add(tf.layers.dense({ units: 5, activation: "sigmoid" }));
    model.add(tf.layers.dense({ units: 5, activation: "sigmoid" }));

    model.compile({
      optimizer: tf.train.adam(0.06),
      loss: "meanSquaredError",
    });

    await model
      .fit(tensorData, tensorLabel, {
        epochs: 100,
      })
      .then(() => {
        console.log("Model trained");
      });

    await model.save("file://" + __dirname + "/../public/model").then(() => {
      console.log("Model saved");
    });
  },
};
