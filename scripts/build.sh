#!/bin/bash

rm -rf dist
cp -a -v src/lib/scss/private/components/assets dist
cp -a -v src/lib/scss dist
rollup -c
tsc --project src/bin
sass dist/scss/index.scss dist/index.css