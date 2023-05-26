
// Before transpilation
const JsxComponent = <div id="myComponent">
  <p onclick={() => console.log('"p" was clicked')}>
    some text
  </p>
</div>;

// After transpilation
import { jsx } from "@jsx/jsx-runtime";
const TranspiledComponent = jsx(
  'div', 
  { id: 'myComponent' }, 
  jsx(
    'p', 
    { onclick(){ console.log('"p" was clicked') } },
    "some text"
  )
)

console.log(JsxComponent, TranspiledComponent);
