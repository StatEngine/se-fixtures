const async = require('async');

const Fixtures = require('./lib');

const locals = {
  FireDepartment: {
    latitude: 55,
    longitude: -75,
    fd_id: '08525',
    name: 'Montrose Fire Protection District',
    state: 'CO',
    firecares_id: '89134',
    timezone: 'US/Mountain',
    es_indices: {
      'fire-incident': '89131-co-montrose_fire_protection_district-fire-incident*',
      'apparatus-fire-incident': '89131-co-montrose_fire_protection_district-apparatus-fire-incident*'
    }
  },
};

async.series([
  (done) => {
    Fixtures.seedIndexTemplates({}, locals, done);
  },
], (err) => {
  if (err) {
    console.dir('Error initializing Kibana index');
    console.error(err);
  }
  console.dir('Done initializing Kibana index');
});
