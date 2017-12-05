import {createUser} from './users.js';

describe('createuser', () => {
  it('should be called with certain data', () => {
    //mock response
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      _id: 'sasdf324w12r4gfwert',
      email: 'test@test.com',
      fullName: 'Super Mario'
    }));
    //call create user
    return createUser({
      email: 'test@test.com',
      fullName: 'Super Mario',
      password: '5rserq34tgdfd'
    })()
    .then(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3030/users", {"body": "{\"email\":\"test@test.com\",\"fullName\":\"Super Mario\",\"password\":\"5rserq34tgdfd\"}", "headers": {"content-type": "application/json"}, "method": "POST"});
    })
  });
});
