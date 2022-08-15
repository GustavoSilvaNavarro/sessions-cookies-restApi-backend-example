//CALL MODULES
import 'dotenv/config';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from "morgan";

//INITIALIZATIONS
const app = express();
const server = http.createServer(app); //nuevo
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//SETTINGS
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
const optionsForMongo = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//MIDDLEWARES
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MDB_DATABASE_CONNECTION, mongoOptions: optionsForMongo }),
    secret: process.env.SESSION_KEY_CODE,
    resave: false,
    saveUninitialized: false,
    rolling: true, //re start the expiration time with each request
    cookie: {
        maxAge: 60000
    }
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
import mainRoute from './routes/mainEnter-route.js';

//ROUTES
app.use('/', mainRoute);

//SERVER
server.listen(app.get('port'), () => {
    console.log('Server on Port:', app.get('port'));
});