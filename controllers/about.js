'use strict';
import logger from "../utils/logger.js";
import collectionStore from '../models/collection-store.js';
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const collections = collectionStore.getAllCollection();
    
    let numCollections = collections.length;
    let numMedalists = 0;
    let aveMedalistsinCollection = 0;
    let medalistsCount = 0;
    let maxMedalistsCollection = "";
    let minMedalistsCollection = "";
    
    
    for (let item of collections){
      numMedalists += item.medalist.length;
      
      if(numMedalists>0){
        aveMedalistsinCollection = numMedalists/numCollections;
      }
    }
    
    logger.info("About page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: "About The All England Open App ",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
        displayAllNumCollections: numCollections,
        displayAllNumMedalists: numMedalists,
        displayAllAveMedalistsinCollections: aveMedalistsinCollection,
      
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
};

export default about;
