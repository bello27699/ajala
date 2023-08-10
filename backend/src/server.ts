import express from "express";
import cors from "cors";
import passportazure from "passport-azure-ad";
import passport from "passport";
import { passconfig } from "./config/passport";
import cookieParser from "cookie-parser";
const hsts = require('hsts')
const csrf = require('csurf')

var session = require('express-session')
const app = express();





app.use(cors());
app.use(hsts({
  maxAge: 15552000  // 180 days in seconds
}))
const OIDCStrategy = passportazure.OIDCStrategy;

passport.serializeUser(function (user:any, done) {
    done(null, user.oid);
  });
  
passport.deserializeUser(function (oid, done) {
    findByOid(oid, function (err:any, user:any) {
      done(err, user);
    });
});

  
let users: any[] = [];
let findByOid = function (oid: any, fn: any) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.oid === oid) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};


passport.use(
  new OIDCStrategy(
    {
      identityMetadata: passconfig.creds.identityMetadata,
      clientID: passconfig.creds.clientID,
      responseType: "code id_token",
      responseMode: "form_post",
      redirectUrl: passconfig.creds.redirectUrl,
      allowHttpForRedirectUrl: true,
      clientSecret: passconfig.creds.clientSecret,
      validateIssuer: true,
      isB2C: false,
      issuer: "",
      passReqToCallback: false,
      scope: "",
      loggingLevel: "error",
      //loggingNoPII: config.creds.loggingNoPII,
      nonceLifetime: 0,
      nonceMaxAmount: 5,
      useCookieInsteadOfSession: true,
      //cookieSameSite: config.creds.cookieSameSite, // boolean
      cookieEncryptionKeys: [
        { key: "12345678901234567890123456789012", iv: "123456789012" },
        { key: "abcdefghijklmnopqrstuvwxyzabcdef", iv: "abcdefghijkl" },
      ],
      //clockSkew: config.creds.clockSkew,
      // proxy: { port: 'proxyport', host: 'proxyhost', protocol: 'http' },
    },
    function (
      iss: any,
      sub: any,
      profile: any,
      accessToken: any,
      refreshToken: any,
      done: any
    ) {
      if (!profile.oid) {
        return done(new Error("No oid found"), null);
      }
      // asynchronous verification, for effect...
      process.nextTick(function () {
        findByOid(profile.oid, function (err: any, user: any) {
          if (err) {
            return done(err);
          }
          if (!user) {
            // "Auto-registration"
            users.push(profile);
            return done(null, profile);
          }
          return done(null, user);
        });
      });
    }
  )
);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


 
export const csrfProtection = csrf({ cookie: true })

app.get('/csrf',function(req, res) {
  // Generate a token and send it to the view
  res.status(200).send({ csrfToken: req.csrfToken() })
  })
export default app;
