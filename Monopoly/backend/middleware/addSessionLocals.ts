const addSessionLocals = (request: any, _response: any, next: any) => {
    if (request.session.user !== undefined) {
        request.app.locals.user = {
            ...request.session.user,
        };
    }
    next();
};

export default addSessionLocals;
