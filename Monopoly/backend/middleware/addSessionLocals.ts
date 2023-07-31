const addSessionLocals = (request: any, _response: any, next: any) => {
    if (request.session.user !== undefined) {
        request.app.locals.user = {
            ...request.session.user,
        };
        console.log("User in session:", request.app.locals.user); // Log the user to check if it's correctly set

    }
    else {
        console.log("Session user is undefined");
    }

    next();
};

export default addSessionLocals;
