import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, TextField } from '@material-ui/core';

import {Blog, CreateBlogRequest} from "../common";

export const CreateBlog: React.FC<CreateBlogProps> = ({blog, isAuthor, handleBlogSubmit}) => {
    const {register, handleSubmit, formState: {errors}, getValues} = useForm();

    return (
        <form noValidate onSubmit={handleSubmit(handleBlogSubmit)}>
            <TextField
                fullWidth
                defaultValue={blog?.title}
                margin="normal"
                autoComplete="off"
                variant="outlined"
                label="Title"
                multiline
                rowsMax={1}
                disabled={!isAuthor}
                error={!!errors.title}
                helperText={errors.title?.message}
                {...register("title", {
                    required: "Title field is required",
                    value: blog?.title || getValues("title")
                })}
            />
            <TextField
                fullWidth
                defaultValue={blog?.blog}
                margin="normal"
                autoComplete="off"
                variant="outlined"
                label="Blog"
                multiline
                rows={15}
                disabled={!isAuthor}
                error={!!errors.blog}
                helperText={errors.blog?.message}
                {...register("blog", {
                    required: "Blog field is required",
                    value: blog?.blog || getValues("blog")
                })}
            />
            <Button
                fullWidth
                size="large"
                type="submit"
                color="secondary"
                variant="contained"
                disabled={!isAuthor}
            >
                {blog?.id ? "Update Blog" : "Create Blog"}
            </Button>
        </form>
    );
};

interface CreateBlogProps {
    isAuthor: boolean;
    blog: Blog;
    handleBlogSubmit(form: CreateBlogRequest): void;
}
