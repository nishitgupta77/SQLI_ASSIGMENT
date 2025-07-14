import { request, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

export class PetstoreAPI {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async createUser(user: any) {
    const response = await this.requestContext.post(`${BASE_URL}/user`, {
      data: user,
    });
    return response.json();
  }

  async getUser(username: string) {
    const response = await this.requestContext.get(`${BASE_URL}/user/${username}`);
    return response.json();
  }

  async getSoldPets() {
    const response = await this.requestContext.get(`${BASE_URL}/pet/findByStatus?status=sold`);
    const pets = await response.json();
    return pets.map((p: any) => ({ id: p.id, name: p.name }));
  }
}
