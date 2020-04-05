/* global process */
import { DefaultApiFactory } from '../packages';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default () => {
  return DefaultApiFactory(undefined, BASE_URL);
}
