import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('./genre/Comedy.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(PORT);