import { $, Button, Div, H1, Input, P } from "../../lib";
import { is } from "../../lib/operators/is";
import { pathname } from "../../lib/router/pathname";
import { FC } from "../../lib/types";
import { ErrorFlag } from "../components/ErrorFlag";

export const RegistrationPage: FC = () => {
  console.log('registerPage')

  const email = $('')
  const password = $('')
  const firstName = $('')
  const lastName = $('')
  const age = $('')
  const error = $('')

  const onRegister = async () => {
    const body = JSON.stringify({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value
    })

    const res = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body,
    })

    const json = await res.json()

    if (json.error) {
      error.value = json.error
      return
    }

    const token = json.token
    localStorage.setItem('token', token)
    console.log('Token saved!', token)
    pathname.value = '/home'
  }

  const onGoToLogin = () => { pathname.value = '/login' }

  return Div({ className: 'registration' },
    H1({}, 'Registartion'),
    is(error, e => e, ErrorFlag({ error })),
    Input({ placeholder: 'Email', value: email }),
    Input({ placeholder: 'Password', value: password }),
    Input({ placeholder: 'First name', value: firstName }),
    Input({ placeholder: 'Last name', value: lastName }),
    Input({ placeholder: 'Age', value: age }),
    Button({ onclick: onRegister }, 'Register'),
    Button({ onclick: onGoToLogin }, 'Already have an account?')
  )
}