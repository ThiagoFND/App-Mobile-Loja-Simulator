const jwtService = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const route = req.path
    const nonSecurityRoutes = ['/api/user', '/api/login']

    if (nonSecurityRoutes.includes(route) || route.includes('view')) {
        return next()
    }

    let token = req.headers.authorization

    if (!token) {
        res.status(401).json({ message: "Usuário não autorizado" })
        return
    }

    token = token.split(' ')[1]
    const secret = "ffhbwgifiwvgiwrowfblgwngwNGBWJFWFMFNwj2jhbfwg~WGWWWW5GE494HEG1G4WG4WG4WGWG"

    try {
        await jwtService.verify(token, secret)
        return next()

    } catch (err) {
        res.status(401).json({ message: "Usuário não autorizado" })
        return
    }
}