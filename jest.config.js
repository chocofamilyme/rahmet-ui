module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/src/**/*.spec.[jt]s?(x)'],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
};
