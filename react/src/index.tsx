import * as React from "react";
import * as ReactDOM from "react-dom";
import {Box, CssBaseline } from "@material-ui/core";

import "./index.scss";
import { App } from "./App";
import AuthProvider from "./state/auth.state";

ReactDOM.render(
    <CssBaseline>
        <Box height="100vh" pl={7} pr={7}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Box>
    </CssBaseline>,
    document.getElementById("app")
);
