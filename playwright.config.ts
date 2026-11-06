import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Membaca file .env agar process.env.SIAKAD_NIM & PASSWORD bisa digunakan
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Jalankan tes secara paralel */
  fullyParallel: true,
  /* Gagal jika ada test.only yang tidak sengaja tertinggal saat di CI */
  forbidOnly: !!process.env.CI,
  /* Coba ulang (retry) otomatis jika gagal di GitHub Actions */
  retries: process.env.CI ? 2 : 0,
  /* Jumlah worker paralel */
  workers: process.env.CI ? 1 : undefined,
  /* Menghasilkan laporan dalam bentuk HTML Report */
  reporter: 'html',

  use: {
    /* URL dasar SIAKAD Polinema */
    baseURL: process.env.SIAKAD_URL || 'https://siakad.polinema.ac.id',

    /* Observability: Rekam Trace Viewer, Screenshot, & Video saat tes gagal */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Kita gunakan Chromium (Chrome) agar eksekusi cepat dan fokus */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});