import { proxy, createServer } from 'aws-serverless-express';
import app from './app';

const server = createServer(app);

export default (event, context) => { proxy(server, event, context) }
