#!/bin/bash

# Remove the data.tsx file
rm ./src/pages/data.tsx

# Get the version from the .version file
VERSION=$(cat .version)

# Replace placeholders with the version and current date in src/constants.ts and static/humans.txt
sed -i "s/SITE_VERSION/$VERSION/g" src/constants.ts
sed -i "s/SITE_VERSION/$VERSION/g" static/humans.txt
sed -i "s/CURRENT_DATE/$(date '+%Y-%m-%d')/g" src/constants.ts
sed -i "s/CURRENT_DATE/$(date '+%Y-%m-%d')/g" static/humans.txt