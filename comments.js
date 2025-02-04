// create web server
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/comments', (req, res) => {
    const comments = req.body;
    const filePath = 'comments.json';

    fs.writeFile(filePath, JSON.stringify(comments), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error writing to file');
        } else {
            res.status(200).send('Comments saved successfully');
        }
    });
});

app.get('/comments', (req, res) => {
    const filePath = 'comments.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            res.status(200).json(JSON.parse(data));
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});