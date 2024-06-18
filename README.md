# bl_server

## Middleware used
Cors middleware used to ensure Cross-Origin Resource Sharing (CORS) issues will not occur.
CORS happen when requests are made from a different origin (eg : localhost:3000 to localhost:5000 of the same machine)

## Docker build command
docker build -t bl_server:v100 (custom version number in sequence)

## Docker run command
docker run -p 5000:5000 bl_server:v100