FROM node:21.6.2

WORKDIR /app

COPY package*.json ./

RUN npm install \
		&& npm install -g serve

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["serve", "-s", "build"]
