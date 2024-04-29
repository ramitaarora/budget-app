const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const routes = require('./api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.use(routes);

if (process.env.NODE_ENV === 'production') {
    // Adjust later for NextJS
    app.use(express.static(path.join(__dirname, '../nextjs-app/out')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../nextjs-app/out', 'index.html'));
    });
}

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
    console.error('Failed to sync db:', err);
    process.exit(1);
});