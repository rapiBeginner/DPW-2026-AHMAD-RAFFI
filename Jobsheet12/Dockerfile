FROM php:8.2-apache

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite

COPY . /var/www/html/

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && apache2ctl -t

RUN echo '#!/bin/sh' > /usr/local/bin/start-apache.sh \
    && echo 'echo "=== APACHE STARTUP CONFIGURATION ==="' >> /usr/local/bin/start-apache.sh \
    && echo 'ls -la /etc/apache2/mods-enabled/mpm_*.load' >> /usr/local/bin/start-apache.sh \
    && echo 'grep -R "^[[:space:]]*LoadModule mpm_" /etc/apache2/' >> /usr/local/bin/start-apache.sh \
    && echo 'exec apache2-foreground' >> /usr/local/bin/start-apache.sh \
    && chmod +x /usr/local/bin/start-apache.sh

EXPOSE 80

CMD ["/usr/local/bin/start-apache.sh"]
