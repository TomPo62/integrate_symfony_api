import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LogoutButton: React.FC = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem('authToken')
      if (authToken) {
        const resp = await axios.post(
          'https://localhost:8000/api/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        if (resp.status === 204){
          localStorage.removeItem('authToken')
          navigate('/')
        }
      } else {
        console.log('No token found')
      }
    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton
