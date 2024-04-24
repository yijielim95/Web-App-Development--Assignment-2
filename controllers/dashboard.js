'use strict';

import logger from "../utils/logger.js";
import collectionStore from "../models/collection-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: "All England Open App Dashboard",
      collections: collectionStore.getUserCollection(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    logger.info('about to render' + viewData.collections);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  addCollection(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const timestamp = new Date();
    const newCollection = {
      userid: loggedInUser.id,
      id: uuidv4(),
      title: request.body.title,
      medalist: [],
      date: timestamp,
      picture: request.files.picture,
    };
    collectionStore.addCollection(newCollection, function() {
    response.redirect("/dashboard");
    });
  },
  
  deleteCollection(request, response) {
    const collectionId = request.params.id;
    logger.debug(`Deleting Collection ${collectionId}`);
    collectionStore.removeCollection(collectionId);
    response.redirect("/dashboard");
  },
  
  updateCollection(request, response){
    const collectionId = request.params.id;
    logger.debug("updating collection " + collectionId);
    let data=collectionStore.getCollection(collectionId);
    let storedmedalists= data.medalist;
    let storeddate = data.date;  
    logger.info(request.body.title)
    const updatedCollection = {
      id: collectionId,
      title: request.body.title,
      medalist:storedmedalists,
      date:storeddate
    };
    collectionStore.editCollection(collectionId,updatedCollection);
    response.redirect("/dashboard");
  },
};

export default dashboard;