const express = require('express');
const app = express();

const PORT = process.env.PORT || 3333;

app.get('/', (request, response) => {
  response.send('Yay a response!');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
