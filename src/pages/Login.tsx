import { useContext, useState } from 'react'
import axios from 'axios'
import Layout from './layout'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

interface CustomPayload extends JwtPayload {
  roles: string[]
  username: string
  exp: number
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [pwdToText, setPwdToText] = useState<string>('password')
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        'https://localhost:8000/api/login_check',
        {
          username: email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/ld+json',
          },
        }
      )

      if (response.data.token) {
        const payload = jwtDecode(response.data.token) as CustomPayload
        const { exp, roles, username } = payload

        setUser({ exp, roles, username, token: response.data.token })

        navigate('/home')
      }
    } catch (error) {
      setError('Mauvais email ou mot de mot de passe.')
      console.log('error:', error)
    }
  }

  const onButtonClick = () => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(
        'Veuillez saisir une adresse mail valide, ex:john.doe@monsite.fr'
      )
      return
    } else {
      setEmailError('')
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*.?&]{9,}$/.test(
        password
      )
    ) {
      setPasswordError('Veuillez saisir un mot de passe valide')
      return
    } else {
      setPasswordError('')
    }
  }

  const togglePwdToText = () => {
    if (pwdToText === 'password') {
      setPwdToText('text')
    } else {
      setPwdToText('password')
    }
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen w-full items-center">
        <h2 className="text-3xl font-bold text-blue-500">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="h-max flex flex-col w-max justify-center items-center "
        >
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-blue-500 rounded-lg px-2"
            />
            <p>{emailError}</p>
          </div>
          <div className="flex flex-col">
            <label>Password:</label>
            <input
              type={pwdToText}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-blue-500 rounded-lg px-2"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2"
              onClick={togglePwdToText}
            >
              Eye
            </button>
          </div>
          <p>{passwordError}</p>
          <button
            className="border-2 border-blue-500 self-start rounded-lg mt-4 px-4 py-1"
            type="submit"
            onClick={onButtonClick}
          >
            Login
          </button>
          <div>
            <p>Don&apos;t have an account?</p> <Link to="/register">Sign Up</Link>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </Layout>
  )
}
