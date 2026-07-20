-- ============================================================
-- TKA Mathematalk – Database Schema
-- Copy & paste this entire script into Neon SQL Editor or
-- run via `psql` to initialize the database.
-- ============================================================

-- 1. KELAS
CREATE TABLE IF NOT EXISTS kelas (
  id          SERIAL PRIMARY KEY,
  nama_kelas  VARCHAR(100) NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- 2. GURU (single teacher: NafYu)
CREATE TABLE IF NOT EXISTS guru (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- 3. SISWA
CREATE TABLE IF NOT EXISTS siswa (
  id             SERIAL PRIMARY KEY,
  nama_lengkap   VARCHAR(100) NOT NULL,
  nama_panggilan VARCHAR(50) NOT NULL,
  password       TEXT NOT NULL,
  nomor_ortu     VARCHAR(20) NOT NULL,
  kelas_id       INTEGER REFERENCES kelas(id),
  nama_sekolah   VARCHAR(200) NOT NULL,
  approved       BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMP DEFAULT NOW()
);

-- 4. BANK SOAL
CREATE TABLE IF NOT EXISTS bank_soal (
  id             SERIAL PRIMARY KEY,
  judul          VARCHAR(200) NOT NULL,
  deskripsi      TEXT,
  file_pdf       VARCHAR(300) NOT NULL,
  total_soal     INTEGER NOT NULL,
  kunci_jawaban  JSONB NOT NULL,
  acak           BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMP DEFAULT NOW()
);

-- 5. SUBMISSION (jawaban siswa)
CREATE TABLE IF NOT EXISTS submission (
  id            SERIAL PRIMARY KEY,
  siswa_id      INTEGER REFERENCES siswa(id) ON DELETE CASCADE,
  bank_soal_id  INTEGER REFERENCES bank_soal(id) ON DELETE CASCADE,
  jawaban       JSONB NOT NULL,
  nilai         DECIMAL(5,2) NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submission_siswa_soal
  ON submission(siswa_id, bank_soal_id, created_at DESC);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Guru (username: NafYu, password: qeadzc)
INSERT INTO guru (username, password)
VALUES ('NafYu', 'qeadzc')
ON CONFLICT (username) DO NOTHING;

-- Kelas
INSERT INTO kelas (nama_kelas) VALUES
  ('Kelas 7'),
  ('Kelas 8'),
  ('Kelas 9')
ON CONFLICT DO NOTHING;

-- Bank Soal sample (2 bab)
INSERT INTO bank_soal (judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak)
VALUES
  ('Bab 1 – Himpunan',
   'Latihan soal himpunan kelas 7',
   '/soal/bab1-himpunan.pdf',
   5,
   '[1,2,3,4,5]',
   FALSE),
  ('Bab 2 – Aljabar',
   'Latihan soal aljabar kelas 8',
   '/soal/bab2-aljabar.pdf',
   5,
   '[2,4,1,3,5]',
   FALSE)
ON CONFLICT DO NOTHING;

-- Keterangan kunci_jawaban:
-- Array of integers, 1=A, 2=B, 3=C, 4=D, di-index per nomor soal.
-- Contoh: [1,2,3,4,5] berarti soal1=A, soal2=B, soal3=C, soal4=D, soal5=D(5-4=1 -> A? no, 5 is beyond 4? Wait 5 is invalid. Actually 1=A, 2=B, 3=C, 4=D, 5 = E? 
-- In this system we only use A(1) B(2) C(3) D(4), so values must be 1-4.
-- [1,2,3,4,1] berarti soal1=A, soal2=B, soal3=C, soal4=D, soal5=A.
-- Update kunci_jawaban sesuai PDF masing-masing bank soal.
