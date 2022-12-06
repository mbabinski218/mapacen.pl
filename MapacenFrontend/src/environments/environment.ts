

export const environment: Environment = {
  production: false,

  backend: '',
  httpBackend: 'https://mapacenio.azurewebsites.net',
};

interface Environment {
  production: boolean,
  backend: string,
  httpBackend: string;
}