import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import AutoIncrement from 'mongoose-sequence';

const parkingSpotSchema = new Schema({
    spotNumber: {
        type: Number,
        unique: true,
        required: true
    },
    status: {
        type: String,
        default: 'available'
    },
    vehiclePlate: {
        type: String,
        maxlength: 6,
        match: /^[A-Z0-9]+$/i 
    },
    entryDate: {
        type: Date,
        validate: {
            validator: function(v) {
                return v instanceof Date && !isNaN(v);  
            },
            message: props => `${props.value} is not a valid date!`
        }
    },
    exitDate: {
        type: Date,
        validate: {
            validator: function(v) {
                return v instanceof Date && !isNaN(v);  
            },
            message: props => `${props.value} is not a valid date!`
        }
    },
    pin: {
        type: String
    }
});

parkingSpotSchema.pre('save', async function(next) {
    if (this.vehiclePlate && this.spotNumber) {
        const pin = `${this.spotNumber}${this.vehiclePlate}`; 
        this.pin = await bcrypt.hash(pin, 10);  
    }
    next();
});

export default model('ParkingSpot', parkingSpotSchema);
