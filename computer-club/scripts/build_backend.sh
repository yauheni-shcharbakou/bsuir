#!/bin/bash

cd backend || exit
npm i
npm run lint
npm run build
