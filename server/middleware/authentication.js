exports.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(404);
    res.end();
  }
};

exports.isAdmin = (req, res, next) => {
  const { user } = req;
  if (user && user.roles && user.roles.includes('admin')) {
    next();
  } else {
    res.status(404).end();
  }
};
