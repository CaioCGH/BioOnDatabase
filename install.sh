#!/bin/bash

docker-compose build
docker-compose up
docker exec -it bio-api "npm install --save --force"
docker exec -it bio-ui "npm install --save --force"
