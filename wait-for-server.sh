#!/usr/bin/env bash

set -e

shift
cmd="$@"

until curl -f http://backend:3001; do
  >&2 echo "Server is unavailable - sleeping"
  sleep 1
done

sleep 6

>&2 echo "Server is up - executing command"
exec $cmd