#!/usr/bin/env bash

dockerName() {
  local DOCKER_NAME=$TRAVIS_BRANCH
  if [ "$TRAVIS_BRANCH" == "master" ]; then
    local DOCKER_NAME="stable"
  elif [ "$TRAVIS_BRANCH" == "develop" ]; then
    local DOCKER_NAME="devel"
  fi;
  echo ${DOCKER_NAME}
}

pushToDocker() {
  if [ "$TRAVIS_BRANCH" == "master" -o "$TRAVIS_BRANCH" == "develop" ]; then
    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    docker push $DOCKER_USERNAME/scraaam-$(dockerName "$TRAVIS_BRANCH");
  fi
}