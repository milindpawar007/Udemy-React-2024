import { createContext, useContext, useReducer, useState } from "react"

const AuthContext = createContext();

const initalState = {
    user: null,
    isAuthencated: false
}

function reducer(state, action) {
    switch (action) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthencated: true

            }
        case 'logout': return initalState;

        default: throw new Error("unknwon action is called");
    }


}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {

    const [{ user, isAuthencated }, dispatch] = useReducer(reducer, initalState)

    function login({ email, password }) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', value: FAKE_USER })
        }

    }

    function logout() {
        dispatch({ type: 'logout' })
    }
    return (
        <AuthContext.Provider value={{ user, isAuthencated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("conenxt used outside the provider")
    return context
}


export { AuthProvider, useAuthContext }