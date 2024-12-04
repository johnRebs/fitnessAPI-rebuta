const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.registerUser = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User({ email: req.body.email, password: hashedPassword });

  newUser.save()
    .then(user => res.status(201).send({ message: "User registered successfully" }))
    .catch(err => res.status(500).send({ error: "Error registering user", details: err }));
};

module.exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({ error: "Invalid email or password" });
      }
      const token = auth.createAccessToken(user);
      res.status(200).send({ accessToken: token });
    })
    .catch(err => res.status(500).send({ error: "Error logging in", details: err }));
};
