var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(7000, function() {
  console.log(' -------- Bookmarks Manager -----------');
  console.log('Directory = ' + __dirname);
  console.log('Listening on port 7000...');

});
