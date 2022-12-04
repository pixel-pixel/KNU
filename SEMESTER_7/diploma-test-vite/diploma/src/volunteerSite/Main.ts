import { $, Div, P } from "../lib"
import { Router } from "../lib/router/Router"
import { Header } from "./components/Header"
import { LoginPage } from "./pages/LoginPage"
import { RegistrationPage } from "./pages/RegistartionPage"

export const Main = () => {
  return Div({},
    Header(),
    Router({
      '/': RegistrationPage,
      '/register': RegistrationPage,
      '/login': LoginPage
    }),
    'bottom'
  )
}