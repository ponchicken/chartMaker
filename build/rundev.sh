# docker build -t chartmaker .
# docker run --rm -it -p 3300:3300 chartmaker

#!/bin/bash
# docker-compose run dev $@
docker-compose rm -f -s
docker-compose up --remove-orphans
docker-compose logs -f