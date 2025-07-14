import { request } from '@playwright/test';
import { PetstoreAPI } from './api/petstoreApi';
import { PetNameCounter } from './models/PetNameCounter';

(async () => {
  const requestContext = await request.newContext();
  const api = new PetstoreAPI(requestContext);

  const user = {
    id: 1,
    username: 'testuser123',
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'testpass',
    phone: '1234567890',
    userStatus: 1,
  };

  console.log('Creating user...');
  await api.createUser(user);

  console.log('Retrieving user...');
  const userData = await api.getUser(user.username);
  console.log('User Data:', userData);

  console.log('Fetching sold pets...');
  const soldPets = await api.getSoldPets();
  console.log('Sold Pets (id, name):', soldPets);

  const counter = new PetNameCounter(soldPets);
  const result = counter.countNames();
  console.log('Name Frequency:', result);

  await requestContext.dispose();
})();
