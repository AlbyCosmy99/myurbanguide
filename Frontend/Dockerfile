# Fase 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Accetta le variabili di build
ARG VITE_BACKEND_URL
ARG VITE_UPLOAD_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_UPLOAD_URL=$VITE_UPLOAD_URL

RUN npm run build

# Fase 2: Produzione con Nginx
FROM nginx:alpine

# Copia i file statici compilati
COPY --from=build /app/dist /usr/share/nginx/html

# Copia la configurazione di Nginx per il routing (necessaria per React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
