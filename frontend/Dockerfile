# Build
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Servidor
FROM nginx:alpine
# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf
# Copia config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia o site compilado (ATENÇÃO: Verifique se 'thalisson-dev' é o nome no seu angular.json em 'outputPath')
COPY --from=build /app/dist/thalisson-dev/browser /usr/share/nginx/html

EXPOSE 80