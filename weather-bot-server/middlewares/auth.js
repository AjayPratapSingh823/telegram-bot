module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('http://localhost:3000/login');
    }
};
