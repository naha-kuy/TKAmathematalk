import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { auth as authApi } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }
    try {
      const data = await authApi.me()
      setUser(data.user)
      setRole(data.role)
    } catch {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { checkAuth() }, [checkAuth])

  const login = async (username, password) => {
    const data = await authApi.login(username, password)
    localStorage.setItem('token', data.token)
    setUser(data.user)
    setRole(data.role)
    return data
  }

  const signup = async (data) => {
    return authApi.signup(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
