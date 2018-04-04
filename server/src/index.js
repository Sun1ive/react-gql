const express = require('express');

const app = express();

const PORT = 4000;

/* eslint-disable no-console */
app.listen(PORT, () => console.log('Server is running at', PORT));

