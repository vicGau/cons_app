export const LOGIN = 'LOGIN';
export const login = data => ({
    type: LOGIN,
    payload: data,
})

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: LOGOUT,
})


export const SET_USER = 'SET_USER';
export const setUser = data => ({
    type: SET_USER,
    payload: data,
})