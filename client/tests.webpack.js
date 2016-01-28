//require('core-js/es5');
//require('./app/bundles/DeploySage/components/repo/RepoWidget.jsx');

//var context = require.context('./app/libs/test', true, /fixtures\.spec\.jsx$/);
//window.global     = window;
//require ('form-data/lib/form_data');
var context = require.context('./app/bundles/DeploySage/components/repo', true, /RepoWidget\.spec\.jsx$/);
context.keys().forEach(context);
