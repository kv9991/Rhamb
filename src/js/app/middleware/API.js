import axios from 'axios';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {

  if (!action[CALL_API]) {
    return next(action);
  }

  let request = action[CALL_API];
  let { getState } = store;
  let deferred = Promise.defer();

  // handle 401 and auth here
  let { method, url, successType } = request;
  axios.get(url)
    .then(
      (res) => {
        next({
          type: successType,
          response: res.data
        })

        deferred.resolve();
      },
      (err) => {
        console.log(err);
      })

  return deferred.promise;
};