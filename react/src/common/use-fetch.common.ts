declare global {
    interface Response {
        message?: string | Array<string>;
    }
}

export enum RequestMethods {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Delete = 'Delete',
}

export const useFetch = async <ResponseType>(
    request: Request,
    callback: (param: ResponseType) => void,
) => {
    const response: Response = await fetch(request);
    const data = await response.json();
    if (data.statusCode === 401) {
        window.localStorage.removeItem("user");

        if (!window.location.pathname.startsWith("/auth")) {
            window.location.pathname = "/";
        }
    }

    if (data.message) {
        const messages = Array.isArray(data.message) ? data.message : [data.message];
        return messages.map(console.warn);
    }

    callback(data as ResponseType);
};
