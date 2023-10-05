const loginForm = {
  title: 'Log In',
  form:
    [
      {
        type: 'username',
        name: 'Username',
      },
      {
        type: 'password',
        name: 'Password',
      }
    ],
  request: '/api/auth/login/',
}
const registerForm = {
  title: 'Register',
  form:
    [
      {
        type: 'text',
        name: 'Username',
      },
      {
        type: 'email',
        name: 'Email',
      },
      {
        type: 'password',
        name: 'Password',
      },
      {
        type: 'password',
        name: 'Password Confirmation',
      }
    ],
  request: '/api/auth/register/',
}

export { loginForm, registerForm }