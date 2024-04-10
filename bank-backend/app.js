const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Strategy: JwtStrategy } = require("passport-jwt");
const routes = require("./src/routes");
const { socket, app, connectDB, server } = require("./src/config");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(bodyParser.json());

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ email }).exec();
        const isAuthenticated = user
          ? await user.verifyPasswordSync(password, user.password)
          : false;
        cb(
          null,
          isAuthenticated
            ? { id: user._id, email: user.email, name: user.name }
            : false,
          { message: "Invalid username or password" }
        );
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      return user
        ? done(null, user)
        : done(null, false, { message: "User not found" });
    } catch (error) {
      return done(error);
    }
  })
);

app.use(passport.initialize());

socket.on("connection", (conn) => {
  console.log(`⚡: ${conn.id} user just connected`);
  conn.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(routes);

app.use((req, res, next) => next(createError(401)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({ success: false, error: err });
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});
