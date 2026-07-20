import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PageLoader from './PageLoader'

export default function ProtectedRoute({ children, role }) {
  const { user, role: currentRole, loading } = useAuth()

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/login" replace />
  if (role && currentRole !== role) {
    return <Navigate to={`/${currentRole}/dashboard`} replace />
  }
  return children
}
