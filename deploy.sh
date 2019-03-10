#!/bin/bash

export MIX_ENV=prod
export PORT=4999
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

echo "Building..."

mkdir -p ~/.config
mkdir -p priv/static

mix deps.get --only prod
(cd assets && npm install)
(cd assets && npm install moment)
(cd assets && npm install --save bootstrap jquery popper.js)
(cd assets && npm install --save-dev node-sass sass-loader)
(cd assets && webpack --mode production)
mix phx.digest

echo "Generating release..."
mix release --name="task_tracker2"

echo "Starting app..."

_build/prod/rel/task_tracker2/bin/task_tracker2 foreground
