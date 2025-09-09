# Mathmizer 🧮

A beautiful React application to improve your calculation skills and train your mind with numbers.

## Features

- 🎯 Random arithmetic problems (addition, subtraction, multiplication, division, percentages)
- 🎚️ Configurable difficulty levels (Easy, Medium, Hard)
- 🔢 Adjustable number count (2-10 numbers per problem)
- 📊 Score and streak tracking
- 🎨 Beautiful dark theme with animations
- 📱 Fully responsive design

## Quick Start

### Development Mode

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# Or build and run in one command
docker-compose up -d --build
```

The app will be available at http://localhost:4173

### Using Docker Directly

```bash
# Build the Docker image
docker build -t mathmizer .

# Run the container
docker run -d -p 4173:4173 --name mathmizer-app mathmizer
```

### Docker Commands

```bash
# Stop the container
docker-compose down
# or
docker stop mathmizer-app

# View logs
docker-compose logs -f
# or
docker logs mathmizer-app

# Rebuild after changes
docker-compose up -d --build
# or
docker build -t mathmizer . && docker run -d -p 4173:4173 --name mathmizer-app mathmizer

# Remove container and image
docker-compose down --rmi all
# or
docker rm mathmizer-app && docker rmi mathmizer
```

## Nginx Proxy Configuration

If you're using Nginx as a reverse proxy on your VM, add this to your Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-subdomain.example.com;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Configuration

### Difficulty Levels

- **Easy**: Rounded numbers only (100, 200, 2000, etc.)
- **Medium**: Any whole numbers (no decimals)
- **Hard**: Includes decimal numbers (up to 2 decimal places)

### Number Count

Adjust the slider to set how many numbers appear in each calculation (2-10).

## Tech Stack

- ⚛️ React 18
- ⚡ Vite
- 🎨 CSS3 with animations
- 🎭 Framer Motion
- 🎯 Lucide React Icons
- 🐳 Docker

## Port Configuration

- Development: Port 5173 (Vite dev server)
- Production/Docker: Port 4173 (Vite preview server)

## License

MIT