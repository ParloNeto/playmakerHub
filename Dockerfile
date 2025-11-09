# Etapa 1: Construção da aplicação Angular
FROM node:20 AS builder

COPY package.json ./

RUN npm install --progress=false --quiet --no-audit --force \
  && mkdir /app \
  && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

RUN npm run build --configuration=development

# Etapa 2: Configuração do Nginx para servir a aplicação Angular
FROM nginx:latest

RUN mkdir -p /spool/nginx /run/pid \
    && chgrp -R 0 /var/log /var/cache /run/pid /spool/nginx /var/run /run /tmp /etc/nginx \
    && chmod -R g+rwX /var/log /var/cache /run/pid /spool/nginx /var/run /run /tmp /etc/nginx

COPY nginx/default.conf /etc/nginx/conf.d/

RUN chmod 775 /etc/nginx -R \
    && chmod 775 /var/log/nginx -R

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/playmaker-hub-front/browser /usr/share/nginx/html

RUN chmod 775 /usr/share/nginx/html -R

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
