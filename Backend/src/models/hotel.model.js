const mongoose=require('mongoose')


    // const RoomSchema = new mongoose.Schema({
    // hotelId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Hotel",
    //     required: true
    // },

    // type: {
    //     type: String,
    //     required: true, // e.g. Single, Deluxe, Suite
    // },

    // price: {
    //     type: Number,
    //     required: true
    // },

    // maxGuests: {
    //     type: Number,
    //     required: true
    // },

    // roomNumber: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },

    // unavailableDates: {
    //     type: [Date],
    //     default: []
    // }

    // }, { timestamps: true });


        const hotelSchema = new mongoose.Schema({
            title: {
            type: String,
            unique: true,
            required: true,
            },
        
            description: {
            type: String,
            required: true,
            },
        
            city: {
            type: String,
            required: true,
            index: true,
            },
        
            address: {
            type: String,
            },
        
            price: {
            type: Number,
            required: true,
            index: true,
            },
        
            rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
            },
        
            totalReviews: {
            type: Number,
            default: 0,
            },
        
            room: {
            type: Number,
            required: true,
            },
        
            maxGuests: {
            type: Number,
            default: 2,
            },
        
            amenities: [
            {
                type: String,
                lowercase: true,
            },
            ],
        
            tags: [
            {
                type: String,
                lowercase: true,
            },
            ],
        
            nearbyPlaces: [
            {
                type: String,
                lowercase: true,
            },
            ],
        
            hotelType: {
            type: String,
            enum: [
                "budget",
                "luxury",
                "business",
                "resort",
                "hostel",
                "villa",
            ],
            },
        
            checkInTime: {
            type: String,
            },
        
            checkOutTime: {
            type: String,
            },
        
            policies: [
            {
                type: String,
                lowercase: true,
            },
            ],
        
            img: {
            type: String,
            required: true,
            },
        
            createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            },
        
            isAvailable: {
            type: Boolean,
            default: true,
            },
        
            featured: {
            type: Boolean,
            default: false,
            },
        
        }, {
            timestamps: true,
        });

const hotelModel=mongoose.model('hotel',hotelSchema);

module.exports=hotelModel;