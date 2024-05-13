# Use an official Node.js runtime as the base image
FROM node:18-alpine As build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

COPY .env /app/.env

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy all files from the current directory to the container
COPY --chown=node:node . .

# Build Vue application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run your app
CMD ["npm", "run", "dev"]
