import p5 from 'p5';
import $ from 'jQuery';

// Sketch scope
const sketch = (p5) => {
  let ethnicityLabel = [
    "black",
    "hispanic",
    "native-american",
    "other",
    "asian",
    "white"
  ]

  let educationLabel = [
    "less-than-high-school",
    "high-school",
    "some-college",
    "bachelor-degree",
    "advanced-degree"
  ]

  let locationLevel = [
    "suburban",
    "urban",
    "rural"
  ]

  let selections = [
    // ["ethnicity", "education", "location"],
    ["native-american", "high-school", "urban"],
    ["black", "bachelor-degree", "urban"],
    ["hispanic", "less-than-high-school", "rural"],
    ["white", "some-college", "suburban"],
    // ["native-american", "bachelor-degree", "urban"],
    // ["native-american", "advanced-degree", "suburban"],
    // ["other", "high-school", "rural"],
    // ["asian", "less-than-high-school", "rural"],
    // ["hispanic", "some-college", "rural"],
    // ["asian", "high-school", "suburban"],
    // ["native-american", "some-college", "suburban"],
    // ["black", "advanced-degree", "suburban"],
    // ["black", "some-college", "rural"],
    // ["black", "less-than-high-school", "rural"],
    // ["native-american", "some-college", "rural"],
    // ["hispanic", "some-college", "suburban"],
    // ["asian", "bachelor-degree", "urban"],
    // ["native-american", "less-than-high-school", "urban"],
    // ["other", "bachelor-degree", "rural"],
    // ["black", "high-school", "rural"],
    // ["other", "less-than-high-school", "suburban"],
    // ["asian", "some-college", "rural"],
    // ["native-american", "high-school", "suburban"],
    // ["other", "some-college", "rural"],
    // ["other", "high-school", "rural"],
    // ["native-american", "some-college", "urban"],
    // ["black", "high-school", "suburban"],
    // ["black", "some-college", "suburban"],
    // ["black", "high-school", "rural"],
    // ["other", "high-school", "suburban"],
    // ["white", "high-school", "rural"],
    // ["black", "high-school", "rural"],
  ]

  let xs = window.xs = [];
  let ys = window.ys = [];
  let currentSelection = 0;
  let scene = "Labeler";

  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;

  const mapWidth = canvasHeight * .60;
  const mapHeight = canvasHeight;

  // make library globally available
  window.p5 = p5;

  // Setup function
  // ======================================
  p5.setup = () => {
    let canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
  }

  // Draw function
  // ======================================
  p5.draw = () => {
    p5.background('#c0ffee');
    p5.fill("black")

    if (scene == "Labeler") {
      drawLabeler();
    } else if (scene == "Trainer") {
      p5.fill("yellow")
      p5.rect(0, 0, mapWidth, mapHeight);

      if (window.predictions.length === 0) return;

      for (let i = 0; i < window.predictions.length; i++) {
        let prediction = window.predictions[i];
        let x = prediction[0];
        let y = mapHeight - prediction[1];

        p5.fill('magenta');
        p5.ellipse(x, y, 30, 30);
        p5.fill('white');
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(i + 1, x - 15, y - 15, 30, 30);
      }
    }
  }

  function drawLabeler() {
    p5.rect(0, 0, mapWidth, mapHeight);
    p5.text("hello");

    p5.textAlign(p5.CENTER, p5.TOP);
    let selectionStr = selections[currentSelection]

    if (p5.mouseX < mapWidth) {
      let mouseXNormalized = p5.mouseX / mapWidth;
      selectionStr = selectionStr.concat(["x: " + mouseXNormalized.toFixed(2) ])
    } else {
      selectionStr = selectionStr.concat(["x: OUT OF BOUNDS"])
    }

    if (p5.mouseY < mapHeight) {
      let mouseYNormalized = (mapHeight - p5.mouseY) / mapHeight;
      selectionStr = selectionStr.concat(["y: " + mouseYNormalized.toFixed(2) ])
    } else {
      selectionStr = selectionStr.concat(["y: OUT OF BOUNDS"])
    }

    selectionStr = selectionStr.join("\n\n")

    p5.textSize(24)
    p5.text(
      selectionStr,
      canvasHeight * .60,
      0,
      canvasWidth - (canvasHeight * .60),
      canvasHeight
    )

    p5.fill('magenta')
    p5.ellipse(p5.mouseX, p5.mouseY, 20, 20)
  }

  p5.mouseClicked = () => {
    if (scene != 'Labeler') return;

    let predX = p5.mouseX;
    let predY = canvasHeight - p5.mouseY;
    ys.push([predX, predY]);

    xs.push([
      ethnicityLabel.indexOf(selections[currentSelection][0]),
      educationLabel.indexOf(selections[currentSelection][1]),
    ])

    currentSelection += 1;

    if (currentSelection == selections.length) {
      $(".controls").show();
      scene = "Trainer";
    }
  }
}

export default sketch;
