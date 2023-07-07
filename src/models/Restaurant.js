const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactName: { type: String, required: true },
  pincode: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: true },
  phoneNumber: { type:String, required: true },
  dailyTransactions: { type: Number, required: true }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
