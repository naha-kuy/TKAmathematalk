import sql from './db.js'
import fs from 'fs'

const schema = fs.readFileSync('./api/schema.sql', 'utf8')

async function seed() {
  console.log('Menjalankan schema...')
  await sql.unsafe(schema)
  console.log('Schema selesai.')

  const guruExists = await sql`SELECT id FROM guru WHERE username = 'NafYu' LIMIT 1`
  if (!guruExists.length) {
    await sql`INSERT INTO guru (username, password) VALUES ('NafYu', 'qeadzc')`
    console.log('Guru NafYu dibuat.')
  }

  const kelas = await sql`SELECT id FROM kelas LIMIT 1`
  if (!kelas.length) {
    await sql`INSERT INTO kelas (nama_kelas) VALUES ('TKA A'), ('TKA B'), ('TKA C')`
    console.log('Kelas dibuat.')
  }

  const soalExists = await sql`SELECT id FROM bank_soal LIMIT 1`
  if (!soalExists.length) {
    const soal1 = {
      judul: 'Bab 1: Himpunan',
      deskripsi: 'Soal latihan himpunan kelas 7',
      file_pdf: '/soal/bab1-himpunan.pdf',
      total_soal: 10,
      kunci_jawaban: {
        questions: [
          { no: 1, answer: 'A', options: ['A', 'B', 'C', 'D'] },
          { no: 2, answer: 'C', options: ['A', 'B', 'C', 'D'] },
          { no: 3, answer: 'B', options: ['A', 'B', 'C', 'D'] },
          { no: 4, answer: 'D', options: ['A', 'B', 'C', 'D'] },
          { no: 5, answer: 'A', options: ['A', 'B', 'C', 'D'] },
          { no: 6, answer: 'C', options: ['A', 'B', 'C', 'D'] },
          { no: 7, answer: 'B', options: ['A', 'B', 'C', 'D'] },
          { no: 8, answer: 'A', options: ['A', 'B', 'C', 'D'] },
          { no: 9, answer: 'D', options: ['A', 'B', 'C', 'D'] },
          { no: 10, answer: 'C', options: ['A', 'B', 'C', 'D'] }
        ]
      },
      acak: false
    }

    const soal2 = {
      judul: 'Bab 2: Aljabar',
      deskripsi: 'Soal latihan aljabar kelas 7',
      file_pdf: '/soal/bab2-aljabar.pdf',
      total_soal: 10,
      kunci_jawaban: {
        questions: [
          { no: 1, answer: 'B', options: ['A', 'B', 'C', 'D'] },
          { no: 2, answer: 'D', options: ['A', 'B', 'C', 'D'] },
          { no: 3, answer: 'A', options: ['A', 'B', 'C', 'D'] },
          { no: 4, answer: 'C', options: ['A', 'B', 'C', 'D'] },
          { no: 5, answer: 'B', options: ['A', 'B', 'C', 'D'] },
          { no: 6, answer: 'A', options: ['A', 'B', 'C', 'D'] },
          { no: 7, answer: 'D', options: ['A', 'B', 'C', 'D'] },
          { no: 8, answer: 'C', options: ['A', 'B', 'C', 'D'] },
          { no: 9, answer: 'A', options: ['A', 'B', 'C', 'D'] },
          { no: 10, answer: 'B', options: ['A', 'B', 'C', 'D'] }
        ]
      },
      acak: true
    }

    await sql`
      INSERT INTO bank_soal (judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak)
      VALUES (${soal1.judul}, ${soal1.deskripsi}, ${soal1.file_pdf}, ${soal1.total_soal}, 
              ${JSON.stringify(soal1.kunci_jawaban)}, ${soal1.acak})`
    await sql`
      INSERT INTO bank_soal (judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak)
      VALUES (${soal2.judul}, ${soal2.deskripsi}, ${soal2.file_pdf}, ${soal2.total_soal}, 
              ${JSON.stringify(soal2.kunci_jawaban)}, ${soal2.acak})`
    console.log('Bank soal dibuat.')
  }

  console.log('✅ Seed selesai!')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed error:', err)
  process.exit(1)
})
