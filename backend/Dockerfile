FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql zip mbstring

RUN a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . /var/www/html

RUN composer install

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

EXPOSE 80
