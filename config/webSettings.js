module.exports = {
    sessionSettings: {
        // httpOnly: true, //cannot access via javascript/console
        // secure: true, //https only
        secret: 'secret secretary',
        resave: false,
        saveUninitialized: false,
        cookie: (process.env.NODE_ENV === 'production') ? {
            httpOnly: true,
            // path: corsSettings.origin,
            // sameSite: 'lax',
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 60, // 1 hour
        } : null,
    },

    corsSettings: {
        origin: true,
        credentials: true,
        preflightContinue: true,
    },
}
