import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly nimInput: Locator;
  readonly passwordInput: Locator;
  readonly tampilkanPasswordCheckbox: Locator;
  readonly loginButton: Locator;
  readonly lupaPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Menggunakan Resilient / User-Facing Locators sesuai standar materi PMPL
    this.nimInput = page.getByPlaceholder(/NIM|Username/i).or(page.locator('#username, input[name="username"]')).first();
    this.passwordInput = page.getByPlaceholder(/Password/i).or(page.locator('#password, input[name="password"]')).first();
    this.tampilkanPasswordCheckbox = page.locator('input[type="checkbox"]').or(page.getByText('Tampilkan Password')).first();
    this.loginButton = page.getByRole('button', { name: /Login|Masuk/i }).or(page.locator('button[type="submit"], input[type="submit"]')).first();
    this.lupaPasswordLink = page.getByText(/Lupa Password\?/i).first();
  }

  async goto() {
    await this.page.goto('/');
    // Web-First Assertion: memastikan halaman login SIAKAD terbuka
    await expect(this.page).toHaveTitle(/SIAKAD/i);
  }

  async login(nim: string, pass: string) {
    await this.nimInput.fill(nim);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async ujiTampilkanPassword(contohPass: string) {
    await this.passwordInput.fill(contohPass);
    // Awalnya harus bertipe password (disembunyikan)
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    
    // Klik checkbox Tampilkan Password
    await this.tampilkanPasswordCheckbox.click();
    
    // Setelah diklik, tipe input berubah menjadi text (terlihat)
    await expect(this.passwordInput).toHaveAttribute('type', 'text');
  }
}