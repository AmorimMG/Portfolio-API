# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

COPY .env /app/.env

# Install dependencies
RUN npm install --production

# Copy all files from the current directory to the container
COPY . .

# Build Vue application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your app
CMD ["npm", "run", "start:prod"]
