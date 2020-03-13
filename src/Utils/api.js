import { DefaultApiFactory } from '../packages/api';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(process.env);

export default () => {
  return DefaultApiFactory(undefined, BASE_URL);
}