import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import cors from 'cors';
import DB from './db';

const app = express();
const router = express.Router();
app.use(bodyParser.json())

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
router.use(awsServerlessExpressMiddleware.eventContext())

router.options('/new', cors(corsOptions));
router.post('/new', cors(corsOptions), async (req, res) => {
  const { challenger, challenge, victim } = req.body;
  const dbResponse = await DB.createNewChallenge(challenger, challenge, victim)
  res.json(dbResponse);
});

router.options('/activate/:id', cors(corsOptions));
router.post('/activate/:id', cors(corsOptions), async (req, res) => {
  const { odds, number } = req.body;
  const dbResponse = await DB.activateChallenge(req.params.id, odds, number)
  res.json(dbResponse);
});

router.options('/complete/:id', cors(corsOptions));
router.post('/complete/:id', cors(corsOptions), async (req, res) => {
  const dbResponse = await DB.completeChallenge(req.params.id, req.body.number)
  res.json(dbResponse);
});

router.options('/check/:id', cors(corsOptions));
router.get('/check/:id', cors(corsOptions), async (req, res) => {
  const dbResponse = await DB.getChallenge(req.params.id)
  res.json(dbResponse);
});

router.get('/', async (req, res) => {
  const challenges = await DB.getAllChallenges();
  res.json(challenges);
});

app.use('/', router);

export default app;
