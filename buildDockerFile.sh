#! /bin/bash

docker build -t ghcr.io/thedmo/reactor-bot:latest .
docker push ghcr.io/thedmo/reactor-bot:latest