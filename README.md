# Mini Kanban Task Tracker

A simple Kanban task management app built with Laravel 10, Inertia.js and React.

---

## Features

- Task creation, update and status management
- Report generation for projects 
- Kanban board UI with React + Inertia
- Dashboard and Reports pages
- Background job processing with Laravel queues

---

## Included

- Laravel migrations & models
- Services: `TaskService`, `ReportService`
- Controllers and routes
- Job: `GenerateReportJob`
- Scheduler entry for report generation
- React + Inertia pages (Kanban board, dashboard, reports)
- `.env.example` for environment setup


---

## Requirements

- PHP >= 8.1
- Composer
- Node.js & npm
- Database (MySQL, SQLite, etc.)
- Laravel 10 dependencies

---

## Installation & Setup

1. **Clone the repo**

```bash
git clone https://github.com/fermac1/mini-kanban.git
cd mini-kanban

```
2. **Install Dependencies**

```bash
composer install
npm install
```
3. **Environment Configuration**

```bash
cp .env.example .env
php artisan key:generate
```

4. **Database Setup**

```bash
php artisan migrate
php artisan db:seed

```
5. **Queue Setup**

```bash
php artisan queue:table
php artisan migrate
php artisan queue:work

```
6. **Cron setup**
*Open crontab*
```bash
crontab -e
```
*copy this into the file*
```bash
* * * * * cd /full/path/to/mini-kanban && php artisan schedule:run >> /dev/null 2>&1

```

7. **Test**

```bash

php artisan test
```
8. **Run Frontend**

```bash
npm run dev
```

9. **Run server**

```bash
php artisan serve
```
