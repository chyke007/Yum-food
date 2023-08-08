FROM node:14
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
RUN npm run build-frontend
EXPOSE 4000
CMD ["npm", "start"]