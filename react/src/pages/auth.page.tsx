import * as React from 'react';
import {Grid} from '@material-ui/core';

import {Signin, Signup} from "../components";
import {AuthContext} from "../state/auth.state";
import {environment, RequestMethods, useFetch, UserCredentials} from "../common";

const Auth: React.FC = () => {
    const {authActions} = React.useContext(AuthContext);

    const handleSignUp = (credentials: UserCredentials) => {
        const request = new Request(`${environment.baseApiUrl}user/signup`, {
            method: RequestMethods.Post,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });
        return useFetch<{token: string}>(request, (user) => {
                window.localStorage.setItem("user", user.token);
                authActions.setUser(user);
            });
    };

    const handleSignIn = (credentials: UserCredentials) => {
        const request = new Request(`${environment.baseApiUrl}user/signin`, {
            method: RequestMethods.Post,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });
        return useFetch<{token: string}>(request, (user) => {
                window.localStorage.setItem("user", user.token);
                authActions.setUser(user);
            });
    };

    return (
        <Grid container justify="space-around">
            <Grid container item xs={3} alignItems="center">
                <Signup handleSignUp={handleSignUp} />
            </Grid>
            <Grid container item xs={3} alignItems="center">
                <Signin handleSignIn={handleSignIn} />
            </Grid>
        </Grid>
    );
};

export default Auth;
