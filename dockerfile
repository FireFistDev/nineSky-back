# Step 1: Build the application
FROM node:18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Create a minimal image for production
FROM node:18-slim as production

# Set the working directory
WORKDIR /app

# Install dependencies for production
COPY package*.json ./
RUN npm ci --only=production

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Copy other necessary files (like environment files, if needed)
COPY --from=builder /app/.env ./ 

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/main"]
