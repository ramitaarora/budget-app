const express = require('express');
const path = require('path');
const routes = require('./api');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'shhhhhhhhhhhh', // Store in env variable later
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session(sess));

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    // Adjust later for NextJS build location
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