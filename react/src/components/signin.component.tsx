import * as React from 'react';
import {Button, TextField } from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {UserCredentials} from "../common";

export const Signin: React.FC<SigninProps> = ({handleSignIn}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    return (
        <form noValidate onSubmit={handleSubmit(handleSignIn)}>
            <TextField
                autoComplete="off"
                fullWidth
                margin="normal"
                variant="outlined"
                label="User Name"
                error={!!errors.username}
                helperText={errors.username?.message}
                {...register("username", {required: "Username field is required"})}
            />
            <TextField
                autoComplete="off"
                fullWidth
                margin="normal"
                variant="outlined"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {required: "Password field is required"})}
            />
            <Button
                fullWidth
                size="large"
                type="submit"
                color="secondary"
                variant="contained"
            >
                Sign In
            </Button>
        </form>
    );
};

interface SigninProps {
    handleSignIn(credentials: UserCredentials): void;
}
