// const isAuth = (req, res, next) => {
//   if (!req.user.googleId || !req.user.isAdmin) {
//     const err = new Error('No privileges')
//     err.status = 401
//     return next(err)
//   }
//   next()
// }

// module.exports = isAuth

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('No privileges')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = isAdmin
