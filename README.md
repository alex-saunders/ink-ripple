# ink-ripple

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/alex-saunders/ink-ripple)

The Ink Ripple web component aims to provide a simple, customizable and dependency-free ripple effect, as defined by material design [motion & radial reaction](https://material.io/guidelines/motion/choreography.html#choreography-radial-reaction).

- Responds to pointer events to control the ripple
- Support for customizable accent colours & opacity
- Allows 'simulated' ripples (those triggered programatically and not by pointer events)

**note: the parent element of the ink-ripple must be a non-inline element and positioned using relative, absolute, fixed or sticky.**

<!--
```
<custom-element-demo>
  <template>
    <link rel="stylesheet" href="demo/styles.css">
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="ink-ripple.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div>
  Click me!
  <ink-ripple></ink-ripple>
</div>
```

## Styling the ripple

You have the ability to control the accent colour and opacity of the ripple through the use of CSS variables, the default colour is black with an opacity of 0.15

<!--
```
<custom-element-demo>
  <template>
    <link rel="stylesheet" href="demo/styles.css">
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="ink-ripple.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<style>
  ink-ripple {
    --ink-ripple-accent-color: green;
    --ink-ripple-opacity: 0.6;
  }
</style>
<div>
  Click me!
  <ink-ripple></ink-ripple>
</div>
```

## Simulate a ripple effect

Ripples can be triggered progamatically through the use of the `simulateRipple(x, y)` method. This method takes 2 parameters, `x` & `y`, representing the offset x and y coordinates of the ripple's origin, relative to the parent element. If one or both of these parameters are not given, the ripple will originate from the center of the element.

Disabled ink-ripples can still be triggered through the use of `simulateRipple`.

<!--
```
<custom-element-demo>
  <template>
    <link rel="stylesheet" href="demo/styles.css">
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="ink-ripple.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div>
  <ink-ripple></ink-ripple>
</div>
<button>simulateRipple()</button>
<script>
  const ripple = document.querySelector('ink-ripple');
  const btn = document.querySelector('button');
  btn.addEventListener('click', () => {
    ripple.simulateRipple();
  });
</script>
```

<!--
```
<custom-element-demo>
  <template>
    <link rel="stylesheet" href="demo/styles.css">
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="ink-ripple.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div>
  <ink-ripple disabled></ink-ripple>
</div>
<button>simulateRipple(1, 1)</button>
<script>
  const ripple = document.querySelector('ink-ripple');
  const btn = document.querySelector('button');
  btn.addEventListener('click', () => {
    ripple.simulateRipple(1, 1);
  });
</script>
```

## Disable ripple effect

Ripples can be disabled by setting the `disabled` attribute on the element. Disabled ink-ripples do not respond to pointer events.

<!--
```
<custom-element-demo>
  <template>
    <link rel="stylesheet" href="demo/styles.css">
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="ink-ripple.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div>
  I am disabled
  <ink-ripple disabled></ink-ripple>
</div>
```