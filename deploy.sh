#!/bin/bash
echo Running deployment steps
echo Installing
yarn install
echo Building
yarn run build
echo Copying files to S3
aws s3 sync ./public s3://$1/blog --exclude "*.html" --exclude "*.jpg" --exclude "*.png" --exclude "*.css" --exclude "*.js" --delete --exclude "blog/*" --cache-control max-age=1314000,public
aws s3 cp ./public s3://$1/blog/ --exclude "*" --include "*.jpg" --recursive --include "*.png" --include "*.css" --include "*.js" --metadata-directive REPLACE --acl public-read --cache-control max-age=15778476,public
aws s3 cp ./public s3://$1/blog/ --exclude "*" --include "*.html" --recursive --metadata-directive REPLACE --cache-control public,s-maxage=600,max-age=10,must-revalidate --content-type text/html --acl public-read
echo Invalidating CloudFront cache
aws cloudfront create-invalidation --distribution-id $2 --paths "/blog*"
echo Deployment steps finished
