for file in $(cat test_features_for_split_container.txt)
do    
if grep -q mobile "$file"; then
    ng e2e --env=localhost  --progress=true --specs=$file --conf protractor.conf.mobile.js
 else
   ng e2e --env=localhost  --progress=true --specs=$file
fi 
done

