import { createStdComponent } from "../utils/createStdComponent";
import { createStdTextComponent } from "../utils/createStdTextComponent";
import { Reactive } from "../utils/reactive";

export const P = createStdTextComponent('p')
export const H1 = createStdTextComponent('h1')
export const H2 = createStdTextComponent('h2')
export const H3 = createStdTextComponent('h3')
export const H4 = createStdTextComponent('h4')
export const H5 = createStdTextComponent('h5')
export const H6 = createStdTextComponent('h6')

export const Div = createStdComponent('div')
export const Input = createStdComponent('input', (el, props) => {
  if (!props.value) return
  el.oninput = (event) => {
    if (props.value instanceof Reactive) {
      props.value.value = (event.target as any).value
    }
  }
})
export const Button = createStdComponent('button')

