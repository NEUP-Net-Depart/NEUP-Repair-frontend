#########################################################################
# File Name: minfiy.sh
# Author: VOID_133
# QQ: #########
# mail: ####@gmail.com
# Created Time: Sun Nov 27 19:00:05 2016
#########################################################################
#!/bin/bash

curl -X POST -s --data-urlencode 'input@main.js' https://javascript-minifier.com/raw > main.min.js
curl -X POST -s --data-urlencode 'input@order.js' https://javascript-minifier.com/raw > order.min.js

