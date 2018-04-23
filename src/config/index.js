export default {
  elasticsearch: {
    host: process.env.ELASTICSEARCH_URI || 'localhost:9200',
    httpAuth: (process.env.ELASTICSEARCH_USER && process.env.ELASTICSEARCH_PASSWORD) ? `${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PASSWORD}` : undefined,
    apiVersion: process.env.ELASTICSEARCH_API_VERSION || '5.5',
  }
};
