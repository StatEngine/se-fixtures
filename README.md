# StatEngine Kibana Fixtures

 Library to initialize Elasticsearch/Kibana with default dashboards, visulaizations, index patterns, and advanced settings

## Installation
```
npm install @statengine/se-fixtures
```

## Overview

Fixture templates are JSONish files, which are modified exports from Kibana.


Example template file:
```JSON
{
  "_type": "config",
  "_id": "5.5.3-SNAPSHOT",
  "_source": {
    "buildNum": 15497,
    "dateFormat:tz": "{{ FireDepartment.timezone }}",
    "timelion:es.timefield": "description.event_opened",
    "state:storeInSessionStorage": true
  }
}
```

At seed time, ```dateFormat:tz``` field will be substituted with the value defined in  ```FireDepartment.timezone```.

## Adding a new visulaization

1. To add a new visualization, export the JSON from Kibana via the ```Management->Saved Objects``` menu
2. Copy the exported JSON to the templates folder.
3. Replace any index names or other variables with the appropriate template expression.

## Library Usage

```JavaScript
const Fixtures = require('./lib');

const locals = {
  FireDepartment: {
    latitude: 55,
    longitude: -75,
    fd_id: '76000',
    name: 'Richmond Fire and Emergency Services',
    state: 'VA',
    firecares_id: '93345',
    latitude: 0,
    longitude: 0,
    timezone: 'US/Eastern',
    es_indicies: {
      fire-incident: '',
      apparatus-fire-incident: ''
    }
  },
};

Fixtures.deleteKibanaIndex({}, locals, (err) => {
  if (err) console.error('Oh no! Error occurred!!!');
  else console.info('Successfully initialized!');
});
```

## Testing

You can test locally running ```npm run compile && node test```
