require('dotenv').config();


const server = require('./server');

require('debug')('server');

const port = process.env.PORT || 3000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port', `${port}`);
});
