exports.isLoggedIn = (req, res, next) => {
    console.log('isloggedin')
    if(req.user) {
        next()
    }
    else {res.redirect('http://localhost:3000/login') }
} 

exports.isAdmin = (req, res, next) => {
    console.log('isadmin')
    console.log(req.user)
    const user = req.user[0];
    if(user && user.roles && user.roles.isAdmin) { //TODO make so that all users get a roles object
        next()
    }
    else {
        res.status(404).end()
    }
}