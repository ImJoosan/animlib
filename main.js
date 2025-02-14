/* © 2023 Joosan, All Rights Reserved, <bongocatjoosan@gmail> */

var runningAnimations = {};

var version = "Version 1.5";

var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var pow = Math.pow;

var easingStyles = { /* All easing functions provided by https://easings.net/ :) (Reference: https://gist.github.com/gre/1650294)*/
  sinein: function(x) { return 1 - cos((x * PI) / 2); },
  sineout: function(x) { return sin((x * PI) / 2); },
  sineinout: function (x) { return -(cos(PI * x) - 1) / 2; },
  quadin: function(x) { return x * x; },
  quadout: function(x) { return 1 - (1 - x) * (1 - x); },
  quadinout: function(x) { return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2; },
  cubicin: function (x){ return x * x * x; },
  cubicout: function(x) { return 1 - pow(1 - x, 3); },
  cubicinout: function(x) { return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2; },
  quartin: function(x) { return x * x * x * x; },
  quartout: function(x) { return 1 - Math.pow(1 - x, 4); },
  quartinout: function(x) { return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2; },
  quintin: function(x) { return x * x * x * x * x; },
  quintout: function(x) { return 1 - pow(1 - x, 5); },
  quintinout: function(x) { return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2; },
  expoin: function(x) { return x === 0 ? 0 : pow(2, 10 * x - 10); },
  expoout: function(x) { return x === 1 ? 1 : 1 - pow(2, -10 * x); },
  expoinout: function(x){ return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2; },
  circin: function(x) { return 1 - sqrt(1 - pow(x, 2)); },
  circout: function(x) { return sqrt(1 - pow(x - 1, 2)); },
  circinout: function(x){ return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2; },
  backin: function(x) { var c1 = 1.70158; var c3 = c1 + 1; return c3 * x * x * x - c1 * x * x; },
  backout: function(x) { var c1 = 1.70158; var c3 = c1 + 1; return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2); },
  backinout: function(x) { var c1 = 1.70158; var c2 = c1 * 1.525; return x < 0.5 ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2; },
  elasticin: function(x) { var c4 = (2 * PI) / 3; return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4); },
  elasticout: function(x) { var c4 = (2 * PI) / 3; return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1; },
  elasticinout: function(x) { var c5 = (2 * PI) / 4.5; return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1; },
  bouncein: function(x) { return 1 - easingStyles.bounceout(1 - x); },
  bounceout: function(x) { var n1 = 7.5625; var d1 = 2.75; if (x < 1 / d1) { return n1 * x * x; } else if (x < 2 / d1) { return n1 * (x -= 1.5 / d1) * x + 0.75; } else if (x < 2.5 / d1) { return n1 * (x -= 2.25 / d1) * x + 0.9375; } else { return n1 * (x -= 2.625 / d1) * x + 0.984375; } },
  bounceinout: function(x) { return x < 0.5 ? (1 - easingStyles.bounceout(1 - 2 * x)) / 2 : (1 + easingStyles.bounceout(2 * x - 1)) / 2; },
};

var animationCount = 0;

var rotations = {};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/*Check function used for outputting messages if specified value is false (only used internally)*/
function check(bool,message,callback){
  if(!(bool||bool===0)){
    console.log("ANIMLIB: "+message);
  }
  if(callback&&(!(bool||bool===0))){
    callback();
  }
  return bool||bool===0;
}

function removeItemsFromObject(obj1, obj2) {
  var result = {};
  for (var key in obj1) {
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      result[key] = obj1[key];
    }
  }
  return result;
}

function extractRGB(rgbStr) {
  var startIndex = rgbStr.indexOf("(") + 1;
  var endIndex = rgbStr.indexOf(")");
  var components = rgbStr.slice(startIndex, endIndex).split(",");
  var alpha = components.length === 4 ? Number(components[3]) : 1;
  var red = Number(components[0]);
  var green = Number(components[1]);
  var blue = Number(components[2]);
  return { r: red, g: green, b: blue, a: alpha };
}

/*Animates Specified Element (Returns string id of the animation)*/
function animateElement(element,propertyTable,duration,style,direction,delay,offset,callback){ 
  var id = "AM"+animationCount;
  
  var m1 = "Animation could not be played. (Element \""+element+"\" does not exist)";
  var m2 = "Animation could not be played. Time is not defined.";
  
  if(check(getProperty(element,"x"),m1) && check(duration,m2)){
    style = style?style:"sine";
    direction = direction?direction:"out";
    duration = duration * 1000;
    
    setTimeout(function(){
      var starts = {};
      for (var prop in propertyTable){
        if(prop=="rotation"){
          rotations[element] = rotations[element]?rotations[element]:0;
          starts.rotation = rotations[element];
        }
        else if(prop=="opacity"){
          starts.opacity = callback||callback===0?callback:1;
        }
        else 
        {
          var start = getProperty(element,prop);
          starts[prop] = start;
        }
      }
      
      var tweenfunction = easingStyles[style+direction];
      if(check(tweenfunction||style=="linear","Tween Style: "+style+":"+direction+" not recognized.")){
        if(!runningAnimations[id]){
          runningAnimations[id] = {};
        }
        for(var animId in runningAnimations){
          var animation = runningAnimations[animId];
          if(animation&&animation.element==element){
            animation.propertyTable = removeItemsFromObject(animation.propertyTable,propertyTable);
            if(Object.keys(animation.propertyTable).length==0){
              stopAnimation(animId);
            }
          }
        }
        
        var last = Date.now();
        var elapsed = 0;
        runningAnimations[id] = {
          propertyTable:propertyTable,
          element:element,
        };
        
        var anim = setInterval(function(){
          var newPropertyTable = runningAnimations[id].propertyTable;
          for (var property in newPropertyTable) {
            var now = Date.now();
            var dt = now-last;
            last = Date.now();
            elapsed += dt;
            
            var t = Math.min(elapsed/(duration),1);
            var tween = style == "linear" ? t : tweenfunction(t);
            var k = lerp(starts[property],offset?starts[property]+newPropertyTable[property]:newPropertyTable[property], tween);
            if(property=="rotation"){
              rotate(element,k);
            }
            else if(property=="opacity"){
              setStyle(element,"opacity:"+k);
            }
            else if(property.includes("color")){
              var start = extractRGB(starts[property]);
              var end = extractRGB(newPropertyTable[property]);
              setProperty(element,property,rgb(lerp(start.r,end.r,tween),lerp(start.g,end.g,tween),lerp(start.b,end.b,tween),lerp(start.a,end.a,tween).toFixed(2)));
            }
            else{
              setProperty(element,property,k);
            }
            if(tween==1){
              stopAnimation(id);
              if(property!="rotation"&&property!="opacity"){
                setProperty(element,property,offset?starts[property]+newPropertyTable[property]:newPropertyTable[property]);
              }
            }
          }
        },0);
        runningAnimations[id] = {
          propertyTable:propertyTable,
          animation:anim,
          element:element,
        };
        if(callback&&propertyTable.opacity===undefined){
         setTimeout(callback,duration);
        }
      }
    },delay*1000);
    animationCount += 1;
    return id;
  }
}

/*Stops Specified Animation by ID*/
function stopAnimation(id){
  if(runningAnimations[id]){
    clearInterval(runningAnimations[id].animation);
    delete runningAnimations[id];
  }
}

/*Returns a bool declaring if an animation is playing*/
function isAnimationPlaying(id){
  return runningAnimations[id];
}

/*Updates the animlib key to the current version (used for update detection)*/
function update(){
  setKeyValue("animlib",version);
}

/*Rotates an element by degrees*/
function rotate(element,degrees){
  degrees = degrees%360;
  setStyle(element, "transform : rotate("+Math.round(degrees)+"deg);");
  if(degrees===0||degrees){
    rotations[element] = degrees;
  }
  else {
   rotations[element] = rotations[element]; 
  }
}

/*Check for updates.*/
startWebRequest("https://api.github.com/repos/NotJoosan/animlib",function(a,b,c){
  if(c){
    try{
      var content = JSON.parse(c);
      check(content&&content.description==version,"Animlib has an update! ("+version+" → "+content.description+")");
    }
    catch(error) {
      check(false,"Animlib was unable to check for updates. ("+error+")");
    }
  }
});

getKeyValue("animlib",function(v){
  if(v){
    check(v===version,"Animlib has been updated, you are now on "+version+".",update);
  }
  check(!!v,"Animlib by Joosan has been installed. To view documentation, click link on screen. You may also run the Animlib.documentation() command.",function(){
    write('<a href="https://github.com/NotJoosan/animlib" target="_blank">Animlib Documentation</a>');
    update();
  });
});

/*Gives users the tutorial and documentation*/
function documentation(){
  console.log("ANIMLIB: Tutorial and documentation can be found at https://github.com/NotJoosan/animlib");
  write('<a href="https://github.com/NotJoosan/animlib" target="_blank">Animlib Documentation</a>');
}
