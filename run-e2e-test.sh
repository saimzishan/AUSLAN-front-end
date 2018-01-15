#!/usr/bin/env bash
set -x #echo on
set -eo pipefail
rm -rf .tmp
for file in $(cat test_features_for_split_container.txt)
do
if [[ $file == *"mobile"* ]]; then
	ng e2e --env=localhost  --no-progress --specs=$file --conf protractor.conf.mobile.js
 else
   ng e2e --env=localhost  --no-progress--specs=$file
fi
done

cat .tmp/cucumber/*.cucumber > .tmp/cucumber/tests.cucumber

