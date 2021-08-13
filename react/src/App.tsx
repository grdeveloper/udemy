import * as React from "react";
import {Grid } from "@material-ui/core";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import {LazyState} from "./common";
import {Header} from "./components";
import {AuthContext} from "./state/auth.state";

const Auth = React.lazy(() => import("./pages/auth.page"));
const Blog = React.lazy(() => import("./pages/blog.page"));
const Blogs = React.lazy(() => import("./pages/blogs.page"));

const blogState = () => import("./state/blog.state");
const blogsState = () => import("./state/blogs.state");

export const App: React.FC = () => {
    const {authState: {user}, authActions: {setUser}} = React.useContext(AuthContext);

    const logout = () => {
        window.localStorage.removeItem("user");
        setUser({token: null});
    };

    return (
        <Grid container item xs={12}>
            <BrowserRouter>
                <React.Suspense fallback={<div>Loading...</div>}>
                    {
                        user
                            ? (
                                <Header username={user.username} logout={logout}>
                                    <Switch>
                                        <Route exact path="/blogs" component={() => (
                                            <LazyState loadState={blogsState}>
                                                <Blogs />
                                            </LazyState>
                                        )} />
                                        <Route exact path="/blogs/:blogId" component={() => (
                                            <LazyState loadState={blogState}>
                                                <Blog />
                                            </LazyState>
                                        )} />
                                        <Route component={(): React.ReactElement => <Redirect to="/blogs" />} />
                                    </Switch>
                                </Header>
                            )
                            : (
                                <Switch>
                                    <Route exact path="/auth" component={Auth} />
                                    <Route component={(): React.ReactElement => <Redirect to="/auth" />} />
                                </Switch>
                            )
                    }
                </React.Suspense>
            </BrowserRouter>
        </Grid>
    )
};
