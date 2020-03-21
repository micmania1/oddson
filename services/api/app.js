import { eventContext as awsServerlessEventContext } from 'aws-serverless-express/src/middleware';
import cors from 'cors';
import express, { Router as expressRouter } from 'express';

const app = express();
const router = expressRouter();

router.use(cors());
router.use(awsServerlessEventContext());

router.post('/new', (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":0,"challenger":{"name":"Scott","number":0},"victim":{"name":"Scott","number":0},"status":"new"}');
  res.json(json);
});

router.post('/activate/:id', (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":20,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":7},"status":"activated"}');
  res.json(json);
});

router.post('/complete', (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":20,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":7},"status":"activated"}');
  res.json(json);
});

router.get('/check/:id', (req, res) => {
  const json = JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":0,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":2},"status":"new"}');
  res.json(json);
});

if (process.env.NODE_ENV === 'development') {
  router.get('/', (req, res) => {
    res.json(['The API is running.']);
  });
}

app.use('/', router);

export default app;
