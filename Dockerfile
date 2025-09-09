# Use Node.js Alpine image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Expose port 4173 (Vite preview default port)
EXPOSE 4173

# Run the preview server to serve the built app
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]