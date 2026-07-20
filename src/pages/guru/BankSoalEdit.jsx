import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { bankSoal } from '../../lib/api'
import './BankSoalEdit.css'

export default function BankSoalEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    judul: '', deskripsi: '', file_pdf: '', total_soal: 10, acak: false,
    kunci_jawaban: { questions: [] }
  })

  useEffect(() => {
    if (!isNew) {
      bankSoal.detail(id)
        .then(data => {
          const kunci = typeof data.kunci_jawaban === 'string' ? JSON.parse(data.kunci_jawaban) : data.kunci_jawaban
          setForm({
            judul: data.judul,
            deskripsi: data.deskripsi || '',
            file_pdf: data.file_pdf,
            total_soal: data.total_soal,
            acak: data.acak,
            kunci_jawaban: kunci
          })
        })
        .catch(() => navigate('/guru/bank-soal'))
        .finally(() => setLoading(false))
    }
  }, [id, isNew, navigate])

  const updateQuestion = (no, field, value) => {
    const qs = [...form.kunci_jawaban.questions]
    const idx = qs.findIndex(q => q.no === no)
    if (idx >= 0) {
      qs[idx] = { ...qs[idx], [field]: value }
    }
    setForm({ ...form, kunci_jawaban: { questions: qs } })
  }

  const generateQuestions = () => {
    const questions = Array.from({ length: form.total_soal }, (_, i) => {
      const existing = form.kunci_jawaban.questions.find(q => q.no === i + 1)
      return existing || { no: i + 1, answer: 'A', options: ['A', 'B', 'C', 'D'] }
    })
    setForm({ ...form, kunci_jawaban: { questions } })
  }

  useEffect(() => {
    if (form.kunci_jawaban.questions.length !== form.total_soal) {
      generateQuestions()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.total_soal])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        judul: form.judul,
        deskripsi: form.deskripsi,
        file_pdf: form.file_pdf,
        total_soal: Number(form.total_soal),
        kunci_jawaban: form.kunci_jawaban,
        acak: form.acak
      }
      if (isNew) {
        await bankSoal.create(payload)
      } else {
        await bankSoal.update(id, payload)
      }
      navigate('/guru/bank-soal')
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="bank-soal-edit">
      <header className="dashboard-header">
        <h1>{isNew ? 'Bank Soal Baru' : 'Edit Bank Soal'}</h1>
        <p>Atur kunci jawaban untuk setiap soal.</p>
      </header>

      <form onSubmit={handleSave}>
        <div className="edit-grid">
          <div className="card edit-info">
            <div className="form-group">
              <label>Judul Bank Soal</label>
              <input value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} placeholder="Bab 1: Himpunan" required />
            </div>
            <div className="form-group">
              <label>Deskripsi (opsional)</label>
              <input value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} placeholder="Soal latihan..." />
            </div>
            <div className="form-group">
              <label>Link File PDF</label>
              <input value={form.file_pdf} onChange={e => setForm({ ...form, file_pdf: e.target.value })} placeholder="/soal/bab1-himpunan.pdf" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Jumlah Soal</label>
                <input type="number" min="1" max="100" value={form.total_soal} onChange={e => setForm({ ...form, total_soal: Number(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Acak Opsi?</label>
                <select value={form.acak ? 'true' : 'false'} onChange={e => setForm({ ...form, acak: e.target.value === 'true' })}>
                  <option value="false">Tidak</option>
                  <option value="true">Ya</option>
                </select>
              </div>
            </div>
          </div>

          <div className="edit-questions">
            <h3>Kunci Jawaban</h3>
            {form.kunci_jawaban.questions.map(q => (
              <div key={q.no} className="question-row card">
                <div className="q-no">Soal {q.no}</div>
                <div className="q-options">
                  {['A', 'B', 'C', 'D'].map(opt => (
                    <label key={opt} className={`q-option ${q.answer === opt ? 'selected' : ''}`}>
                      <input type="radio" name={`kunci-${q.no}`} value={opt}
                        checked={q.answer === opt}
                        onChange={() => updateQuestion(q.no, 'answer', opt)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="edit-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/guru/bank-soal')}>Batal</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Menyimpan...' : (isNew ? 'Buat Bank Soal' : 'Simpan Perubahan')}
          </button>
        </div>
      </form>
    </div>
  )
}
