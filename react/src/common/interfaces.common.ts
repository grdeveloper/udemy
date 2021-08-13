export interface Action {
    type: string;
    payload: any;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
}

export interface Blog {
    id: string;
    user: User;
    blog: string;
    title: string;
    userId: string;
    imageUrl: string;
}

export interface DeletedBlog {
    id: string;
}

export interface CreateBlogRequest {
    title: string;
    blog: string;
}
