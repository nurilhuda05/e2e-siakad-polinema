import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Pengujian E2E Fitur Login SIAKAD Polinema', () => {

  test('1. Skenario Negatif: Gagal login ketika menggunakan NIM dan Password yang salah', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // 1. Buka halaman login SIAKAD
    await loginPage.goto();

    // 2. Masukkan NIM & Password yang salah
    await loginPage.login('000000000000', 'PasswordNgawur123');

    // 3. Web-First Assertion: Pastikan pengguna tetap tertahan di halaman Login
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('2. Skenario UI: Fitur Tampilkan Password berfungsi mengubah visibilitas input', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Uji interaksi ketik password dan klik Tampilkan Password
    await loginPage.ujiTampilkanPassword('TesPassword123');
  });

  test('3. Skenario Positif: Berhasil login menggunakan NIM dan Password Mahasiswa yang valid', async ({ page }) => {
    const nim = process.env.SIAKAD_NIM;
    const password = process.env.SIAKAD_PASSWORD;

    // Pastikan NIM & Password sudah diisi di file .env
    test.skip(!nim || !password || password === 'PasswordSiakadAnda', 'Kredensial asli belum diatur di file .env');

    const loginPage = new LoginPage(page);

    // 1. Buka halaman login SIAKAD
    await loginPage.goto();

    // 2. Login menggunakan kredensial dari .env
    await loginPage.login(nim!, password!);

    // 3. Web-First Assertion: Pastikan setelah login berhasil, teks NIM mahasiswa tampil di halaman beranda
    await expect(page.getByText(new RegExp(nim!, 'i')).first()).toBeVisible({ timeout: 15000 });
  });

});