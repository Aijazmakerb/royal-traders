/** @type {import('next').NextConfig} */
// const nextSafe = require("next-safe");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});
