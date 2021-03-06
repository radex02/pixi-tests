import "./style.css";
import * as PIXI from "pixi.js-legacy";

//create container
const app = new PIXI.Application({
  backgroundColor: 0x70fdff
});
document.body.appendChild(app.view);

//STYLE
//initiating style vars
let viewport: string;
let long: number;
let large: number;
let name: string;
let property: string;
let defaultText: PIXI.TextStyle;
let scale: number;

//cursors
app.renderer.plugins.interaction.cursorStyles.default =
  "url('https://raw.githubusercontent.com/radex02/pixi-tests/master/images/pointer0.png'),auto";
app.renderer.plugins.interaction.cursorStyles.hover =
  "url('https://raw.githubusercontent.com/radex02/pixi-tests/master/images/pointer1.png'),auto";

//custom right-click
document.addEventListener("contextmenu", e => e.preventDefault());

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";

function getScale(): number {
  return (scale = Math.sqrt(long * large) * 0.06);
}

function initStyle(): void {
  if (window.innerWidth < window.innerHeight) viewport = "portrait";
  else viewport = "landscape";
  long = Math.max(window.innerWidth, window.innerHeight);
  large = Math.min(window.innerWidth, window.innerHeight);
  app.renderer.resize(window.innerWidth, window.innerHeight);

  //text style
  defaultText = new PIXI.TextStyle({
    fill: 0x000000,
    fontSize: getScale(),
    fontFamily: "Arial"
  });
}
initStyle();

//when resize
window.addEventListener("resize", function() {
  initStyle();
  getScale();

  //reavaluate dynamic values
  for (name in environment.cores) {
    for (property in environment.cores[name]) {
      if (typeof environment.cores[name][property] === "function") {
        environment.sprites[name][property] = environment.cores[name][
          property
        ]();
      }
    }
  }
});

//creating environment
const environment = {
  sprites: {},
  cores: {}
};

//FONCTIONS
//sprite creation
function initSprite(name: string, source: string, def: {}): void {
  app.loader.add(name, source).load(function() {
    environment.sprites[name] = new PIXI.Sprite(
      app.loader.resources[name].texture
    );
    environment.cores[name] = def;
    environment.sprites[name].anchor.set(0.5);

    //setting properties
    environment.cores[name].me = environment.sprites[name]; //setting reference
    let property;
    for (property in def) {
      if (typeof environment.cores[name][property] === "function") {
        environment.sprites[name][property] = environment.cores[name][
          property
        ]();
      } else {
        environment.sprites[name][property] = environment.cores[name][property];
      }
    }
    if (environment.sprites[name].init === "function") {
      environment.sprites[name].init(environment.sprites[name]);
    }
    app.stage.addChild(environment.sprites[name]);
  });
}

//text managing
function initText(text, ...args): PIXI.Text {
  if (text.isSprite) {
    text.text = args[0];
    text.position = new PIXI.Point(args[1], args[2]);
    return text;
  } else {
    let result = new PIXI.Text(text, args[2]);
    result.position = new PIXI.Point(args[0], args[1]);
    return (text = result);
  }
}

let fps = app.stage.addChild(
  initText(0, 5, window.innerHeight - 45, defaultText)
);

//ACTION
initSprite(
  "doc",
  "https://raw.githubusercontent.com/radex02/pixi-tests/master/images/doc.gif",
  {
    x() {
      return window.innerWidth - long * 0.075 - 10;
    },
    y() {
      return long * 0.075 + 10;
    },
    width() {
      return long * 0.15;
    },
    height() {
      return long * 0.15;
    },
    ticker: function(d: number) {
      this.me.rotation += 0.06;
      this.me.axisY += 0.1;
    },
    init: function(sprite: PIXI.Sprite) {
      this.me.interactive = true;
      this.me.buttonMode = true;
      this.me.cursor = "hover";
      this.me.on("pointerdown", function() {
        alert("OwO");
      });
    }
  }
);

//RENDER
let frames = 0;
let fpscounter;
function startup(): void {
  //FPS counter
  fpscounter = setInterval(function() {
    initText(fps, frames, 5, window.innerHeight - 45);
    frames = 0;
  }, 1000);

  //ticker
  app.ticker.add(function(delta: number) {
    ++frames;
    for (name in environment.cores) {
      if (typeof environment.cores[name].ticker === "function")
        environment.cores[name].ticker(delta);
    }
  });
}
startup();

//on first click
document.addEventListener("click", firstClick);
document.addEventListener("touchstart", firstClick);
function firstClick() {
  //remove event listeners
  document.removeEventListener("click", firstClick);
  document.removeEventListener("touchstart", firstClick);

  //start ambiance music
  let ambianceSound = new Audio(
    "https://raw.githubusercontent.com/radex02/pixi-tests/master/audios/ambiance.mp4"
  );
  ambianceSound.loop = true;
  ambianceSound.play();
}
