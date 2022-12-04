import { $, Button, Div, H1, Input, P } from "../../lib";
import { pathname } from "../../lib/router/pathname";
import { FC } from "../../lib/types";

export const RegistrationPage: FC = () => {
  console.log('registerPage')

  const onclick = () => { pathname.value = '/login' }

  return Div({ className: 'registration' },
    H1({}, 'Registartion'),
    Input({ placeholder: 'Email' }),
    Input({ placeholder: 'Password' }),
    Input({ placeholder: 'First name' }),
    Input({ placeholder: 'Last name' }),
    Input({ placeholder: 'Age' }),
    Button({}, 'Register'),
    Button({ onclick }, 'Already have an account?')
  )
}