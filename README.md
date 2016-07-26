# scrollbot
Custom scrollbar using pure javascript

**Usage:**

include 
```html
<script src="scrollbot.js"></script>
```

And in js

```javascript
new scrollbot(element,width)
```
`element` is the element to be selected and width is the `width` of the scrollbar

Methods:

`.setStyle(scrollbar,scrollbarholder)` where `scrollbar`(object) is used to style the scrollbar and `scrollbarholder`(object) is used to style the scrollbar holder.
`.refresh()` to recalculate the scrollbar properties incase of height change
`.onScroll(function)` to be executed while scrolling 

**[Demo on Codepen](http://codepen.io/akshay-7/pen/Wxrgrw)**

