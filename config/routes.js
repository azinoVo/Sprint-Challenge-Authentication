const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

const { authenticate, jwtKey } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let { username, password } = req.body;
  const user = req.body;

  if (username && password) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    console.log(hash)

    db('users')
      .insert(user)
      .then(ids => {
        console.log(ids);
        const [id] = ids;

        db('users')
          .where({ id })
          .first()
          .then(user => {
            res.status(200).json({ message: `Welcome ${user.username}, your password ${user.password} is safe with us!` })
          })
          .catch(err => {
            res.status(404).json({ message: "User could not be found!" })
          })
      })
      .catch(err => {
        res.status(404).json({ message: "Error finding user info." })
      })

  } else {
    res.status(500).json({ message: "Please provide credentials!" });
  }
}

function login(req, res) {
  // implement user login
  const { username, password } = req.body;

  if (username && password) {

    db('users')
      .where({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          console.log(token)

          res.status(200).json({message: "Success!", token});

        } else {
          res.status(500).json({ message: "Login Success", token })
        }
      })
      .catch(err => {
        res.status(404).json({ message: "That user could not be found!" })
      })

  } else {
    res.status(500).json({ message: "Please provide the correct credentials!" })
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, jwtKey, options);

}
