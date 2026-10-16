
FROM php:8.2-apache

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

COPY . /var/www/html/

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

RUN printf '%s\n' \
    '#!/bin/sh' \
    'set -e' \
    'rm -f /etc/apache2/mods-enabled/mpm_*.load /etc/apache2/mods-enabled/mpm_*.conf' \
    'a2enmod mpm_prefork rewrite' \
    'echo "=== Enabled MPM modules ==="' \
    'find /etc/apache2/mods-enabled -maxdepth 1 -name "mpm_*.load" -exec ls -l {} \;' \
    'apache2ctl -t' \
    'exec apache2-foreground' \
    > /usr/local/bin/railway-start.sh \
    && chmod +x /usr/local/bin/railway-start.sh

EXPOSE 80

CMD ["/usr/local/bin/railway-start.sh"]
