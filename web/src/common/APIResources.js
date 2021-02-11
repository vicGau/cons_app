/* API Resources */
/* Auth API base URL */
export const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_BASE_URL = `/api`;
export const AUTH_API_BASE_URL = `${API_BASE_URL}/auth`;

/* Auth Resources */
export const LOAD_AUTH_RESOURCE = 'loadAuth';
export const LOGIN_RESOURCE = 'login';
export const LOGOUT_RESOURCE = 'logout';

/* Users resources */
export const USER_RESOURCE = 'users';
export const GET_USER_RESOURCE = `${API_BASE_URL}/${USER_RESOURCE}`;

/* Rooms resources */
export const ROOM_RESOURCE = 'room';
export const COMPANY_RESOURCE = 'company';
export const GET_ROOMS_LIST_RESOURCE = `${API_BASE_URL}/${ROOM_RESOURCE}/${COMPANY_RESOURCE}`;


/* Booking resources */
export const BOOKING_RESOURCE = 'booking';
export const GET_BOOKING_RESOURCE = `${API_BASE_URL}/${BOOKING_RESOURCE}`;
export const CREATE_BOOKING_RESOURCE = `${API_BASE_URL}/${BOOKING_RESOURCE}`;