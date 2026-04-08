# Fase 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/Frontend
# Copiamo prima package.json per sfruttare la cache di Docker
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend ./
# Esportiamo dinamicamente l'URL come "/api/" o lasciarlo gestire internamente con percorsi relativi
# Ma possiamo anche compilarlo iniettando percorsi relativi tramite argomenti 
ENV VITE_BACKEND_URL=/api/
ENV VITE_UPLOAD_URL=/
RUN npm run build

# Fase 2: Backend e Servizio
FROM node:18-alpine
WORKDIR /app/Backend
# Copiamo dipendenze backend
COPY Backend/package*.json ./
RUN npm install
# Copiamo il resto dei codici
COPY Backend ./

# Importiamo la build del frontend compilata dalla Fase 1
COPY --from=frontend-builder /app/Frontend/dist /app/Frontend/dist

EXPOSE 3030

# Siccome il workdir è /app/Backend il node index.js avvierà il backend. 
# Quest'ultimo tramite i path statici impostati, servirà /app/Frontend/dist ai client react
CMD ["node", "index.js"]
