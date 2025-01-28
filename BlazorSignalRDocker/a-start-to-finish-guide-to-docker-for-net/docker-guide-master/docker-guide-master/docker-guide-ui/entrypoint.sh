#!/bin/sh

echo "window.APP_CONFIG = {baseUrl: '${API_URL}'};" > /usr/share/nginx/html/appConfig.js
nginx -g 'daemon off;'
