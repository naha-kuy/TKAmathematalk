import { Navigate, useRoutes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import GuruLayout from './components/GuruLayout'
import SiswaLayout from './components/SiswaLayout'
import PageLoader from './components/PageLoader'
import { lazy } from 'react'

const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const WaitingApproval = lazy(() => import('./pages/WaitingApproval'))
const Test = lazy(() => import('./pages/Test'))

const GuruDashboard = lazy(() => import('./pages/guru/Dashboard'))
const KelolaKelas = lazy(() => import('./pages/guru/KelolaKelas'))
const BankSoalList = lazy(() => import('./pages/guru/BankSoalList'))
const BankSoalEdit = lazy(() => import('./pages/guru/BankSoalEdit'))
const GuruSiswaList = lazy(() => import('./pages/guru/SiswaList'))
const GuruLeaderboard = lazy(() => import('./pages/guru/Leaderboard'))

const SiswaDashboard = lazy(() => import('./pages/siswa/Dashboard'))
const SoalSubmit = lazy(() => import('./pages/siswa/SoalSubmit'))
const History = lazy(() => import('./pages/siswa/History'))
const SiswaLeaderboard = lazy(() => import('./pages/siswa/Leaderboard'))

function Routes() {
  return useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/waiting-approval', element: <WaitingApproval /> },
    { path: '/test', element: <Test /> },
    {
      path: '/guru',
      element: <ProtectedRoute role="guru"><GuruLayout /></ProtectedRoute>,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <GuruDashboard /> },
        { path: 'kelas', element: <KelolaKelas /> },
        { path: 'bank-soal', element: <BankSoalList /> },
        { path: 'bank-soal/:id', element: <BankSoalEdit /> },
        { path: 'siswa', element: <GuruSiswaList /> },
        { path: 'leaderboard', element: <GuruLeaderboard /> },
      ]
    },
    {
      path: '/siswa',
      element: <ProtectedRoute role="siswa"><SiswaLayout /></ProtectedRoute>,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <SiswaDashboard /> },
        { path: 'soal/:id', element: <SoalSubmit /> },
        { path: 'history', element: <History /> },
        { path: 'leaderboard', element: <SiswaLeaderboard /> },
      ]
    },
    { path: '*', element: <Navigate to="/login" replace /> },
  ])
}

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
