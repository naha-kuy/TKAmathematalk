CREATE TABLE IF NOT EXISTS kelas (
  id          SERIAL PRIMARY KEY,
  nama_kelas  VARCHAR(100) NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guru (
  id       SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

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
