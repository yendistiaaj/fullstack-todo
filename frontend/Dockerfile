FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /etc/nginx/conf.d

COPY nginx.conf.template default.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

ENV BACKEND_URL=https://todo-list-backend-latest.onrender.com/
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]