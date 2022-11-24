export enum Api {
  LOGIN = '/authentication-service/oauth/token',
  AUTHENTICATION_SERVICE_USERS_ADMIN = '/authentication-service/v1/users/admin',
  AUTHENTICATION_SERVICE_USERS_ADMIN_ID = '/authentication-service/v1/users/admin/:id',
  AUTHENTICATION_SERVICE_USERS_ADMIN_EMAIL = '/authentication-service/v1/admin/users',


  GET_CATEGORIES = '/api/category',
  GET_CATEGORY_BY_ID = '/api/category/:id',
  CREATE_CATEGORY = '/api/category',
}