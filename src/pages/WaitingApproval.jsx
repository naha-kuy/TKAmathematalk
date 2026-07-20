import { useNavigate } from 'react-router-dom'
import './WaitingApproval.css'

export default function WaitingApproval() {
  const navigate = useNavigate()

  return (
    <div className="waiting-page">
      <div className="waiting-card">
        <div className="waiting-icon">⏳</div>
        <h2>Menunggu Persetujuan</h2>
        <p>
          Akun kamu sedang menunggu persetujuan dari guru.
          Silakan hubungi guru melalui WhatsApp untuk mempercepat proses.
        </p>
        <a
          href="https://wa.me/6282334157792"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Chat WA ke 082334157792
        </a>
        <button className="btn btn-outline" onClick={() => navigate('/login')}>
          Kembali ke Login
        </button>
      </div>
    </div>
  )
}
