import jwt from 'jsonwebtoken'

// ce middleware permet de verifier s'il existe un token afin de verifier l'utilisateur connecté
export const verifyToken = (req, res, next) => {
    try {
        // recuperer le token
        const token = req.cookies.token
        // console.log(token)

        // si le token est vide, renvoyer une erreur
        if (!token) return res.status(401).json({ succes: false, message: 'Token non fourni' });

        // décoder le token pour vérifier la validité
        // décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)


        // vérifier si le token est valide et si il est expiré
        if (!decoded) return res.status(401).json({ succes: false, message: 'Token a expiré' });


        // si le token est valide, passer à la prochaine étape
        req.userId = decoded.userId;

        next();
    } catch (error) {
        // si le token est invalide, renvoyer une erreur
        console.error("Erreur dans la vérification du token", error);
        return res.status(401).json({ succes: false, message: 'Token invalide' });
    }


}