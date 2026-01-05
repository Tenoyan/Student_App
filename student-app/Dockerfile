FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    zip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        bcmath \
        xml \
        ctype \
        fileinfo

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy composer files first
COPY composer.json composer.lock ./

# Install PHP dependencies (skip scripts for now)
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy application source
COPY . .

# Create .env if missing
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache

# Run Laravel scripts now
RUN composer dump-autoload --optimize \
    && php artisan key:generate || true

EXPOSE 9000
CMD ["php-fpm"]
