import p5 from 'p5';
import sketch from './js/sketch';
import './styles/styles.scss';
import * as tf from '@tensorflow/tfjs';

// p5js
// ====
new p5(sketch);

// TensorFlow.js
// =============
// Define a model for linear regression.
const model = window.model = tf.sequential();
model.add(tf.layers.dense({units: 2, inputShape: [3]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
const xs = tf.tensor2d(
  [
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3],
    [4, 4, 4],
  ]
);
const ys = tf.tensor2d(
  [
    [1, 1],
    [3, 3],
    [5, 5],
    [7, 7],
  ]
);

// Train the model using the data.
model.fit(xs, ys).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  model.predict(tf.tensor2d([5, 5, 5], [1, 3])).print();
  debugger;
});
