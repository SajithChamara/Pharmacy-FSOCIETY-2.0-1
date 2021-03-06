'use strict';

/**
 * Module dependencies
 */
var drugsPolicy = require('../policies/drugs.server.policy'),
  drugs = require('../controllers/drugs.server.controller');

module.exports = function(app) {
  // Drug Routes
  app.route('/api/drugs').all(drugsPolicy.isAllowed)
    .get(drugs.list)
    .post(drugs.create);

  //Single drug routes
  app.route('/api/drugs/:drugId').all(drugsPolicy.isAllowed)
    .get(drugs.read)
    .put(drugs.update)
    .delete(drugs.delete);

  // Finish by binding the Prescription middleware
  app.param('drugId', drugs.drugByID);
};
