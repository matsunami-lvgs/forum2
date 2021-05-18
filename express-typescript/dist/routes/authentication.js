"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const admin = {
    name: 'admin',
    password: 'password'
};
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
    if (username === admin.name || password === admin.password) {
        return done(null, { username: username, password: password });
    }
    else {
        return done(null, false);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
    ;
});
const login = passport_1.default.authenticate('local', { failureRedirect: '/', successRedirect: '/admin' });
exports.login = login;
