import {SubmissionError} from 'redux-form';
import {BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const createUser = user => dispatch => {
  return fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .catch(err => {
    const {reason, message, location} = err;
    return Promise.reject(
      return Promise.reject(
        new SubmissionError({
          [location]: message
        });;
      );
    );
  });
}
