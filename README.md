# scrollbot 
Custom scrollbar using pure javascript [Demo](https://akzhy.github.io/scrollbot/)

scrollbot doesn't use `mousewheel` to create the scrolling effect, instead it hides the natural scrollbar. So properties like `scrollTop` can be used on the `scrollElement`. Other plugins that uses the scroll function can also be used with scrollbot. 

**Usage:**

include 
```html
<script src="scrollbot.js"></script>
```

And in js

```javascript
var customScroll = new scrollbot(element,width)
```
`element` is the element to be selected and width is the `width` of the scrollbar

Methods:

`.setStyle(scrollbar,scrollbarholder)` where `scrollbar`(object) is used to style the scrollbar and `scrollbarholder`(object) is used to style the scrollbar holder.

Eg:

```javascript
customScroll.setStyle({
  'background':'#000',
  'border-radius':'20px'
},{
  'background':'#fff',
  'opacity':'.5'
})
```

`.setScroll(scrollPosition,duration)`. scrollposition - integer position to scroll to. duration in milliseconds.

`.refresh()` to recalculate the scrollbar properties incase of height change. (Use it on window load.)

`.onScroll(function)` to be executed while scrolling .

`.destroy()` to remove all custom scroll properties and show the original default scroll bar.

Properties

`.scrollBar` the scrollbar element

`.scrollBarHolder` the scrollbar holder element

`.scrollElement` the element which scrolls. Refer this element to other plugins that use the scroll function. ie this element will show the `scrollTop` position. In the demo [ScrollReveal](https://github.com/jlmakes/scrollreveal) is used.

`.scrollSpeed` speed at which element scrolls when clicked on the scrollbar holder. default 200ms



