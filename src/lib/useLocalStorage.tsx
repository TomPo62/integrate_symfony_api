export const isLogged = () => {
  const authToken = localStorage.getItem('user')
  if (authToken) {
    return true
  } else {
    return false
  }
}
