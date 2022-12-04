import { Button, Div, H1, Input } from "../../lib"
import { pathname } from "../../lib/router/pathname"
import { FC } from "../../lib/types"

export const LoginPage: FC = () => {
  console.log('loginPage')
  
  const onclick = () => { pathname.value = '/register' }

  return Div({ className: 'login' },
    H1({}, 'Login'),
    Input({ placeholder: 'Email' }),
    Input({ placeholder: 'Password' }),
    Button({}, 'Login'),
    Button({ onclick }, 'Dont have an account ?')
  )
}