const express = require('express');
const authApi = require('/app/routes/api/v1/auth');

const app = express();

const PORT = process.env.PORT || 8080;

app.use('/api/v1/auth', authApi);

app.listen(PORT, function () {
	console.log(`Server Listening On Port ${PORT}!`);
});