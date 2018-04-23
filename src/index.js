import * as async from 'async';

import { createIndex, deleteIndex } from './lib/elasticsearch';
import { loadTemplates } from './lib/load-templates';

const getIndex = fd => `.kibana_${fd.firecares_id}`;

const loadTemplateType = (index, type, options, locals, cb) => loadTemplates({
  index,
  type,
  options,
  locals,
}, cb);

// Creates a Kibana Index
export function createKibanaIndex(options, locals, cb) {
  const index = getIndex(locals.FireDepartment);
  console.info(`Creating Kibana index: ${index}`);
  createIndex({ index }, (err) => {
    if (err) return cb(err);
    return seedKibanaIndex(options, locals, cb);
  });
}

// Deletes a Kibana Index
export function deleteKibanaIndex(options, locals, cb) {
  const index = getIndex(locals.FireDepartment);
  console.info(`Deleting Kibana index: ${index}`);
  return deleteIndex({ index }, cb);
}

// Seeds configurations settings in Kibana
export function seedKibanaConfig(options, locals, cb) {
  const index = getIndex(locals.FireDepartment);
  console.info(`Seeding Kibana config: ${index}`);
  return loadTemplateType(index, 'config', options, locals, cb);
}

// Seeds index patterns in Kibana
export function seedKibanaIndexPatterns(options, locals, cb) {
  const index = getIndex(locals.FireDepartment);
  console.info(`Seeding Kibana index patterns: ${index}`);
  return loadTemplateType(index, 'index-pattern', options, locals, cb);
}

// Seeds visualizations in Kibana
export function seedKibanaVisualizations(options, locals, cb) {
  const index = getIndex(locals.FireDepartment);
  console.info(`Seeding Kibana config: ${index}`);
  return loadTemplateType(index, 'visualization', options, locals, cb);
}

// Seeds dashboards in Kibana
export function seedUserDashboard(options, locals, cb) {
  const index = getIndex(locals.FireDepartment);
  console.info(`Seeding Kibana config: ${index}`);
  return loadTemplateType(index, 'dashboard', options, locals, cb);
}

// Seeds a Kibana index with configs, index-patterns, visualizations, and dashboards
export function seedKibanaIndex(options, locals, cb) {
  async.series([
    done => seedKibanaConfig(options, locals, done),
    done => seedKibanaIndexPatterns(options, locals, done),
    done => seedKibanaVisualizations(options, locals, done),
    //done => seedUserDashboard(options, locals, done),
  ], cb);
}
