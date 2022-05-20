Nginx file browser
=====================

### How to use?

```
docker run -p 80:80 -v /your/path/to/files:/opt/www/files/  mrdxdy/nginx-file-browser:latest
```

### How add mixins to nginx config?

```
mkdir -p ~/includes
nano ~/includes/auth.conf

docker run -p 80:80 -v /your/path/to/files:/opt/www/files/ -v ~/includes:/etc/nginx/includes  mrdxdy/nginx-file-browser:latest
``` 
