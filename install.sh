#!/bin/bash

docker-compose -f "docker-compose-ec2.yml" build
docker-compose -f "docker-compose-ec2.yml" start
docker exec -it bio-api "npm install --save --force"
