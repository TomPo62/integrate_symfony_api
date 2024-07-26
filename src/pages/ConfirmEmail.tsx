import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ConfirmEmail() {
  const { token } = useParams()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8000/api/confirm-email/${token}`
        )

        if (response.data) {
          setMessage('Email confirmed successfully! You can now log in.')
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      } catch (error) {
        setMessage(`Error: ${error}`)
      }
    }

    confirmEmail()
  }, [token, navigate])

  return <div>{message}</div>
}

export default ConfirmEmail
