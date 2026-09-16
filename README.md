# Laravel App: GitHub Setup

This guide explains how to push this Laravel and React application to GitHub from Windows.

## 1. Check the required tools

Open PowerShell in this project folder and check that Git, PHP, Composer, Node.js, and npm are installed:

```powershell
git --version
php --version
composer --version
node --version
npm --version
```

If a command is not recognized, install the missing tool before continuing.

## 2. Create an empty GitHub repository

1. Sign in to [GitHub](https://github.com/).
2. Select **New repository**.
3. Enter a repository name, such as `my-first-app`.
4. Choose **Public** or **Private**.
5. Leave **Add a README file**, `.gitignore`, and license unchecked. This project already has its own `.gitignore`.
6. Select **Create repository**.
7. Copy the repository URL. It will look like one of these:

```text
https://github.com/YOUR-USERNAME/my-first-app.git
git@github.com:YOUR-USERNAME/my-first-app.git
```

## 3. Initialize Git in the project

In PowerShell, move to the project folder:

```powershell
Set-Location "C:\xampp\htdocs\CCS112LABEXAM\my-first-app"
```

Initialize Git and create the first commit:

```powershell
git init
git branch -M main
git add .
git status
git commit -m "Initial commit"
```

Before committing, confirm that `.env`, `vendor`, `node_modules`, and `public/build` are not listed as files to be committed. Never push passwords, API keys, or other secrets.

## 4. Connect the project to GitHub

Replace the URL below with the URL copied from your GitHub repository:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/my-first-app.git
git remote -v
```

## 5. Push the project

```powershell
git push -u origin main
```

If GitHub asks for authentication, use GitHub Desktop, Git Credential Manager, or a personal access token. Your GitHub password cannot be used as an HTTPS Git password.

Refresh the GitHub repository page to confirm that the files are visible.

## 6. Install the project after cloning

The `vendor` and `node_modules` folders are intentionally excluded from GitHub. Anyone cloning the project must install them locally:

```powershell
git clone https://github.com/YOUR-USERNAME/my-first-app.git
Set-Location my-first-app
composer install
Copy-Item .env.example .env
php artisan key:generate
npm install
npm run build
```

Configure the database values in `.env`, then run migrations if needed:

```powershell
php artisan migrate
```

For local development, start the Laravel and Vite processes with:

```powershell
composer run dev
```

## 7. Push future changes

After editing the application:

```powershell
git status
git add .
git commit -m "Describe the change"
git push
```

Keep `composer.lock` and `package-lock.json` committed so other developers install the same dependency versions.

## XAMPP and phpMyAdmin database

This project is configured to use the XAMPP MariaDB database named `computer_cafe`.

1. Open the **XAMPP Control Panel**.
2. Start **Apache** and **MySQL**.
3. Open [phpMyAdmin](http://localhost/phpmyadmin).
4. Select the `computer_cafe` database to view the `stations`, `users`, `sessions`, and other Laravel tables.

The local `.env` uses the default XAMPP connection:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=computer_cafe
DB_USERNAME=root
DB_PASSWORD=
```

If your MySQL root account has a password, update `DB_PASSWORD` in `.env`, then run:

```powershell
php artisan config:clear
php artisan migrate
```