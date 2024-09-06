import ParkingSpot from "../models/ParkingSpot.js";

// POST /parking-spots: Registra hasta 10 celdas (spots), con spotNumber autoincremental y status por defecto "available".
export const createParkingSpots = async (req, res) => {
    try {
        // Validación para no registrar más de 10 celdas
        const totalSpots = await ParkingSpot.countDocuments();
        if (totalSpots >= 10) {
            return res.status(400).json({ message: 'Cannot create more than 10 parking spots' });
        }

        const parkingSpots = await ParkingSpot.create(req.body);
        return res.status(201).json(parkingSpots);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// GET /parking-spots/{id}: Obtiene una celda específica por su id.
export const getParkingSpotById = async (req, res) => {
    try {
        const parkingSpot = await ParkingSpot.findById(req.params.id);
        if (!parkingSpot) return res.status(404).json({ message: 'Parking spot not found' });
        return res.status(200).json(parkingSpot);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// GET /parking-spots: Lista todas las celdas.
export const getParkingSpots = async (req, res) => {
    try {
        const parkingSpots = await ParkingSpot.find();
        return res.status(200).json(parkingSpots);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// GET /parking-spots/{status}: Lista todas las celdas según su estado (available/unavailable).
export const getParkingSpotsByStatus = async (req, res) => {
    try {
        const parkingSpots = await ParkingSpot.find({ status: req.params.status });
        return res.status(200).json(parkingSpots);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PUT /parking-spots/{id}: Actualiza una celda específica.
export const updateParkingSpot = async (req, res) => {
    try {
        const parkingSpot = await ParkingSpot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!parkingSpot) return res.status(404).json({ message: 'Parking spot not found' });
        return res.status(200).json(parkingSpot);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE /parking-spots/{id}: Elimina una celda específica.
export const deleteParkingSpot = async (req, res) => {
    try {
        const parkingSpot = await ParkingSpot.findByIdAndDelete(req.params.id);
        if (!parkingSpot) return res.status(404).json({ message: 'Parking spot not found' });
        return res.status(200).json({ message: 'Parking spot deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Method to calculate fee: Calcula el valor a pagar basado en la diferencia entre entryDate y exitDate.
export const calculateFee = async (req, res) => {
    try {
        const parkingSpot = await ParkingSpot.findById(req.params.id);
        if (!parkingSpot) return res.status(404).json({ message: 'Parking spot not found' });
        if (parkingSpot.status === 'available') return res.status(400).json({ message: 'Parking spot is available' });
        if (!parkingSpot.entryDate || !parkingSpot.exitDate) return res.status(400).json({ message: 'Entry and exit dates are required' });

        const entryDate = new Date(parkingSpot.entryDate);
        const exitDate = new Date(parkingSpot.exitDate);
        const diff = Math.abs(exitDate - entryDate);
        const hours = Math.ceil(diff / (1000 * 60 * 60));  // Se aproxima al valor entero más cercano hacia arriba
        const fee = hours * 5000;  // Se cobrará 5000 COP por hora
        return res.status(200).json({ fee });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Method for exiting: Cambia el status a "available", vacía los campos vehiclePlate, entryDate, exitDate, y pin.
export const exitParkingSpot = async (req, res) => {
    try {
        const parkingSpot = await ParkingSpot.findById(req.params.id);
        if (!parkingSpot) return res.status(404).json({ message: 'Parking spot not found' });
        if (parkingSpot.status === 'available') return res.status(400).json({ message: 'Parking spot is already available' });

        parkingSpot.status = 'available';
        parkingSpot.vehiclePlate = null;
        parkingSpot.entryDate = null;
        parkingSpot.exitDate = null;
        parkingSpot.pin = null;
        await parkingSpot.save();
        return res.status(200).json(parkingSpot);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
