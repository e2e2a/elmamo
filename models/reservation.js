var mongoose = require("mongoose");

var schema = mongoose.Schema({
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    contact: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    boardingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boarding',
    },
    status: {
        type: String
    },
}, {
    versionKey: false,
    timestamps: true
}
); 

module.exports = mongoose.model('Reservation', schema, 'Reservation');