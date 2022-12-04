import { $ } from "../utils/reactive";

window.addEventListener('popstate', () => pathname.value = window.location.pathname)

export const pathname = $(window.location.pathname, path => {
    window.history.pushState({}, '', window.location.origin + path)
})