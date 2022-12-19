import React from 'react'
import AuthLayout from '../../src/authLayout/index'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login
Login.getLayout = function(page) {
  return <AuthLayout>{page}</AuthLayout>;
};