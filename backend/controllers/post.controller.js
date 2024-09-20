import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const addPost = async (req, res) => {
    // récupérer les données du post
    const { title, content } = req.body

    try {
        // verifier si l'utilisateur connecté est admin
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({ success: false, message: 'veuillez vous connecter' })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({ success: false, message: 'Utilisateur non authentifié' })
        }

        if (user.role === 'user') {
            return res.status(403).json({ success: false, message: 'vous devez être administrateur pour ajouter un post' })
        }

        // créer un nouveau post
        const newPost = new Post({ title, content, slug: title.split(" ").join("-") })

        // sauvegarder le nouveau post
        await newPost.save()

        // renvoyer le nouveau post
        res.status(200).json({ success: true, message: 'Post ajouté avec succès', post: newPost })

    }
    catch (error) {
        console.error("Erreur dans l'ajout du post", error)
        res.status(500).json({ success: false, message: "Erreur dans l'ajout du post" })
    }

}