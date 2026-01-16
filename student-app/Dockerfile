# FROM php:8.2-fpm

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     git \
#     unzip \
#     curl \
#     zip \
#     libpng-dev \
#     libonig-dev \
#     libxml2-dev \
#     && docker-php-ext-install \
#         pdo \
#         pdo_mysql \
#         mbstring \
#         bcmath \
#         xml \
#         ctype \
#         fileinfo

# # Install Composer
# COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# WORKDIR /var/www

# # Copy composer files first
# COPY composer.json composer.lock ./

# # Install PHP dependencies (skip scripts for now)
# RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# # Copy application source
# COPY . .

# # Create .env if missing
# RUN if [ ! -f .env ]; then cp .env.example .env; fi

# # Set permissions
# RUN chown -R www-data:www-data /var/www \
#     && chmod -R 775 storage bootstrap/cache

# # Run Laravel scripts now
# RUN composer dump-autoload --optimize \
#     && php artisan key:generate || true

# EXPOSE 8000
# CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

# 
# 
# 
# 
# 


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
    libzip-dev \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        bcmath \
        xml \
        ctype \
        fileinfo \
        zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy composer files first for caching
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy application code
COPY . .

# Copy .env if missing
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache

# Generate key if missing
RUN php artisan key:generate || true

# Optional: cache config/routes/views for faster load
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 8000

# Dev-friendly CMD (change in production)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
