module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Service", SingletonServiceSchema.getServiceSchema(mongo));
};

const SingletonServiceSchema = (() => {
  let serviceSchema;

  const createServiceSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema(
      {
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
      { timestamps: true }
    );
  };

  return {
    getServiceSchema: (mongo) => {
      if (!serviceSchema) serviceSchema = createServiceSchema(mongo);
      return serviceSchema;
    },
  };
})();
