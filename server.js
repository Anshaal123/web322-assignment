const express = require('express');
const legoData = require('./modules/legoSets');

const app = express();
const port = 8080;

app.use(express.static(__dirname, 'public'));

legoData.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Error initializing Lego data:', error);
});

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + 'views', 'home.html'));
    });

    app.get('/about', (req, res) => {
        res.sendFile(path.join(__dirname + 'views', 'about.html'));
    });

    app.get('/lego/sets', (req, res) => {
        const theme = req.query.theme;
        if (theme) {
            legoData.getSetsByTheme(theme)
                .then((sets) => res.json(sets))
                .catch((error) => res.status(404).send('Error: ' + error));
        } else {
            legoData.getAllSets()
                .then((sets) => res.json(sets))
                .catch((error) => res.status(404).send('Error: ' + error));
        }
    });

    app.get('/lego/sets/:setNum', (req, res) => {
        const setNum = req.params.setNum;
        legoData.getSetByNum(setNum)
            .then((set) => res.json(set))
            .catch((error) => res.status(404).send('Error: ' + error));
    });

    app.use((req, res) => {
        res.status(404).sendFile(__dirname + '/views/404.html');
    });


module.exports = app