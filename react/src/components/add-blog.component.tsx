import * as React from 'react';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const AddBlog: React.FC<AddBlogProps> = ({handleBlogAdd}) => {
    return (
        <IconButton color="secondary" onClick={handleBlogAdd}>
            <AddCircleIcon fontSize="large" />
        </IconButton>
    );
};

interface AddBlogProps {
    handleBlogAdd(): void;
}
