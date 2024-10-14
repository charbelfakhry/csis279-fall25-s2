const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Get the Authorization header

    if (authHeader) {
        // Split the header to extract the token (Bearer <token>)
        // For example ['Bearer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...']
        const token = authHeader.split(' ')[1];

        // Verify the token using the secret key
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.redirect('/noLoginPageYet?error=Session expired, Please Log in again');
                }
                return res.redirect('/noLoginPageYet?error=Forbidden: Invalid token');
            }

            // Attach the user information to req and res.locals
            req.user = user;
            res.locals.user = user;
            next();
        });
    } else {
        // If no token was provided, redirect to the login page
        return res.redirect('/noLoginPageYet?error=Unauthorized: No token provided');
    }
};