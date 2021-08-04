const fastify = require("fastify")({ logger: true }); // will give some extra information
const PORT = 5000;
//after creating controllers folder do this
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "fastify-api" },
  },
});
fastify.register(require("./routes/items"));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
