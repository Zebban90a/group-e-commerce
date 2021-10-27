exports.isLoggedIn = (req, res, next) => {
  // console.log('authentication.js row 2/ isloggedin / req.user below');
  // console.log(req.user);
  if (req.user) {
    console.log('next');
    next();
  } else {
    res.status(404);
    res.end();
    // res.redirect('http://localhost:3000/login');
  }
};

exports.isAdmin = (req, res, next) => {
  console.log('isadmin');
  console.log(req.user);
  const user = req.user;
  if (user && user.roles && user.roles.includes('admin')) {
    next();
  } else {
    res.status(404).end();
  }
};
