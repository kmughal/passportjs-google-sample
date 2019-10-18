const express = require("express");

const app = express();
const port = 3000;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);

      return done(null, accessToken);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback", (req, res) => {
  res.redirect("http://localhost:3001?hash=" + req.query.code);
});

app.listen(port, () => console.log("connected"));
