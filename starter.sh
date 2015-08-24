#!/bin/sh

cd /home/khaled/Production/node-online-mcq && git pull
export PATH=/usr/local/bin:/home/khaled/Programs/node/bin:$PATH
export NODE_ENV=production
forever start --sourceDir /home/khaled/Production/node-online-mcq mcq.js >> /home/khaled/Production/node-online-mcq/log.txt 2>&1
