'use strict';

// import all required modules
import logger from '../utils/logger.js';
import raceStore from '../models/race-store.js';
import { v4 as uuidv4 } from 'uuid';

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the Sim Race Tracker Dashboard!',
      races: raceStore.getAllRaces(),
    };

    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.races);
    response.render('dashboard', viewData);
  },
  
  deleteSeries(request, response) {
    const seriesId = request.params.id;
    logger.debug(`Deleting Series ${seriesId}`);
    raceStore.removeSeries(seriesId);
    response.redirect('/dashboard');
  },

  addSeries(request, response) {
    const newSeries = {
      id: uuidv4(),
      series: request.body.series,
      race: [],
    };
    raceStore.addSeries(newSeries);
    response.redirect('/dashboard');
    },

};

// export the dashboard module
export default dashboard;
