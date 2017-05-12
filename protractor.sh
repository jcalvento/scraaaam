#!/usr/bin/env bash

./startMongo.sh &
npm run webdriver-manager & WEBDRIVER_ID=$!
npm start & SCRAM_PID=$!
sleep 2
npm run protractor
./node_modules/protractor/bin/webdriver-manager shutdown
npm stop
kill -TERM ${WEBDRIVER_ID}
kill -TERM ${SCRAM_PID}
pkill --signal SIGTERM scraaaam