import React from 'react'
import AuthLayout from '../../src/authLayout/index'

function Signup() {
  return (
    <div>Signup</div>
  )
}

export default Signup
Signup.getLayout = function(page) {
    return <AuthLayout>{page}</AuthLayout>;
  };