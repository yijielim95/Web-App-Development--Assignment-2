'use strict';
import logger from "./utils/logger.js";

import express from 'express';
const router = express.Router();

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import collection from './controllers/collection.js';
import accounts from './controllers/accounts.js';


router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/collection/:id', collection.createView);
router.get('/collection/:id/deletemedalist/:medalistid', collection.deleteMedalist);
router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);
router.post('/collection/:id/addmedalist', collection.addMedalist);
router.post('/dashboard/addcollection', dashboard.addCollection);
router.post('/collection/:id/updatemedalist/:medalistid', collection.updateMedalist);
router.post('/dashboard/updatecollection/:id', dashboard.updateCollection);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;