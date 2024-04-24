'use strict';

import logger from '../utils/logger.js';
import collectionStore from '../models/collection-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const collection = {
  createView(request, response) {
    const collectionId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Collection id = ' + collectionId);
    
    const viewData = {
      title: 'Collection Details',
      singleCollection: collectionStore.getCollection(collectionId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };

    response.render('collection', viewData);
  },
  
  addMedalist(request, response){
    const collectionId = request.params.id;
    const collection = collectionStore.getCollection(collectionId);
    const newMedalist = {
      id: uuidv4(),
      name: request.body.name,
      age: request.body.age,
      country: request.body.country,
      Awards: request.body.Awards,
      prize_money: request.body.prize_money,
    };
    collectionStore.addMedalist(collectionId, newMedalist);
    response.redirect('/collection/' + collectionId);
  },
  
  deleteMedalist(request, response) {
    const collectionId = request.params.id;
    const medalistId = request.params.medalistid;
    logger.debug(`Deleting Medalist  $(medalistId} from Collection ${collectionId}`);
    collectionStore.removeMedalist(collectionId, medalistId);
    response.redirect('/collection/' + collectionId);
  },
  
  updateMedalist(request, response) {
    const collectionId = request.params.id;
    const medalistId = request.params.medalistid;
    logger.debug("updating medalist " + medalistId);
    const updatedMedalist = {
      id: medalistId,
      name: request.body.name,
      age: request.body.age,
      country: request.body.country,
      Awards: request.body.Awards,
      prize_money: request.body.prize_money
    };
    collectionStore.editMedalist(collectionId, medalistId, updatedMedalist);
    response.redirect('/collection/' + collectionId);
  }
};

export default collection;