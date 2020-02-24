import './style.css';
import * as PIXI from 'pixi.js';

//init
const app = new PIXI.Application({
  backgroundColor: 0x70fdff,
  resolution: 1
});
document.body.appendChild(app.view);

//style
let viewport:string;
let long:number = Math.max(window.innerWidth, window.innerHeight);
let large:number = Math.min(window.innerWidth, window.innerHeight);

if (window.innerWidth < window.innerHeight) viewport = "portrait";
else viewport = "landscape";
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", function(){
  app.renderer.resize(window.innerWidth, window.innerHeight);
  long = Math.max(window.innerWidth, window.innerHeight);
  large= Math.min(window.innerWidth, window.innerHeight);
  if (window.innerWidth < window.innerHeight) viewport = "portrait";
  else viewport = "landscape";
  let name:string;
  let property:string;
  for (name in environment.cores) {
    for (property in environment.cores[name]) {
      if (typeof environment.cores[name][property] === "function") {
        environment.sprites[name][property] = environment.cores[name][property]() 
      } else {
        environment.sprites[name][property] = environment.cores[name][property]
      }
    }
  }
});

//caching
const environment = {
  sprites: {},
  cores: {}
};

function initSprite(name:string, source:string, init:{}) {
  app.loader.add(name, source)
    .load(function(){
      environment.sprites[name] = new PIXI.Sprite(app.loader.resources[name].texture);
      environment.cores[name] = init;
      environment.sprites[name].anchor.set(0.5);
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

//action
initSprite("doc", "https://raw.githubusercontent.com/radex02/pixi-tests/master/images/doc.gif", {
  x() {return window.innerWidth - long*0.075 - 10},
  y() {return long*0.075 + 10},
  width() {return long*0.15},
  height() {return long*0.15},
  roundPixels: true
});

function startup() {
  app.ticker.add(function(delta) {
      
  })
}