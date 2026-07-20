const API_BASE = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan')
  return data
}

export const auth = {
  login: (username, password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  signup: (data) => request('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/api/auth/me'),
}

export const kelas = {
  list: () => request('/api/kelas'),
  create: (nama_kelas) => request('/api/kelas', { method: 'POST', body: JSON.stringify({ nama_kelas }) }),
  remove: (id) => request(`/api/kelas/${id}`, { method: 'DELETE' }),
}

export const bankSoal = {
  list: () => request('/api/bank-soal'),
  detail: (id) => request(`/api/bank-soal/${id}`),
  create: (data) => request('/api/bank-soal', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/bank-soal/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/api/bank-soal/${id}`, { method: 'DELETE' }),
}

export const siswa = {
  list: () => request('/api/siswa'),
  pending: () => request('/api/siswa/pending'),
  approve: (id) => request(`/api/siswa/approve/${id}`, { method: 'PUT' }),
  detail: (id) => request(`/api/siswa/${id}`),
  remove: (id) => request(`/api/siswa/${id}`, { method: 'DELETE' }),
}

export const submission = {
  submit: (bank_soal_id, jawaban) => request('/api/submit', { method: 'POST', body: JSON.stringify({ bank_soal_id, jawaban }) }),
  history: () => request('/api/submit/history'),
}

export const leaderboard = {
  get: (kelas_id) => request(`/api/leaderboard${kelas_id ? `?kelas_id=${kelas_id}` : ''}`),
}
