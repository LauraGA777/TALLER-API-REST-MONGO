import  Router  from 'express';

const routerParkingSpot = Router();

import { createParkingSpots, getParkingSpotById, getParkingSpots,getParkingSpotsByStatus,updateParkingSpot,deleteParkingSpot } from '../controllers/ParkingSpotController.js';

routerParkingSpot.post('/', createParkingSpots);
routerParkingSpot.get('/:id', getParkingSpotById);
routerParkingSpot.get('/', getParkingSpots);
routerParkingSpot.get('/:status', getParkingSpotsByStatus);
routerParkingSpot.put('/:id', updateParkingSpot);
routerParkingSpot.delete('/:id', deleteParkingSpot);


export default routerParkingSpot;