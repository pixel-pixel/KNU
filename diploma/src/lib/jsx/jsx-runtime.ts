import { createComponent, createTextComponent } from '@components'

const textTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
];

export const jsx = (tag: keyof HTMLElementTagNameMap | Function, options: any, ...children: any): HTMLElement => {
  const flatChildren = children.flat()
  if (typeof tag === 'function') {
    return tag(options, flatChildren)
  }

  if (textTags.includes(tag)) return createTextComponent(tag, options, flatChildren);
  return createComponent(tag, options, flatChildren);
}
