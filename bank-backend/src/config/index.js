const mongoose = require("mongoose");
const express = require("express");
const { ExtractJwt } = require("passport-jwt");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.mongodburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const db = mongoose.connection;

const authOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};

const emailTransportOptions = {
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

module.exports = {
  connectDB,
  db,
  authOptions,
  emailTransportOptions,
  app,
  socket,
};
