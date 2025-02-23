# apps/api/Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml if using pnpm)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the application (if needed)
RUN npm run build

EXPOSE 8000

# Run the production server
CMD ["npm", "run", "start:prod"]
