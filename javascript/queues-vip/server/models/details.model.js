module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Business", SingletonBusinessSchema.getBusinessSchema(mongo));
};

const SingletonBusinessSchema = (() => {
  let businessSchema;

  const createBusinessSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema(
      {
        details: {
          type: {
            organization: {
              type: String,
              trim: true,
              required: true,
              maxlength: 32,
            },
            address: {
              type: String,
              trim: true,
              required: true,
              maxlength: 64,
            },
            phone: {
              type: String,
              trim: true,
              required: true,
              maxlength: 11,
            },

          },
          required: true
        },
        otherData: {
          type: {
            logo: {
              type: String,
              required: false,
              default: "",
            },
            links: {
              type: Map,
              require: false,
              default: {},
            },
            about: {
              type: String,
              require: false,
              default: "",
            },
            notifications: {
              type: [String],
              require: false,
              default: [],
            },

            guestPermission: {
              type: Boolean,
              default: true,
            },
          },
        },
      },
      { timestamps: true }
    );
  };

  return {
    getBusinessSchema: (mongo) => {
      if (!businessSchema) businessSchema = createBusinessSchema(mongo);
      return businessSchema;
    },
  };
})();
