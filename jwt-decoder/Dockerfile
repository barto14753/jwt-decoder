FROM node:18-alpine

# Expose the port the app runs in
EXPOSE 3000

# Create a directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the app
CMD ["npm", "start"]