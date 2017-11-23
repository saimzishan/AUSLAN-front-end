ENV E2E_ENV=localhost
CMD /bin/bash -l
CMD npm install
CMD npm install codeclimate-test-reporter -g
CMD ./run-unit-test.sh
CMD ./setup_ci.sh