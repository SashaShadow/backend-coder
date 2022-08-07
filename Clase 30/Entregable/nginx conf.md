upstream node_app {
        server 127.0.0.1:8081;
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
}

upstream others {
        server 127.0.0.1:8080;
}

server {
        listen 80 default_server;
        listen [::]:80 default_server;
        
        root /var/www/public;

        index index.html index.htm index.nginx-debian.html;

        server_name nginx_server;       

        location /api/random {
                proxy_pass http://node_app;
        }

        location /api/ {
                proxy_pass http://others;
        }
}

