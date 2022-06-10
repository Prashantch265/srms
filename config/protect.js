const allowedOrigins = [
  "http://127.0.0.1",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:5000",
];

const unprotectedRoutes = [
  "/",
  "/favicon.ico",
  "/auth/signin",
  "/auth/register",
];

const allowedExtension = ["jpeg", "jpg", "png", "gif", "svg"];

module.exports = { allowedOrigins, unprotectedRoutes, allowedExtension };
