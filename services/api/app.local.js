const app = require('./app.js');

const port = 4000

app.listen(port);
console.log(`listening on http://localhost:${port}`)

module.exports = app;
