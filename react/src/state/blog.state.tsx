import * as React from 'react';
import { useHistory } from 'react-router-dom';

import {Action, Blog, environment, RequestMethods, useFetch} from "../common";

const BLOG_SET_BLOG = 'blog@SET_BLOG';

interface BlogState {
    blog: Blog;
}

const initialState: BlogState = {
    blog: null,
};

const blogReducer = (state: BlogState = initialState, {type, payload}: Action) => {
    if (type === BLOG_SET_BLOG) {
        return {...state, blog: payload};
    }

    return state;
};

const BlogContext = React.createContext({
    blogState: initialState,
    blogActions: {
        setBlog: (blog: Blog) => undefined,
    },
});

const BlogProvider: React.FC<BlogStateProps> = ({children}) => {
    const history = useHistory();
    const [state, dispatch] = React.useReducer(blogReducer, initialState);

    React.useEffect(() => {
        if (history.location.pathname.endsWith('new')) {
            return;
        }

        const editableBlog = (history.location.state as {detail: Blog})?.detail;
        if (editableBlog) {
            actions.setBlog(editableBlog);
            return;
        }

        const request = new Request(`${environment.baseApiUrl}${history.location.pathname.slice(1)}`, {
            method: RequestMethods.Get,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("user")}`
            },
        });
        useFetch<Blog>(request, actions.setBlog);
    }, []);

    const actions = {
        setBlog: (blog: Blog) => {
            dispatch({type: BLOG_SET_BLOG, payload: blog});
        },
    };

    return (
        <BlogContext.Provider value={{blogState: state, blogActions: actions}}>
            {children}
        </BlogContext.Provider>
    );
};

interface BlogStateProps {
    children: React.ReactNode;
}

export {BlogProvider as default, BlogContext};
