import * as React from 'react';
import { decodeToken, isExpired } from "react-jwt";

import {Action, User} from "../common";

const AUTH_SET_USER = 'auth@SET_USER';

interface AuthState {
    user: User;
}

const token = window.localStorage.getItem("user");
const tokenIsExpired = isExpired(token);

const initialState: AuthState = {
    user: !tokenIsExpired ? decodeToken(token) as User : null,
};

const authReducer = (state: AuthState = initialState, {type, payload}: Action) => {
    if (type === AUTH_SET_USER) {
        return {...state, user: payload,};
    }

    return state;
};

const AuthContext = React.createContext({
    authState: initialState,
    authActions: {
        setUser: (token: {token: string}) => undefined,
    },
});

const AuthProvider: React.FC<AuthStateProps> = ({children}) => {
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    const actions = {
        setUser({token}: {token: string}) {
            dispatch({type: AUTH_SET_USER, payload: decodeToken(token)});
        },
    };

    return (
        <AuthContext.Provider value={{authState: state, authActions: actions}}>
            {children}
        </AuthContext.Provider>
    );
};

interface AuthStateProps {
    children: React.ReactNode;
}

export {AuthProvider as default, AuthContext};
