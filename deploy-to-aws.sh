#!/usr/bin/env bash

rm -rf dist
ng build --aot --env=canary
