'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import collectionStore from '../models/collection-store.js';
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    
    if (!loggedInUser) {
      response.redirect('/');
      return; // Exit early if no user is logged in.
    }

    // Get only the playlists for the logged-in user
    const userCollections = collectionStore.getUserCollection(loggedInUser.id);
    
    let numCollections = userCollections.length;
    let numMedalists = 0;
    let aveMedalistsinCollections = 0;
    let medalistsCount = 0;
    let maxMedalistsCollection = "";
    let minMedalistsCollection = "";
    
    for (let item of userCollections) {
       numMedalists += item.medalist.length;
      
      if(numMedalists>0){
        aveMedalistsinCollections = numMedalists/numCollections;
      }
    }
    
    for (let largeCollection of userCollections){
       
      if(largeCollection.medalist.length > medalistsCount){
          maxMedalistsCollection = largeCollection.title;
          medalistsCount = largeCollection.medalist.length;
      } 
     logger.debug(largeCollection); 
    }
    
    for (let smallCollection of userCollections){
      if(smallCollection.medalist.length < medalistsCount){
        minMedalistsCollection = smallCollection.title;
        medalistsCount = smallCollection.medalist.length;
      }
    }
    logger.info("Start page loading!");
    
   
    const viewData = {
        title: "All England Open Badminton Championships",
        info: appStore.getAppInfo(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
        displayNumCollections: numCollections,
        displayNumMedalists: numMedalists,
        displayAveMedalistsinCollections: aveMedalistsinCollections,
        displayLargestCollections: maxMedalistsCollection,
        displaySmallestCollections: minMedalistsCollection
    };
    
    response.render('start', viewData);
 },
     
};


export default start;
