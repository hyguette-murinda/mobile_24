const whitelist = [
  "https://youurl.com",
  "http://localhost:3000",
  "http://localhost:5001",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  credentials: true,
  exposedHeaders: ["*", "Authorization"]
};

export default options;
