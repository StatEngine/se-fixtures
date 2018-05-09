const async = require('async');

const Fixtures = require('./lib');

const locals = {
  FireDepartment: {
    latitude: 55,
    longitude: -75,
    fd_id: '76000',
    name: 'Richmond Fire and Emergency Services',
    state: 'VA',
    firecares_id: '93345',
    timezone: 'US/Eastern',
    es_indices: {
      'fire-incident': '93345-va-richmond_fire_and_emergency_services-fire-incident*',
      'apparatus-fire-incident': '93345-va-richmond_fire_and_emergency_services-apparatus-fire-incident*'
    }
  },
};

async.series([
  (done) => {
    Fixtures.seedKibanaAll({}, locals, done);
  },
], (err) => {
  if (err) {
    console.dir('Error initializing Kibana index');
    console.error(err);
  }
  console.dir('Done initializing Kibana index');
});
