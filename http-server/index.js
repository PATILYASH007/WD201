const express = require('express');
const path = require('path');
const minimist = require('minimist');
const app = express();

//command line arguments
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

app.use(express.static(path.join(__dirname, 'http-server')));
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'http-server', 'index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'http-server', 'home.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});