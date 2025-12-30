FROM php:8.2-fpm

# Install system dependencies for Laravel
RUN apt-get update && apt-get install -y \
    zip unzip curl git libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql

WORKDIR /var/www

# Copy composer & install dependencies
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Copy Laravel code
COPY . .

# Expose port for PHP-FPM
EXPOSE 8000
CMD ["php-fpm"]
