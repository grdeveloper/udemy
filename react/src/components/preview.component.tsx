import * as React from 'react';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import {Blog, environment} from "../common";

export const Preview: React.FC<PreviewProps> = ({blog, currentUser, handleEdit, handleDelete}) => {
    return (
        <Box mt={3} mb={3} p="20px" height="240px" className="card">
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={3}>
                    {blog.imageUrl && <img
                        alt="avatar"
                        height={200}
                        width={300}
                        style={{objectFit: 'cover'}}
                        src={`${environment.baseFileUrl}${blog.imageUrl}`}
                    />}
                </Grid>
                <Grid container item xs={7} direction="column" alignItems="center">
                    <Typography variant="subtitle1">{blog.title}</Typography>
                    <Typography variant="h4">{blog.blog}</Typography>
                    <Typography variant="subtitle2">{blog.user.username}</Typography>
                </Grid>
                <Grid container item xs={1} direction="column" alignItems="center">
                    <IconButton color="primary" onClick={() => handleEdit(blog.id)}>
                        <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton color="secondary" disabled={currentUser !== blog.user.id} onClick={() => handleDelete(blog.id)}>
                        <DeleteOutlineIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

interface PreviewProps {
    blog: Blog;
    currentUser: string;
    handleEdit(id: string): void;
    handleDelete(id: string): void;
}
