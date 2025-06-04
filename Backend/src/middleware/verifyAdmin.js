const verifyAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).send({ message: "Access denied. Admins only." });
    }   
    next();
}
module.exports = verifyAdmin;
