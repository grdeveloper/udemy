import * as React from 'react';
import {Button, TextField } from '@material-ui/core';
import {useForm} from 'react-hook-form';

import {UserCredentials} from "../common";

export const Signup: React.FC<SignupProps> = ({handleSignUp}) => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm();

    return (
        <form noValidate onSubmit={handleSubmit(({username, password}) => handleSignUp({username, password}))}>
            <TextField
                fullWidth
                margin="normal"
                autoComplete="off"
                variant="outlined"
                label="User Name"
                error={!!errors.username}
                helperText={errors.username?.message}
                {...register("username", {required: "Username field is required"})}
            />
            <TextField
                fullWidth
                margin="normal"
                autoComplete="off"
                variant="outlined"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {required: "Password field is required"})}
            />
            <TextField
                fullWidth
                margin="normal"
                autoComplete="off"
                variant="outlined"
                label="Repeat Password"
                type="password"
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword?.message}
                {...register("repeatPassword", {validate(value: string) {
                        return value === getValues('password') || "Passwords do not match";
                    }})}
            />
            <Button
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
            >
                Sign Up
            </Button>
        </form>
    );
};

interface SignupProps {
    handleSignUp(credentials: UserCredentials): void;
}
