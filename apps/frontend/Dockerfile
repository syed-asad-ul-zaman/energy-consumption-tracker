# apps/frontend/Dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
