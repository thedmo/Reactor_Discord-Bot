# Use official Node.js LTS image
FROM node:18 AS reactor-builder

WORKDIR /app

# Copy package files and install dependencies
COPY ./Reactbot/package*.json ./
RUN npm install --production

# Copy app source
COPY ./Reactbot ./

# Use a minimal image for running the app
FROM node:18
WORKDIR /app
COPY --from=reactor-builder /app .
ENV NODE_ENV=production
USER node
CMD ["npm", "start"]
