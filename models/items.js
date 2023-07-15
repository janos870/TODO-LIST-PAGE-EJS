const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema ({
    name: {
        type: String,
    }
})

const Item = mongoose.model('Item', itemsSchema);

module.exports = Item;



