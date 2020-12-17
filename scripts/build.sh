#!/bin/bash

rm -rf dist
mkdir -p dist/assets
cp -a -v src/lib/scss/private/components/assets dist
mkdir -p dist/lib
cp -a -v src/lib/scss dist/lib
cp `find src -name '*.scss' -maxdepth 1` dist
rollup -c # Bundle the project
rm `find dist -name '*.mdx'` # Delete all the unecessary mdx files
tsc --project src/bin
sass dist/lib/scss/index.scss dist/index.css # Generate SASS file
