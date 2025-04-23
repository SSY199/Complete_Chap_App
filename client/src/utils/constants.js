// Constants for API routes and other configurations
//AUTHENTICATION ROUTES
export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";

export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;

export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;

export const GET_USER_INFO = `${AUTH_ROUTES}/user_info`;

export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update_profile`;

export const UPDATE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/update_profile_image`;

export const DELETE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/delete_profile_image`;

export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

//CONTACTS ROUTES
export const CONTACTS_ROUTES = "api/contacts";

export const GET_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/getContacts`;