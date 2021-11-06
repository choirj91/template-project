import { enableES5, produce } from 'immer';

const pro = (...args) => {
  enableES5();
  return produce(...args);
};

export default pro;
