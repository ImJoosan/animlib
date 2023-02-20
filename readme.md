# Animlib

Animlib is a Javascript Code.org library for creating and playing animations

## Installation




Hit the settings cog next to the toolbox. Hit manage libraries. You should see Animlib under the author Joosan. If you don't see it, use the library id: 'pVjZOLbmOUcM9RQgaXeWta8N2yy5eqpmVpu1EmFZZII' Hit the plus next to the Animlib library and the page should refresh. When you run your program, it will automatically detect that it's your first time installing it within the project and will prompt you with tutorial text. 

## Update detection
Animlib will automatically detect when there is an update to the library and will put a message in the output telling you so. To update, follow the same steps to get to manage libraries. There is a list containing all of your instsalled libraries for the project. Hit the update icon next to Animlib to update. After you update, the page will refresh and you'll get a message in the console telling what's new. You can view the changelog by running the Animlib.changelog() function.
## Usage
### animateElement()



```javascript
Animlib.animateElement(element,propertyTable,duration,style,direction,repeatCount,reverses,delay,callback)
```
The arguments needed to run this are element and propertyTable. The rest are optional.

Easing Styles include: linear, sine, quad, cubic, quart, quint, expo, circ, back, elastic, and bounce.

Easing Directions are in, out, and inout.

### The id returned by the Animlib.animateElement function is required to run all other functions.

### stopAnimation()

```javascript
Animlib.stopAnimation(id,delay)
```
stopAnimation stops and deletes an animation.
### pauseAnimation()
```javascript
Animlib.pauseAnimation(id,delay)
```
pauseAnimation stops an animation without deleting it. 

### resumeAnimation()
```javascript
Animlib.resumeAnimation(id,delay)
```
resumeAnimation resumes an animation that was previously paused. If the animation had been stopped with stopAniamtion, resumeAnimation would not work as the animation would be deleted.

## License
```
© 2023 Joosan, All Rights Reserved, <bongocatjoosan@gmail.com>
 ▐▄▄▄            .▄▄ ·  ▄▄▄·  ▐ ▄ 
  ·██▪     ▪     ▐█ ▀. ▐█ ▀█ •█▌▐█
▪▄ ██ ▄█▀▄  ▄█▀▄ ▄▀▀▀█▄▄█▀▀█ ▐█▐▐▌
▐▌▐█▌▐█▌.▐▌▐█▌.▐▌▐█▄▪▐█▐█ ▪▐▌██▐█▌
 ▀▀▀• ▀█▄▀▪ ▀█▄▀▪ ▀▀▀▀  ▀  ▀ ▀▀ █▪
```
