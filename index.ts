import './style.css';
import "https://raw.githubusercontent.com/Chman/Typogenic/master/Typogenic/Demos/00.%20Fonts/Arial/Arial.fnt";
import "https://raw.githubusercontent.com/Chman/Typogenic/master/Typogenic/Demos/00.%20Fonts/Arial/Arial.png"
import * as PIXI from 'pixi.js';

//create container
const app = new PIXI.Application({
  backgroundColor: 0x70fdff,
  resolution: window.devicePixelRatio
});
document.body.appendChild(app.view);

//initiating style vars
let viewport:string;
let long:number;
let large:number;
let name:string;
let property:string;

//style
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";

function initStyle() {
  if (window.innerWidth < window.innerHeight) viewport = "portrait";
  else viewport = "landscape";
  long = Math.max(window.innerWidth, window.innerHeight);
  large= Math.min(window.innerWidth, window.innerHeight);
  app.renderer.resize(window.innerWidth, window.innerHeight);
}
initStyle()

//when resize
window.addEventListener("resize", function(){
  initStyle()
  for (name in environment.cores) {
    for (property in environment.cores[name]) {
      if (typeof environment.cores[name][property] === "function") {
        environment.sprites[name][property] = environment.cores[name][property]() 
      }
    }
  }
});

//creating environment
const environment = {
  sprites: {},
  cores: {}
};

//SUPER FONCTION DE CRÉATION DE SPRITE
function initSprite(name:string, source:string, init:{}) {
  app.loader.add(name, source)
    .load(function(){
      environment.sprites[name] = new PIXI.Sprite(app.loader.resources[name].texture);
      environment.cores[name] = init;
      environment.sprites[name].anchor.set(0.5);
      
      //setting properties
      environment.cores[name].me = environment.sprites[name]; //setting reference
      let property;
      for (property in init) {
        if (typeof environment.cores[name][property] === "function") {
          environment.sprites[name][property] = environment.cores[name][property]() 
        } else {
          environment.sprites[name][property] = environment.cores[name][property]
        }
      }
      app.stage.addChild(environment.sprites[name]);
    });
}

//ACTION
initSprite("doc", "https://raw.githubusercontent.com/radex02/pixi-tests/master/images/doc.gif", {
  x() {return window.innerWidth - long*0.075 - 10},
  y() {return long*0.075 + 10},
  width() {return long*0.15},
  height() {return long*0.15},
  ticker: function(d:number){
    this.me.rotation += 0.06;
  }
});

//RENDER
let frames = 0;
let fpscounter;
function startup() {
  //FPS counter
  fpscounter = setInterval(function(){
    console.log(frames);
    frames = 0;
  }, 1000)

  //ticker
  app.ticker.add(function(delta:number) {
    ++frames;
    for (name in environment.cores) {
      if (typeof environment.cores[name].ticker === "function") environment.cores[name].ticker(delta)
    }
  })
}
startup()

let bitmapText = new PIXI.BitmapText("text using a fancy font!", {font: {
  name: "Arial",
  size: 24
}, align: "right"});
