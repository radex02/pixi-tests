import './style.css';
import * as PIXI from 'pixi.js';

//init
const app = new PIXI.Application({
  backgroundColor: 0x70fdff
});
document.body.appendChild(app.view);

//style
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", function(){
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

//caching
type animation = (delta:number) => void;

const environment = {
  sprites: [],
  animations: []
};
/*
function initSprite(name:string, source:string) {
  app.loader.add(name, source)
    .load(function(){
      environment.sprites[name] = new PIXI.Sprite(app.loader.resources[name].texture);
      app.stage.addChild(environment.sprites[name]);
    });
}
initSprite("doc", "https://github.com/radex02/pixi-tests/blob/master/images/doc.png?raw=true");
*/

  app.loader.add("doc", "https://github.com/radex02/pixi-tests/blob/master/images/doc.png?raw=true")
    .load(function(){
      environment.sprites["doc"] = new PIXI.Sprite(app.loader.resources["doc"].texture);
      //app.stage.addChild(environment.sprites.doc);
    });

//action
function startup() {
  app.ticker.add(function(delta) {
      environment.animations.forEach(function(act:animation){
        act(delta)
      })
  })
}

setInterval(function(){console.log(environment)}, 2500)
