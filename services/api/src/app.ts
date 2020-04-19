import express from 'express';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import cors from 'cors';
import DB from './db';

const app = express();
const router = express.Router();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
router.use(awsServerlessExpressMiddleware.eventContext())

router.options('/new', cors(corsOptions));
router.post('/new', cors(corsOptions), (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":0,"challenger":{"name":"Scott","number":0},"victim":{"name":"Scott","number":0},"status":"new"}');
  res.json(json);
});

router.options('/activate/:id', cors(corsOptions));
router.post('/activate/:id', cors(corsOptions), (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":20,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":7},"status":"activated"}');
  res.json(json);
});

router.options('/complete/:id', cors(corsOptions));
router.post('/complete/:id', cors(corsOptions), (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":20,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":7},"status":"activated"}');
  res.json(json);
});

router.options('/check/:id', cors(corsOptions));
router.get('/check/:id', cors(corsOptions), (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":0,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":2},"status":"new"}');
  res.json(json);
});

router.get('/', async (req, res) => {
  const challenges = await DB.getAllChallenges();
  res.json(challenges);
});

app.use('/', router);

export default app;
