import sql from '../db.js'

export async function findGuruByUsername(username) {
  const rows = await sql`SELECT * FROM guru WHERE username = ${username} LIMIT 1`
  return rows[0] || null
}

export async function findSiswaById(id) {
  const rows = await sql`
    SELECT s.*, k.nama_kelas 
    FROM siswa s 
    LEFT JOIN kelas k ON k.id = s.kelas_id 
    WHERE s.id = ${id} 
    LIMIT 1`
  return rows[0] || null
}

export async function findSiswaByNama(nama) {
  const rows = await sql`
    SELECT * FROM siswa WHERE nama_panggilan = ${nama} OR nama_lengkap = ${nama} LIMIT 1`
  return rows[0] || null
}

export async function createSiswa(data) {
  const rows = await sql`
    INSERT INTO siswa (nama_lengkap, nama_panggilan, password, nomor_ortu, kelas_id, nama_sekolah)
    VALUES (${data.nama_lengkap}, ${data.nama_panggilan}, ${data.password}, 
            ${data.nomor_ortu}, ${data.kelas_id}, ${data.nama_sekolah})
    RETURNING id`
  return rows[0]
}

export async function findAllSiswa() {
  return sql`
    SELECT s.*, k.nama_kelas 
    FROM siswa s 
    LEFT JOIN kelas k ON k.id = s.kelas_id 
    ORDER BY s.created_at DESC`
}

export async function findPendingSiswa() {
  return sql`
    SELECT s.*, k.nama_kelas 
    FROM siswa s 
    LEFT JOIN kelas k ON k.id = s.kelas_id 
    WHERE s.approved = FALSE 
    ORDER BY s.created_at DESC`
}

export async function approveSiswa(id) {
  await sql`UPDATE siswa SET approved = TRUE WHERE id = ${id}`
}

export async function deleteSiswa(id) {
  await sql`DELETE FROM siswa WHERE id = ${id}`
}
