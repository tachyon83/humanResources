const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dao = require('../models/dao')
const sqls = require('../models/settings/sqlDispenser')

module.exports = () => {

    passport.serializeUser((user, done) => {
        // when done, req.session.passport.user에 저장!
        console.log('[PASSPORT]: Now Serialized')
        console.log()
        if (user) return done(null, user.id);
        return done(null, null)
    })
    passport.deserializeUser((id, done) => {
        // at first, req.session.passport is not defined
        // through this 'deserialize' process, passport is attached

        dao.sqlHandler(sqls.userFindById, id)
            .then(user => {
                user = user[0]
                return done(null, user ? user.id : null)
            })
            .catch(err => done(err, null))

        // now user is registered into req.user
        // Cookie 의 secure 설정이 true 인 경우 deserialize불가
        // 세션 스토어 쿠키 객체의 secure 값을 false-> 해결
        // done(null, id);
    })
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true, //세션에 저장 여부
        // passReqToCallback:false,
        passReqToCallback: true,
    }, (req, id, pw, done) => {
        dao.sqlHandler(sqls.userFindById, id)
            .then(user => {
                user = user[0]
                if (user) {
                    bcrypt.compare(pw, user.password, (err, res) => {
                        if (err) return done(err, false)
                        if (res) return done(null, user)
                        else return done(null, false)
                    })
                } else return done(null, false)
            })
            .catch(err => done(err, false))
    }))
}