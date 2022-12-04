const div = ({
  onclick
}: any, ...childs: Node[]) => { 
  const res = document.createElement('div')
  res.onclick = onclick.bind(res)
  childs.forEach(c => res.appendChild(c))
  return res
}

export {
  div,
}