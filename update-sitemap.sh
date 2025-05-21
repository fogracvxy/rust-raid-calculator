#!/bin/bash

# Script to update the sitemap.xml lastmod dates with the current date
# Run this script before deployment to ensure your sitemap is always current

# Get current date in YYYY-MM-DD format
CURRENT_DATE=$(date +%Y-%m-%d)

# Path to sitemap
SITEMAP_PATH="./public/sitemap.xml"

# Update all lastmod tags with current date
sed -i "s/<lastmod>[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}<\/lastmod>/<lastmod>$CURRENT_DATE<\/lastmod>/g" $SITEMAP_PATH

echo "Updated sitemap.xml with current date: $CURRENT_DATE"

# Make the script executable with: chmod +x update-sitemap.sh
# Run before deployment with: ./update-sitemap.sh 