# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Expose the backend port
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
