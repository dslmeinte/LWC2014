cd ..
ln -s ../README.md .

cd web/js/lib
curl http://code.jquery.com/jquery-2.0.3.min.js > jquery-2.0.3.min.js
curl http://code.jquery.com/jquery-2.0.3.js > jquery-2.0.3.js
curl http://code.jquery.com/jquery-2.0.3.min.map > jquery-2.0.3.min.map
curl http://underscorejs.org/underscore.js > underscore.js
curl http://underscorejs.org/underscore-min.js > underscore-min.js
curl http://underscorejs.org/underscore-min.map > underscore-min.map
curl https://raw.github.com/BobKnothe/autoNumeric/master/autoNumeric.js > autoNumeric.js

