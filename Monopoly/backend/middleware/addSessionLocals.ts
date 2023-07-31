const addSessionLocals = (request: any, _response: any, next: any) => {
    console.log("session value in addSessionLocals:", request.session);
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
