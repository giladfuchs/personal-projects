
module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Queue", SingletonQueueSchema.getQueueSchema(mongo));
};

const SingletonQueueSchema = (() => {
  let queueSchema;

  const createQueueSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema(
      {
        day: {
          type: String,
          required: true,
        },
        hour: {
          type: String,
          required: true
        },
        duration: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        services: [{
          serviceId: { type: Schema.Types.ObjectId, ref: require('./service.model')(mongo), required: true },
          count: Number
        }]
        ,
        clientId: { type: Schema.Types.ObjectId, ref: require('./client.model')(mongo), required: true },
        isApprove: {
          type: Boolean,
          default: true,
        },
        isPaid: {
          type: Boolean,
          default: true,
        },

      },
      { timestamps: true }
    );
  };

  return {
    getQueueSchema: (mongo) => {
      if (!queueSchema) queueSchema = createQueueSchema(mongo);
      return queueSchema;
    },
  };
})();
