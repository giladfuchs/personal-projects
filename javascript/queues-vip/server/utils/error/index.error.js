module.exports = (app) => {
  app.use((error, req, res, next) => {
    console.log(error);

    const status = error.statusCode || 500;
    const message = !error.statusCode
      ? error.name + " גישה נדחתה, נא להתחבר מחדש, אם זה חוזר אנא פנה לתמיכה"
      : error.message;
    const data = error.data;
    res.status(status).json({ message, data });
  });

  app.use(function (req, res, next) {
    res.status(404).json({ message: "כתובת לא נמצאה" });
  });
};
