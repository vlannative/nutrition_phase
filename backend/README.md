# Shemomo shop backend

This is the Laravel product catalog and private product admin. It uses SQLite by default for local development. Product photos are checked as image files (JPG, PNG or WebP, at most 2 MB) and saved to Laravel's public storage disk.

## Requirements

- PHP 8.3 or newer, with the SQLite, Fileinfo, Mbstring, OpenSSL, PDO, Tokenizer, XML and Ctype extensions
- Composer 2

## First run

From this `backend` directory:

```sh
cp .env.example .env
composer install
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan storage:link
php artisan shop:admin
php artisan serve
```

Open `http://127.0.0.1:8000/admin/login` and sign in with the administrator email and password created by `shop:admin`. The command prompts for the password without echoing it. There is no public registration route.

The product manager at `/admin/products` supports adding, editing, hiding, and removing products, with a simple In stock / Out of stock selector. The public JSON feed is `/api/products`. The initial shop prices and availability statuses are placeholders. To add the eight sample products to a fresh database, run `php artisan db:seed --class='Database\Seeders\ShopProductSeeder'`; then use the admin to replace prices, availability, descriptions, and photos with confirmed details.

The same admin includes `/admin/articles` for creating and editing recipes and blog articles. Posts can be saved as drafts or published. Recipes also support prep time, servings, ingredients and method steps. Content is stored as plain text and escaped when displayed. Published posts appear on the site's `learn.html` page through `/api/articles`, and each post has a public detail page at `/articles/{slug}`.

## Before deployment

- Set `APP_ENV=production`, `APP_DEBUG=false`, a real HTTPS `APP_URL`, and `SESSION_SECURE_COOKIE=true` in the deployment environment.
- Keep `.env`, `storage`, and the database outside the web document root. Point the web server document root at this app's `public` directory; never point it at the repository root or `backend` directory.
- Set `CORS_ALLOWED_ORIGINS` to the exact trusted origins (comma-separated if there is more than one), including scheme and port where needed. The default is `APP_URL`; do not use `*`. The site and API are intended to share one origin.
- Apache deployments use `public/.htaccess` to disable directory indexes, route requests through Laravel, and deny dotfiles and common backup/database files. For Nginx or another server, configure equivalent protections and verify directory listing is off; `.htaccess` is Apache-only.
- Keep `.git`, editor metadata, database dumps, logs, and backup files out of the deployed document root. The repository's `.git` directory belongs outside `backend/public`.
- Back up the SQLite database and uploaded product photos, or configure managed database and object storage for production.
- Restrict administrator access to the owner, keep PHP and dependencies updated, and use a unique password manager generated admin password. Admin routes require both an authenticated session and the `is_admin` flag; there is no public registration route.
- For local development, the site HTML, CSS and JavaScript files are linked into `backend/public`. Run `php artisan serve` from `backend`; `http://127.0.0.1:8000/` opens the homepage, `/shop.html` and `/learn.html` use the same-origin API, and `/admin/login` opens the admin. For production, point the web server document root at Laravel's `public` directory and ensure the site files are deployed there so the frontend and API share one origin.

This is a starter catalog and content admin backend. It does not yet handle customer accounts, order records, payments, stock reservations, or delivery pricing.
