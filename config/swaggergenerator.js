module.exports["swagger-generator"] = {
  disabled: false,
  swaggerJsonPath: "./assets/swagger.json",
  swagger: {
    swagger: '2.0',
    info: {
      title: 'Star Wars API Docs',
      description: 'Read you must. May the force be with you!',
      termsOfService: 'http://deathstar06.herokuapp.com',
      contact: { name: 'Nicholas Kajoh', url: 'http://alphacoder.xyz', email: 'kajohterna@gmail.com' },
      license: { name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html' },
      version: '0.1.0',
    },
    host: `${process.env.APP_HOST}:${process.env.APP_PORT}`,
    basePath: '/',
    externalDocs: { url: 'http://deathstar06.herokuapp.com' }
  }
};