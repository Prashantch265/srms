const allowedOrigins = [
  "http://127.0.0.1",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:5000",
];

const unprotectedRoutes = [
  "/",
  "/favicon.ico",
  "/auth/login",
  "/api/v1/auth/login",
];

const allowedExtension = ["jpeg", "jpg", "png", "gif", "svg"];

module.exports = { allowedOrigins, unprotectedRoutes, allowedExtension };
