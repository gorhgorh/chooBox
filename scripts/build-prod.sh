
#!/usr/bin/env bash

# Clean distribution directory.
rm -rf dist && mkdir dist && mkdir dist/js
echo 'Previous build cleaned ...'


# copy assets
cp -r assets dist/
cp index.html dist/
echo '... Assets copied ...'

# Bundle the main js file.

# add -d switch for sourcemapping and debugging production.
NODE_ENV=production browserify -e -d ./client.js -o dist/client.js \
  -t envify \
  -t [ sheetify/transform -u sheetify-cssnext ] \
  -g yo-yoify \
  -g unassertify \
  -g es2040 \
  -g uglifyify | uglifyjs


echo '...Built dist directory'
