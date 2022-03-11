const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = 9001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('The server is running but this endpoint is not required for the Challenge');
});

app.get('/products', require('./endpoints/products'));

app.post('/promocode', require('./endpoints/promocode'));

app.post('/checkout', require('./endpoints/checkout'))

app.listen(PORT, () => {
  console.log('Basket Checkout Node Server listening on: http://localhost:' + PORT);
});
