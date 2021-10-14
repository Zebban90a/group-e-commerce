exports.isLoggedIn = (req, res, next) => {
    console.log('isloggedin')
    if(req.user) {
        next()
    }
    else {res.redirect('http://localhost:3000/login') }
} 

exports.isAdmin = (req, res, next) => {
    console.log('isadmin')
    if(req.user || req.user) {
        next()
    }
    else {res.redirect('http://localhost:3000/login') }
} 