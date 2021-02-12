require('dotenv').config()
const http = require('http');
const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const passportConfig = require('./config/passportConfig');
const morgan = require('morgan')
const cors = require('cors');
const webSettings = require('./config/webSettings')
const app = express();
const errHandler = require('./utils/errorHandler')

app.use(morgan('short'))
app.use(express.json())
app.set('port', process.env.PORT || 3008);
app.use(webSettings.sessionRedisMiddleware)
// important: this [cors] must come before Router
// app.use(passport.initialize());
// app.use(passport.session());
// cors called after session and passport
app.use(cors(webSettings.corsSettings));
// passportConfig()

const server = http.createServer(app);

app.use(require('./utils/timeStamp'))
app.use('/api/emp', require('./routes/api/emp'));
app.use('/api/dept', require('./routes/api/dept'))
app.use('/api/title', require('./routes/api/title'))


// 404
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    console.log('reached the end...404 or 500')
    console.log('check cors, path, method...etc')
    console.log(err)
    console.log()
    res.json(errHandler(err))
});

server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
});
