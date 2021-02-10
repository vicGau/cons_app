export const LOGIN = 'LOGIN';
export const login = data => ({
    type: LOGIN,
    payload: data,
})

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: LOGOUT,
})