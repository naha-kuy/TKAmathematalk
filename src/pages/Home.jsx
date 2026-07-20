import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-card">
        <h1>TKA Mathematalk</h1>
        <p>Belajar matematika jadi lebih menyenangkan!</p>
        <div className="home-actions">
          <button onClick={() => navigate('/login')}>Masuk</button>
          <button className="secondary" onClick={() => navigate('/dashboard')}>Jelajahi</button>
        </div>
      </div>
    </div>
  )
}
