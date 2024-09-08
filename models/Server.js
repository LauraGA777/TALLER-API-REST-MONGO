import express from 'express';
import 'dotenv/config';
import connectDB from '../database/config.js';
import ParkingSpotRoute from '../routes/ParkingSpotRoute.js';

export default class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.connectDB();
        this.paths = {
            parkingSpots: '/parking-spots'
        };
        this.middlewares();
        this.routes();
    }
    
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        });
    }
    async connectDB() {
        try {
            await connectDB();
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.parkingSpots, ParkingSpotRoute);
    }


}
