import sql from '../db.js'

export async function findAllBankSoal() {
  return sql`SELECT id, judul, deskripsi, file_pdf, total_soal, acak, created_at 
             FROM bank_soal ORDER BY created_at DESC`
}

export async function findBankSoalById(id) {
  const rows = await sql`SELECT * FROM bank_soal WHERE id = ${id} LIMIT 1`
  return rows[0] || null
}

export async function createBankSoal(data) {
  const rows = await sql`
    INSERT INTO bank_soal (judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak)
    VALUES (${data.judul}, ${data.deskripsi || null}, ${data.file_pdf}, 
            ${data.total_soal}, ${JSON.stringify(data.kunci_jawaban)}, ${data.acak || false})
    RETURNING id`
  return rows[0]
}

export async function updateBankSoal(id, data) {
  const rows = await sql`
    UPDATE bank_soal 
    SET judul = ${data.judul}, deskripsi = ${data.deskripsi || null}, 
        file_pdf = ${data.file_pdf}, total_soal = ${data.total_soal},
        kunci_jawaban = ${JSON.stringify(data.kunci_jawaban)}, 
        acak = ${data.acak || false}
    WHERE id = ${id}
    RETURNING id`
  return rows[0]
}

export async function deleteBankSoal(id) {
  await sql`DELETE FROM bank_soal WHERE id = ${id}`
}
