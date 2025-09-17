#!/usr/bin/env bash

DOCKERHUB_REPO_OWNER=$1
DOCKERHUB_REPO_NAME=$2

sudo apt-get update -y
sudo apt-get install -y --no-install-recommends --no-install-suggests \
     wget python3-minimal

BASE_URL=https://registry.hub.docker.com/v2/repositories

DOCKERHUB_IMAGE_VERSION=$(wget -q \
"${BASE_URL}/${DOCKERHUB_REPO_OWNER}/${DOCKERHUB_REPO_NAME}/tags" -O - \
| python3 -c \
"""
import datetime
import json
import sys

results = json.load(sys.stdin)
year = datetime.datetime.now().year
if not results['results']:
   print(f'{year}.0')
else:
    last_image_name_idx = 0
    if results['results'][last_image_name_idx]['name'] == 'latest':
       last_image_name_idx = 1
    tag_number = int(results['results'][last_image_name_idx]['name'].split('.')[1]) + 1
    print(f'{year}.{tag_number}')
"""
)

echo "DOCKERHUB_IMAGE_VERSION=$DOCKERHUB_IMAGE_VERSION" >> "$GITHUB_ENV"
