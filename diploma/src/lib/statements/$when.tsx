import { FC } from "@common";
import { WhenProps } from "./types";
import { combineLatest } from "rxjs";

export const $when: FC<WhenProps> = ({
  values,
  satisfy,
  draw
}) => {
  const temp = <div/> as HTMLElement

  let parrentNode: Node
  let parrentIndex = 0
  let prevValue: any = undefined
  let child: HTMLElement

  combineLatest(values)
    .subscribe(async values => {
      if (!parrentNode) {
        await true
        parrentNode = temp.parentNode!
        parrentNode.childNodes.forEach((n, i) => n === temp && (parrentIndex = i))
        
        parrentNode.removeChild(temp)
      }

      const satisfyResult = satisfy(values)
      
      if (satisfyResult === prevValue) return
      prevValue = satisfyResult

      if (satisfyResult) {
        if (!child) child = draw(undefined)

        if (parrentIndex > parrentNode.childNodes.length) parrentNode.appendChild(child)
        else parrentNode.insertBefore(child, parrentNode.childNodes[parrentIndex])

      } else if (parrentNode.contains(child)) {
        parrentNode.removeChild(child)
      }
    })

  return temp
}