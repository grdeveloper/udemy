import * as React from 'react';

import {Action, Blog, DeletedBlog, environment, RequestMethods, useFetch} from "../common";

const BLOGS_SET_BLOGS = 'blogs@SET_BLOGS';
const BLOGS_UPDATE_BLOGS = 'blogs@UPDATE_BLOGS';

interface BlogsState {
    blogs: Array<Blog>;
}

const initialState: BlogsState = {
    blogs: [],
};

const blogsReducer = (state: BlogsState = initialState, {type, payload}: Action) => {
    if (type === BLOGS_SET_BLOGS) {
        return {...state, blogs: payload};
    }

    if (type === BLOGS_UPDATE_BLOGS) {
        return {...state, blogs: state.blogs.filter(blog => blog.id !== payload.id)};
    }

    return state;
};

const BlogsContext = React.createContext({
    blogsState: initialState,
    blogsActions: {
        setBlogs: (blogs: Array<Blog>) => undefined,
        updateBlogs: (deletedBlog: DeletedBlog) => undefined,
    },
});

const BlogsProvider: React.FC<BlogsStateProps> = ({children}) => {
    const [state, dispatch] = React.useReducer(blogsReducer, initialState);

    React.useEffect(() => {
        const request = new Request(`${environment.baseApiUrl}blogs`, {
            method: RequestMethods.Get,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("user")}`
            },
        });
        useFetch<Array<Blog>>(request, actions.setBlogs);
    }, []);

    const actions = {
        setBlogs(blogs: Array<Blog>) {
            dispatch({type: BLOGS_SET_BLOGS, payload: blogs});
        },
        updateBlogs(deletedBlog: DeletedBlog) {
            dispatch({type: BLOGS_UPDATE_BLOGS, payload: deletedBlog});
        }
    };

    return (
        <BlogsContext.Provider value={{blogsState: state, blogsActions: actions}}>
            {children}
        </BlogsContext.Provider>
    );
};

interface BlogsStateProps {
    children: React.ReactNode;
}

export {BlogsProvider as default, BlogsContext};
