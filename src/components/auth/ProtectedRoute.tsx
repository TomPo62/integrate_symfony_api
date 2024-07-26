import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const user = localStorage.getItem('user')

  const authTokenObj = JSON.parse(user || '{}')

  if (!user || authTokenObj?.token * 1000 < Date.now()) {
    localStorage.removeItem('user')
    return <Navigate to="/" />
  }
  return <Outlet />
}
