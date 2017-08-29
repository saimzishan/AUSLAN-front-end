for file in e2e-tests/features/*.feature
do    
if grep -q mobile "$file"; then
    ng e2e --env=localhost  --progress=true --specs=$file --conf protractor.conf.mobile.js
 else
   ng e2e --env=localhost  --progress=true --specs=$file
fi 
done

