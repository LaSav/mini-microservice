const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  try {
    posts[id] = {
      id,
      title,
    };

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    });

    res.status(201).send(posts[id]);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('v55');
  console.log('listening on 4000');
});
