export COMPOSE_FILE=docker-compose.build.yml
docker-compose rm -f -s
docker-compose up --remove-orphans
docker-compose logs -f
