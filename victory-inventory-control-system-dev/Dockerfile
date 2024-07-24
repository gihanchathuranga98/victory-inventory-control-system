# Use node:21.7-alpine as the base image
FROM node:21.7-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which your React app will run (if needed)
# EXPOSE 3000

# Command to run the React app
 CMD ["npm", "start"]