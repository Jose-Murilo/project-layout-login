export const isAuthenticatedAuth = () => {
  if (typeof window !== 'undefined' && localStorage.getItem) {
    const storedValue = localStorage.getItem('isAuthenticated')
    if (storedValue !== null && storedValue !== undefined) {
      return storedValue === 'Authenticated'
    }
  }
  return false
}
