# Animlib

Animlib is a JavaScript Code.org library for creating and playing animations.

## Installation




Hit the settings cog next to the toolbox. Hit manage libraries. You should see Animlib under the author Joosan. If you don't see it, use the library id: 'pVjZOLbmOUcM9RQgaXeWta8N2yy5eqpmVpu1EmFZZII' Hit the plus next to the Animlib library and the page should refresh. When you run your program, it will automatically detect that it's your first time installing it within the project and will prompt you with  documentation. 

## Update detection
Animlib will automatically detect when there is an update to the library and will put a message in the console telling you so. To update, follow the same steps to get to manage libraries. There is a list containing all of your installed libraries for the project. Hit the update icon next to Animlib to update. After you update, the page will refresh and you'll get a message stating that you have updated.
## Usage
### animateElement()


```javascript
Animlib.animateElement(element,propertyTable,duration,style,direction,delay,offset,callback)
```

Easing Styles include: linear, sine, quad, cubic, quart, quint, expo, circ, back, elastic, and bounce.

Easing Directions are in, out, and inout.

#### The offset parameter dictates if the property should tween to the specified value or should tween to the existing property with the added offset of the specified value. (offset does not work with color)

### The id returned by the Animlib.animateElement function is required to run all other functions.

### stopAnimation()

```javascript
Animlib.stopAnimation(id,delay)
```
stopAnimation() stops an animation with a specified id with optional delay.
### isAnimationPlaying()
```javascript
Animlib.isAnimationPlaying(id)
```
Returns whether an animation with a specified id is playing.

### rotate()
```javascript
Animlib.rotate(element,degrees)
```
Animlib has a built in rotate function. The reason for this is because rotation is not a property and can only be set with setStyle() so Animlib keeps track of rotations in it's own property table and allows the user to rotate with the function.

## Tutorial
### animateElement()
```javascript
Animlib.animateElement(element,propertyTable,duration,style,direction,delay,offset,callback)
```
The arguments needed to run this are element, propertyTable and duration. The rest are optional. If no style is chosen, it will default to sine; likewise with direction defaulting to out.

If you are unfamiliar with how propertyTable works, it's quite simple. Looking at the example below, you'll find that for each property you list, you'll also need a value separated by a colon. Every key and value should be separated with commas. The dictionary/table itself should be closed in {curly brackets}. For properties such as background-color, put them in quotation marks.
```javascript
{x:320,y:450,rotation:90,"background-color":rgb(255,128,0,1)}
```

Below is a basic example of how to use the function in code.org applab It will rotate the button 360 degrees with the easing of 'sine-inout'. It's also being stored in a variable. That variable will contain the id that you would need to stop the animation.
```javascript
var anim = Animlib.animateElement("button1",{rotation:360,height:100},1,"sine","inout");
```

### stopAnimation()

```javascript
Animlib.stopAnimation(id,delay)
```
To use stopanimation, we will use the code from the previous example. In the code below, you will see we play an animation and store it in a variable. In the second line of code, it stops the animation we stored in the 'anim' variable with a delay of 0.5 seconds. This will play the animation half way before stopping it as the duration of the animation is 1 second.

```javascript
var anim = Animlib.animateElement("button1",{rotation:360,height:100},1,"sine","inout");
Animlib.stopAnimation(anim,0.5);
```

### isAnimationPlaying()
```javascript
Animlib.isAnimationPlaying(id)
```
isAnimationPlaying returns a boolean (true/false) dictating whether an animation is playing or not. In the example below, it returns true because the animation just started playing, and we called it right after.
```javascript
var anim = Animlib.animateElement("button1",{rotation:360,height:100},1,"sine","inout");
console.log(Animlib.isAnimationPlaying(anim)); //true
```

### rotate()
```javascript
Animlib.rotate(element,degrees)
```
Animlib's rotate function is helpful for rotating objects. In the example below, it rotates button1 90 degrees.
```javascript
Animlib.rotate("button1",90);
```

## License
```
© 2023 Joosan, All Rights Reserved, <bongocatjoosan@gmail.com>
 ▐▄▄▄            .▄▄ ·  ▄▄▄·  ▐ ▄ 
  ·██▪     ▪     ▐█ ▀. ▐█ ▀█ •█▌▐█
▪▄ ██ ▄█▀▄  ▄█▀▄ ▄▀▀▀█▄▄█▀▀█ ▐█▐▐▌
▐▌▐█▌▐█▌.▐▌▐█▌.▐▌▐█▄▪▐█▐█ ▪▐▌██▐█▌
 ▀▀▀• ▀█▄▀▪ ▀█▄▀▪ ▀▀▀▀  ▀  ▀ ▀▀ █▪
```
