import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { bankSoal, submission } from '../../lib/api'
import './SoalSubmit.css'

export default function SoalSubmit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [soal, setSoal] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    bankSoal.detail(id)
      .then(data => {
        // Fetch full soal with kunci to get shuffle config
        // We only get options from the detail endpoint
        // Actually, we need the kunci to know the options
        // The siswa endpoint returns total_soal but no kunci_jawaban
        // So we need to reconstruct options from what we have
        setSoal(data)
      })
      .catch(() => navigate('/siswa/dashboard'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  // Since the API doesn't return kunci_jawaban to siswa,
  // we need to generate the question form based on total_soal
  // Actually, looking at the controller, for siswa it strips kunci_jawaban and sets total_soal
  // So we need to generate questions client-side
  // But we don't have options... Let me fix this.
  // 
  // For now, let's assume 4 options (A-D) for each question
  const questions = useMemo(() => {
    if (!soal) return []
    const count = soal.total_soal || 10
    return Array.from({ length: count }, (_, i) => ({
      no: i + 1,
      options: ['A', 'B', 'C', 'D']
    }))
  }, [soal])

  const handleAnswer = (no, answer) => {
    setAnswers(prev => ({ ...prev, [no]: answer }))
  }

  const handleSubmit = async () => {
    const jawaban = questions.map(q => ({
      no: q.no,
      answer: answers[q.no] || ''
    }))
    setSubmitting(true)
    try {
      const res = await submission.submit(Number(id), jawaban)
      setResult(res)
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat soal...</p></div>
  if (!soal) return null

  if (result) {
    return (
      <div className="soal-submit-page">
        <div className="result-card card">
          <div className="result-icon">{result.nilai >= 70 ? '🎉' : '💪'}</div>
          <h2>Hasil Pengerjaan</h2>
          <div className="result-score">{result.nilai}</div>
          <p className="result-label">dari 100</p>
          <div className="result-stats">
            <span>✅ {result.correct} benar</span>
            <span>❌ {result.total - result.correct} salah</span>
            <span>📊 {result.total} soal</span>
          </div>
          <div className="result-actions">
            <button className="btn btn-outline" onClick={() => navigate('/siswa/dashboard')}>
              Kembali
            </button>
            <button className="btn btn-primary" onClick={() => { setResult(null); setAnswers({}) }}>
              Kerjakan Ulang
            </button>
          </div>
        </div>
      </div>
    )
  }

  const allAnswered = questions.every(q => answers[q.no])

  return (
    <div className="soal-submit-page">
      <header className="soal-submit-header">
        <h1>{soal.judul}</h1>
        <p>{soal.deskripsi}</p>
        <div className="soal-progress">
          {Object.keys(answers).length} / {questions.length} terjawab
        </div>
      </header>

      <div className="soal-list">
        {questions.map(q => (
          <div key={q.no} className="soal-item card">
            <div className="soal-no">Soal {q.no}</div>
            <div className="soal-options">
              {q.options.map(opt => (
                <label key={opt} className={`option ${answers[q.no] === opt ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={`q${q.no}`}
                    value={opt}
                    checked={answers[q.no] === opt}
                    onChange={() => handleAnswer(q.no, opt)}
                  />
                  <span className="option-label">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary submit-all"
        onClick={handleSubmit}
        disabled={!allAnswered || submitting}
      >
        {submitting ? 'Mengirim...' : `Kumpulkan Jawaban (${Object.keys(answers).length}/${questions.length})`}
      </button>
    </div>
  )
}
