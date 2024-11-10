import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Authentication.css'
import { useUser } from '../context/useUser'


export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
})


export default function Authentication({authenticationMode}) {
  const {user,setUser, signUp, signIn} = useUser()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async(e) => {
    console.log(authenticationMode.toString())
    console.log(authenticationMode === AuthenticationMode.Register)
    e.preventDefault()

    try{
      sessionStorage.setItem( 'password', user.password )
      sessionStorage.setItem( 'email', user.email)
      if (authenticationMode === AuthenticationMode.Register) { console.log('inside reg')
        await signUp()
        navigate('/signin') //modified
      } else {
        await signIn()
        navigate('/')
      }
    } catch (error) {
      const message = error.response && error.response.data? error.response.data.error : error
      alert(message)
    }
  }


  return (
    <div>
      <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in': 'Sign up'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type='email' value={user.email} onChange={e=>setUser({...user,email: e.target.value})}/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={user.password} onChange={e=>setUser({...user,password: e.target.value})}/>
        </div>
        <div>
          <button>{authenticationMode === AuthenticationMode.Login ? 'Login': 'Submit'}</button>
        </div>
        <div>
          <Link to={authenticationMode === AuthenticationMode.Login ? '/signup': '/signin'}>
            {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up': 'Already signed up? Sign in'}
          </Link>
        </div>
      </form>
    </div>
  )
}
