FROM php:8.2-apache

RUN ls -l /etc/apache2/mods-enabled/mpm_*

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

RUN for file in /etc/apache2/mods-enabled/mpm_*.load; do \
        [ -e "$file" ] && a2dismod "$(basename "$file" .load)"; \
    done; \
    a2enmod mpm_prefork rewrite

RUN apache2ctl -M

COPY . /var/www/html/

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

EXPOSE 80