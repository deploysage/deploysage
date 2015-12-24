/* eslint-disable no-console, func-names, no-var */
var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var jade = require('jade');
var config = require('./webpack.client.express.config');
var fixtures = require('./app/libs/fixtures');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

server.app.use(bodyParser.json(null));
server.app.use(bodyParser.urlencoded({ extended: true }));

server.app.use('/', function(req, res) {
  var locals = {
    props: JSON.stringify(fixtures.fixtureState()),
  };
  var layout = process.cwd() + '/index.jade';
  var html = jade.compileFile(layout, { pretty: true })(locals);
  res.send(html);
});

server.listen(4000, 'localhost', function(err) {
  if (err) console.log(err);
  console.log('Listening at localhost:4000...');
});
