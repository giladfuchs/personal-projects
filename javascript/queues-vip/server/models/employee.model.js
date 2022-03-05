module.exports = (mongo) => {
  return mongo
    .useDb(mongo.name)
    .model("Employee", SingletonEmployeeSchema.getEmployeeSchema(mongo));
};

const SingletonEmployeeSchema = (() => {
  let employeeSchema;

  const createEmployeeSchema = (mongo) => {
    const Schema = mongo.base.Schema;
    return new Schema({
      details: {
        firstName: {
          type: String,
          trim: true,
          required: true,
          maxlength: 32,
        },
        lastName: {
          type: String,
          trim: true,
          required: true,
          maxlength: 32,
        },
        phone: {
          type: String,
          trim: true,
          required: true,
          maxlength: 11,
        },
        email: {
          type: String,
          trim: true,
          required: true,
        },
      },
      otherData: {

        password: {
          type: String,
          required: true,
        },
        isAdmin: {
          type: Boolean,
          required: true,
          default: true,
        },
        domain: {
          type: String,
          required: true,
        },
        isWorking: {
          type: Boolean,
          required: true,
          default: true
        },
        timeDistance: {
          type: Number,
          required: true,
          default: 10
        }

      },
      schedule: {
        type: Map,
        required: false,
        default: {},
      },
    });
  };

  return {
    getEmployeeSchema: (mongo) => {
      if (!employeeSchema) employeeSchema = createEmployeeSchema(mongo);

      return employeeSchema;
    },
  };
})();
