const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Load JSON data
const data = require('./data.json');

// Middleware untuk menangani permintaan API
app.use(express.json());

// Endpoint API untuk mendapatkan data berdasarkan macam, bulan, dan tahun
app.get('/api', (req, res) => {
  const { macam, bulan, tahun } = req.query;

  if (!macam || !bulan || !tahun) {
    return res.status(400).json({ error: "Parameter 'macam', 'bulan', dan 'tahun' diperlukan." });
  }

  // Validasi macam yang dapat diterima
  const macam_options = [
    "Berdana Punia atau Bersedekah",
    "Berkunjung",
    "Berperang Membela Kebenaran",
    "Gotong Royong",
    "Kampanye",
    "Melakukan Pekerjaan yang Bersifat Gaib",
    "Melakukan Pekerjaan yang Menggunakan Api",
    "Melamar Kerja",
    "Melantik Pengurus/Pejabat",
    "Memasang Guna-guna",
    "Memasang Ranjau",
    "Memasang Sesirep atau Aji Sesirep",
    "Membakar Bata, Genteng, Gerabah, dan Sejenisnya",
    "Membentuk Perkumpulan atau Organisasi",
    "Memberi Petuah/Nasehat",
    "Membina Persahabatan",
    "Membuat Peraturan, Undang-undang",
    "Membuat Saluran Irigasi",
    "Membuat Segala Macam Larangan",
    "Membuat Sesuatu yang Menakutkan",
    "Membuat Tempat Berdagang",
    "Membuat Terowongan",
    "Membuat/Meramu Obat",
    "Memisah Bayi (Melas Rare)",
    "Memulai Membuka Sekolah atau Perguruan",
    "Memulai Suatu Kegiatan",
    "Mencari Nafkah",
    "Mencuri untuk Kepentingan Umum yang Baik",
    "Mengadakan Pertemuan atau Rapat",
    "Mengadakan Sabungan Ayam",
    "Mengangkat Sentana atau Anak Angkat",
    "Menghilangkan Penyakit Guna-guna",
    "Menyadap Niram (Ngirisin)",
    "Menyusun Rencana",
    "Mulai Bangkit Meraih Prestasi",
    "Mulai Belajar, Kursus, Pelatihan",
    "Mulai Berdagang",
    "Mulai Membangun Usaha",
    "Pindah Rumah",
    "Potong Rambut",
    "Tapa, Brata, Yoga, Semadi, Penyucian Diri"
  ];

  if (!macam_options.includes(macam)) {
    return res.status(400).json({ error: `'macam' yang valid harus salah satu dari: ${macam_options.join(', ')}` });
  }

  // Filter data sesuai dengan query parameter
  const filteredData = data.filter(item => 
    item.macam === macam &&
    item.bulan === parseInt(bulan) &&
    item.tahun === parseInt(tahun)
  );

  if (filteredData.length === 0) {
    return res.status(404).json({ error: 'Data tidak ditemukan.' });
  }

  res.json(filteredData);
});

// Start server
app.listen(port, () => {
  console.log(`Server berjalan`);
});
