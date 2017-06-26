#!/usr/bin/env bash

docker-name() {
  local CURRENT_BRANCH=$1
  local DOCKER_NAME=${CURRENT_BRANCH}
  if [ "$CURRENT_BRANCH" == "master" ]; then
    local DOCKER_NAME="stable"
  elif [ "$CURRENT_BRANCH" == "develop" ]; then
    local DOCKER_NAME="devel"
  fi;
  echo ${DOCKER_NAME}
}