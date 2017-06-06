# ink-ripple

The Ink Ripple web component aims to provide a simple and customizable ripple effect, as defined by material design [motion & radial reaction](https://material.io/guidelines/motion/choreography.html#choreography-radial-reaction). It is designed to work when placed within any non-inline element.

- Creates a ripple effect on pointer events
- Support for customizable accent colours
- Allows 'simulated' ripples (those triggered programatically and not by pointer events)

<!--
```
<custom-element-demo>
  <template>
    <style>
      .demo-paper {
        position: relative;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        width: 200px;
        background: white;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.2);
        margin: 8px;
        padding: 0 16px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        transition: box-shadow .2s ease-in-out;
      }
      .demo-paper:active {
        box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
      }
    </style>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="ink-ripple.js"></script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div class="demo-paper">
  <ink-ripple></ink-ripple>
</div>
```