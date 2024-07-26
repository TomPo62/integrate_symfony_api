import React, { useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const LogoutButton: React.FC = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      if (user) {
        const resp = await axios.post(
          'https://localhost:8000/api/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        if (resp.status === 204) {
          setUser(null)
          navigate('/')
        }
      } else {
        console.log('No token found')
      }
    } catch (error) {
      console.error('Error logging out', error)
    }
  }

  return user ? (
    <div className='flex gap-2'>
      <button onClick={handleLogout}>Logout</button>{' '}
      <li>
        <a href="https://localhost:8000/admin" target="_blank">
          Admin
        </a>
      </li>
    </div>
  ) : (
    <Link to="/">Login</Link>
  )
}

export default LogoutButton
