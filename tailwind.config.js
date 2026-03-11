import flowbite from 'flowbite/plugin'

export default {
  content: [s
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite]
}