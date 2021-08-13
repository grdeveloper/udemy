import * as React from 'react';
import {Box, Grid} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import {AuthContext} from "../state/auth.state";
import {BlogContext} from '../state/blog.state';
import {CreateBlog, ProcessImage} from '../components';
import {Blog, CreateBlogRequest, environment, RequestMethods, useFetch} from "../common";

const Blog: React.FC = () => {
    const history = useHistory();
    const uploadImageRef = React.useRef<File>(null);
    const {authState: {user}} = React.useContext(AuthContext);
    const {blogState: {blog}} = React.useContext(BlogContext);
    const isAuthor = history.location.pathname.endsWith("new") || user.id === blog?.user?.id;

    const handleFileUpload = (file: File) => {
        uploadImageRef.current = file;
    };

    const handleBlogSubmit = (form: CreateBlogRequest) => {
        const formData: FormData = new FormData();
        formData.append("title", form.title);
        formData.append("blog", form.blog);
        formData.append("imageUrl", uploadImageRef.current);

        if (!blog?.id) {
            const request = new Request(`${environment.baseApiUrl}blogs`, {
                method: RequestMethods.Post,
                headers: {'Authorization': `Bearer ${window.localStorage.getItem("user")}`},
                body: formData
            });
            return useFetch<Blog>(request, () => history.push("/blogs"));
        }

        const request = new Request(`${environment.baseApiUrl}blogs/${blog.id}`, {
            method: RequestMethods.Put,
            headers: {'Authorization': `Bearer ${window.localStorage.getItem("user")}`},
            body: formData
        });
        return useFetch<Blog>(request, () => history.push("/blogs"));
    }

    return (
        <Box height="540px" p="20px" mt={15} className="card">
            <Grid container direction="row" justify="space-between">
                <Grid item xs={5} className="relative">
                    <ProcessImage isAuthor={isAuthor} image={blog?.imageUrl} handleUpload={handleFileUpload} />
                </Grid>
                <Grid item xs={5}>
                    <CreateBlog isAuthor={isAuthor} blog={blog} handleBlogSubmit={handleBlogSubmit} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Blog;
