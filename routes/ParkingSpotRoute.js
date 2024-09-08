import  Router  from 'express';

const routerParkingSpot = Router();

import { createParkingSpots, getParkingSpotById, getParkingSpots,getParkingSpotsByStatus,updateParkingSpot,deleteParkingSpot, parkVehicle, calculateFee, exitParkingSpot } from '../controllers/ParkingSpotController.js';

routerParkingSpot.post('/', createParkingSpots);
routerParkingSpot.get('/:id', getParkingSpotById);
routerParkingSpot.get('/', getParkingSpots);
routerParkingSpot.get('/:status', getParkingSpotsByStatus);
routerParkingSpot.put('/:id', updateParkingSpot);
routerParkingSpot.delete('/:id', deleteParkingSpot);
routerParkingSpot.post('/park', parkVehicle);
routerParkingSpot.get('/:id/fee', calculateFee);
routerParkingSpot.post('/:id/exit', exitParkingSpot);

export default routerParkingSpot;