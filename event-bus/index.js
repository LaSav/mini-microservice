const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/events', async (req, res) => {
  const event = req.body;

  try {
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);
    res.send({ status: 'OK' });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
