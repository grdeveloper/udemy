import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Box, Button, Divider, Typography } from '@material-ui/core';

export const Header: React.FC<HeaderProps> = ({username, logout, children}) => (
    <Grid container direction="column">
        <Box pt={1} pb={1}>
            <Grid container justify="flex-end">
                <Typography variant="h4">{username}</Typography>
                <Button
                    size="large"
                    color="secondary"
                    variant="contained"
                    onClick={() => logout({token: null})}
                >Log Out</Button>
            </Grid>
        </Box>
        <Divider />
        {children}
    </Grid>
);

interface HeaderProps {
    username: string;
    logout(token: {token: string}): void;
    children: React.ReactNode;
}
