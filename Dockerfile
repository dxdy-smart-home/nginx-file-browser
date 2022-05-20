FROM nginx:alpine

RUN mkdir -p /etc/nginx/includes/

ADD default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /opt/www/file-browser/
COPY dist /opt/www/file-browser

VOLUME /opt/www/files/
EXPOSE 80
