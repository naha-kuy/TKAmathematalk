import sql from '../db.js'

export async function findAllKelas() {
  return sql`SELECT * FROM kelas ORDER BY nama_kelas ASC`
}

export async function createKelas(namaKelas) {
  const rows = await sql`
    INSERT INTO kelas (nama_kelas) VALUES (${namaKelas}) RETURNING *`
  return rows[0]
}

export async function deleteKelas(id) {
  await sql`DELETE FROM kelas WHERE id = ${id}`
}
