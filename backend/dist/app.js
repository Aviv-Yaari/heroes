"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const hero_routes_1 = __importDefault(require("./api/hero/hero.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const logger_service_1 = require("./services/logger.service");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const app = (0, express_1.default)();
const port = process.env.PORT || 3030;
//#region middlewares:
app.use(logger_middleware_1.loggerMiddleware);
app.use(express_1.default.json());
dotenv_1.default.config();
const session = (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 },
});
app.use(session);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        credentials: true,
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    };
    app.use((0, cors_1.default)(corsOptions));
}
//#region DB:
const dbProd = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxpry.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbDev = 'mongodb://localhost:27017';
const dbUrl = process.env.NODE_ENV === 'production' ? dbProd : dbDev;
mongoose_1.default.connect(dbUrl);
//#region Routes:
app.use('/api/auth', auth_routes_1.default);
app.use('/api/hero', hero_routes_1.default);
app.get('/**', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
//#region Error handling
const errorHandler = (err, req, res, next) => {
    const { statusCode = 500 } = err;
    const { message = 'Unknown error' } = err;
    logger_service_1.logger.error(req.method + ' ' + req.path + ' ' + message);
    res.status(statusCode).send({ err: message });
};
app.use(errorHandler);
app.listen(port, () => {
    logger_service_1.logger.info('Server is running on port: ' + port);
});
