var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'SMB-test-2',
  description: 'Writes SMB-test results to mongo ang get statistics',
  script: 'app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();