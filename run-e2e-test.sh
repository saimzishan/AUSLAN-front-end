#!/usr/bin/env bash
set -x #echo on
set -eo pipefail
for file in $(cat test_features_for_split_container.txt)
do
if [[ $file == *"mobile"* ]]; then
	ng e2e --env=localhost  --progress=true --specs=$file --conf protractor.conf.mobile.js
 else
   ng e2e --env=localhost  --progress=true --specs=$file
fi
done

cat .tmp/cucumber/*.json > .tmp/cucumber/tests.json

