import sql from '../db.js'

export async function createSubmission(data) {
  const rows = await sql`
    INSERT INTO submission (siswa_id, bank_soal_id, jawaban, nilai)
    VALUES (${data.siswa_id}, ${data.bank_soal_id}, 
            ${JSON.stringify(data.jawaban)}, ${data.nilai})
    RETURNING id`
  return rows[0]
}

export async function getLastSubmission(siswaId, bankSoalId) {
  const rows = await sql`
    SELECT * FROM submission 
    WHERE siswa_id = ${siswaId} AND bank_soal_id = ${bankSoalId}
    ORDER BY created_at DESC LIMIT 1`
  return rows[0] || null
}

export async function getHistory(siswaId) {
  return sql`
    SELECT sub.*, bs.judul, bs.total_soal
    FROM submission sub
    JOIN bank_soal bs ON bs.id = sub.bank_soal_id
    WHERE sub.siswa_id = ${siswaId}
    ORDER BY sub.created_at DESC`
}

export async function getLastSubmissionsBySiswa(siswaId) {
  return sql`
    SELECT DISTINCT ON (bank_soal_id) *
    FROM submission
    WHERE siswa_id = ${siswaId}
    ORDER BY bank_soal_id, created_at DESC`
}

export async function getLeaderboard(kelasId = null) {
  if (kelasId) {
    return sql`
      WITH last_sub AS (
        SELECT DISTINCT ON (siswa_id, bank_soal_id) 
          siswa_id, nilai
        FROM submission
        ORDER BY siswa_id, bank_soal_id, created_at DESC
      )
      SELECT s.id, s.nama_panggilan, s.nama_lengkap, s.kelas_id,
             COALESCE(SUM(ls.nilai), 0) AS total_skor,
             COUNT(ls.bank_soal_id) AS total_soal
      FROM last_sub ls
      JOIN siswa s ON s.id = ls.siswa_id
      WHERE s.approved = TRUE AND s.kelas_id = ${kelasId}
      GROUP BY s.id, s.nama_panggilan, s.nama_lengkap, s.kelas_id
      ORDER BY total_skor DESC`
  }
  return sql`
    WITH last_sub AS (
      SELECT DISTINCT ON (siswa_id, bank_soal_id) 
        siswa_id, nilai
      FROM submission
      ORDER BY siswa_id, bank_soal_id, created_at DESC
    )
    SELECT s.id, s.nama_panggilan, s.nama_lengkap, s.kelas_id, k.nama_kelas,
           COALESCE(SUM(ls.nilai), 0) AS total_skor,
           COUNT(ls.bank_soal_id) AS total_soal
    FROM last_sub ls
    JOIN siswa s ON s.id = ls.siswa_id
    LEFT JOIN kelas k ON k.id = s.kelas_id
    WHERE s.approved = TRUE
    GROUP BY s.id, s.nama_panggilan, s.nama_lengkap, s.kelas_id, k.nama_kelas
    ORDER BY total_skor DESC`
}
