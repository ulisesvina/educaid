import { NextApiRequest, NextApiResponse } from "next";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import data from "./data.json";

const disorders = ["autism", "adhd", "dyslexia", "dyscalculia", "schizophrenia"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { input } = req.body;
  let tensorData: any = [];
  let tensorLabel: any = [];

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
      const input25: any = input.slice(0, 24).concat([0]); // Adds a padding element
      const prediction = model.predict(tf.tensor2d([input25]))
      const predictionArray = (prediction as any).arraySync()[0];
      const diagnosis = disorders[predictionArray.indexOf(Math.max(...predictionArray))];
      res.status(200).json({ diagnosis });
    });
};

export default handler;
