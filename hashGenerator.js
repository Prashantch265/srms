const bcrypt = require("bcrypt");

const genHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const password = "admin123";

console.log(genHash(password));
