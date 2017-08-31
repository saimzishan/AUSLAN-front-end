#!/usr/bin/env bash
for file in $(cat test_features_for_split_container.txt)
do
rm -rf .tmp
if grep -q mobile "$file"; then
    ng e2e --env=localhost  --progress=true --specs=$file --conf protractor.conf.mobile.js
 else
   ng e2e --env=localhost  --progress=true --specs=$file
fi
files=.tmp/json-output/*.json
cat ${files[0]} | ./node_modules/.bin/cucumber-junit > test-results/${files[0]}-e2e-test-report.xml
done