import { $, Button, Div, H1, Input } from "../../lib"
import { is } from "../../lib/operators/is"
import { request } from "../../lib/request"
import { pathname } from "../../lib/router/pathname"
import { FC } from "../../lib/types"
import { ErrorFlag } from "../components/ErrorFlag"

export const LoginPage: FC = () => {
  console.log('loginPage')

  const email = $('')
  const password = $('')
  const error = $('')

  const onLogin = async () => {
    const body = {
      email: email.value,
      password: password.value,
    }
    
    const res = await request.POST('http://localhost:3001/auth/login', body)

    if (res.error) {
      error.value = res.error
      return
    }

    const token = res.token
    localStorage.setItem('token', token)
    console.log('Token saved!', token)
    pathname.value = '/home'
  }
  
  const onGoToRegister = () => { pathname.value = '/register' }

  return Div({ className: 'login' },
    H1({}, 'Login'),
    is(error, e => e, ErrorFlag({ error })),
    Input({ placeholder: 'Email', value: email }),
    Input({ placeholder: 'Password', value: password }),
    Button({ onclick: onLogin }, 'Login'),
    Button({ onclick: onGoToRegister }, 'Dont have an account ?')
  )
}