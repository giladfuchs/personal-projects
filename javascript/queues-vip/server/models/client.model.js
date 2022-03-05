module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Client", SingletonClientSchema.getClientSchema(mongo));
};

const SingletonClientSchema = (() => {
  let scheduleSchema;

  const createClientSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema(
      {
        details: {
          firstName: {
            type: String,
            required: true,
            maxlength: 32,
          },
          lastName: {
            type: String,

            required: true,
            maxlength: 32,
          },
          phone: {
            type: String,
            unique: true,
            required: true,
            maxlength: 11,
          },
          email: {
            type: String,
            trim: true,
            required: false,
          },
        },
        otherData: {
          image: {
            type: String,
            default: "",
          },
          remark: { type: String, default: "" },
        }

      },
      { timestamps: true }
    );
  };

  return {
    getClientSchema: (mongo) => {
      if (!scheduleSchema) scheduleSchema = createClientSchema(mongo);
      return scheduleSchema;
    },
  };
})();
