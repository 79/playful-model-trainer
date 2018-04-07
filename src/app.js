import p5 from 'p5';
import sketch from './js/sketch';
import './styles/styles.scss';
import * as tf from '@tensorflow/tfjs';
import $ from 'jquery'

// p5js
// ====
new p5(sketch);

// TensorFlow.js
// =============
// Define a model for linear regression.

const model = window.model = tf.sequential();
model.add(tf.layers.dense({units: 2, inputShape: [2]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
let train = async function(xx, yy) {
  const _xs = tf.tensor2d(xx);
  const _ys = tf.tensor2d(yy);

  console.log("training started...");
  await model.fit(_xs, _ys);
  console.log("training finished...");

  return;
}

let predictions = window.predictions = [];

let predict = async function(xx) {
  const _xs = tf.tensor2d(xx, [1, 2]);

  console.log("prediction started...");
  let prediction = await model.predict(_xs);
  prediction = prediction.dataSync();
  console.log("prediction finished...");

  predictions.push(prediction)

  return prediction;
}




// // Train the model using the data.
// model.fit(xs, ys).then(() => {
//   // Use the model to do inference on a data point the model hasn't seen before:
//   model.predict(tf.tensor2d([5, 5, 5], [1, 3])).print();
//   debugger;
// });

$(document).ready(function() {
  $('.predict-form').submit((event) => {
    event.preventDefault();

    let ethnicity = $(".predict-ethnicity").val();

    let xx = [
      parseInt(ethnicity),
      1
    ];
    predict(xx);
  })

  $('#train').on('click', async function(event) {
    event.preventDefault();
    await train(xs, ys);
  })

});
