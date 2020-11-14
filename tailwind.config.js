module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {
      margin: {
        "-2": "-0.5rem",
        "-4": "-1rem",
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    cursor: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
