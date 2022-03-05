const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        domain: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        services: [{
            serviceId: { type: String, required: true },
            count: { type: Number, required: true },
        }],
        clientId: { type: Schema.Types.ObjectId, required: true },
    }
);
cartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 * 60 });
module.exports = mongoose.connection.useDb("manager")
    .model("Cart", cartSchema);
