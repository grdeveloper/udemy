import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {Grid} from '@material-ui/core';

import {AddBlog, Preview} from "../components";
import {AuthContext} from "../state/auth.state";
import {BlogsContext} from '../state/blogs.state';
import {DeletedBlog, environment, RequestMethods, useFetch} from "../common";

const Blogs: React.FC = () => {
    const history = useHistory();
    const {authState: {user}} = React.useContext(AuthContext);
    const {blogsState: {blogs}, blogsActions} = React.useContext(BlogsContext);

    const handleEdit = (id: string) => {
        history.push({
            pathname: `${history.location.pathname}/${id}`,
            state: {detail: blogs.find(blog => blog.id === id)}
        });
    };

    const handleAddBlog = () => {
        history.push(`${history.location.pathname}/new`);
    };

    const handleDelete = (id: string) => {
        const request = new Request(`${environment.baseApiUrl}blogs/${id}`, {
            method: RequestMethods.Delete,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("user")}`
            },
        });
        return useFetch<DeletedBlog>(request, blogsActions.updateBlogs);
    };

    return (
        <Grid>
            <AddBlog handleBlogAdd={handleAddBlog} />
            {blogs.map(blog => (
                <Preview
                    blog={blog}
                    key={blog.id}
                    currentUser={user.id}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}
        </Grid>
    );
};

export default Blogs;
