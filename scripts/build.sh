#!/bin/bash

rm -rf dist
mkdir -p dist/tmp 
mkdir -p dist/colors 
cp -a -v src/lib/scss/private/components/assets dist
cp -a -v src/lib/scss dist/tmp
cp -v src/lib/scss/public/*.scss dist
cp -v src/lib/scss/public/colors/*.scss dist/colors
rollup -c
cp src/cli.js dist