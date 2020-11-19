#!/bin/bash

rm -rf dist
mkdir -p dist/tmp 
cp -a -v src/lib/scss/private/components/assets dist
cp -a -v src/lib/scss dist/tmp
cp -v src/lib/scss/public/*.scss dist
rollup -c
