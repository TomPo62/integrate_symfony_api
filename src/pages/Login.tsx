import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './layout'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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
      // Sauvegarder le token dans le localStorage
      localStorage.setItem('authToken', response.data.token)

      if (response.data.token) {
        window.location.href = '/home'
      }
    } catch (error) {
      setError('Invalid email or password:')
      console.log('error:', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      window.location.href = '/home'
    }
  }, [])

  return (
    <Layout>
      <div className="flex flex-col min-h-screen w-full items-center ">
        <h2 className="text-3xl font-bold text-blue-500">Login</h2>
        <form onSubmit={handleSubmit} className="h-max flex flex-col w-max justify-center items-center ">
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-blue-500 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-blue-500 rounded-lg"
            />
          </div>
          <button
            className="border-2 border-blue-500 self-start rounded-lg mt-4 px-4 py-1"
            type="submit"
          >
            Login
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </Layout>
  )
}
