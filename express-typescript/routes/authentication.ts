import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import express from 'express';

const admin = {
    name: 'admin',
    password: 'password'
};

passport.use(new LocalStrategy(
    (username:string ,password: string,done) => {
        if (username === admin.name || password === admin.password){
            return done (null,{username: username, password: password});
        }else{
            return done(null,false);
        }
    }
));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user:Express.User,done)=>{
    done(null,user);;
});

const login = passport.authenticate('local',{failureRedirect: '/',successRedirect: '/admin'});

export{login};