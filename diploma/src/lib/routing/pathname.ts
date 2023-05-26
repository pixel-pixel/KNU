import { BehaviorSubject } from "rxjs";

export const pathname = new BehaviorSubject(window.location.pathname)
pathname.subscribe(path => {
    window.history.pushState({}, '', window.location.origin + path)
})

window.addEventListener('popstate', () => pathname.next(window.location.pathname))
