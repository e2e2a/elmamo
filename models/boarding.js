var mongoose = require("mongoose");

var schema = mongoose.Schema({
    imgUrl: {
        type: String
    },
    name: {
        type: String
    },
    contact: {
        type: String
    },
}, {
    versionKey: false,
    timestamps: true
}
); 

module.exports = mongoose.model('Boarding', schema, 'Boarding');