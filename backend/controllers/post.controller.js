import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// console.error("Erreur dans l'ajout du post", error)
// res.status(500).json({ success: false, message: "Erreur dans l'ajout du post" })

export const addPost = async (req, res) => {
    // récupérer les données du post
    const { title, content, image, category } = req.body

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
        const newPost = new Post({ title, content, category, image, author: user._id, slug: title.split(" ").join("-") })

        // sauvegarder le nouveau post
        await newPost.save()

        // renvoyer le nouveau post
        res.status(200).json({ success: true, message: 'Post ajouté avec succès', data: newPost })

    }
    catch (error) {
        console.error("Erreur dans l'ajout du post", error)
        res.status(500).json({ success: false, message: "Erreur dans l'ajout du post" })
    }

}

export const getPosts = async (req, res) => {
    const userId = req.userId

    if (!userId) {
        return res.status(404).json({ success: false, message: "veuillez vous connecter" })
    }
    try {
        const posts = await Post.find({})
        res.status(200).json({ success: true, message: 'Posts récupérés avec succès', data: posts })
    } catch (error) {
        console.error("Erreur dans getPosts", error)
        res.status(500).json({ success: false, message: "Erreur dans getPosts" })
    }
}

export const getRelatedPosts = async (req, res) => {
    const limit = req.query.limit
    // console.log(limit)
    const exclude = req.query.exclude
    // console.log(exclude)
    try {
        const relatedPosts = await Post.find({ _id: { $ne: exclude } }).limit(limit)
        res.status(200).json({ success: true, message: 'Posts récupérés avec succès', data: relatedPosts })
    } catch (error) {
        console.error("Erreur dans getRelatedPosts", error)
        res.status(500).json({ success: false, message: "Erreur dans getRelatedPosts" })
    }
}

export const deletePost = async (req, res) => {
    const userId = req.userId
    const { idPost } = req.body
    // console.log(idPost)


    if (!userId) {
        return res.status(404).json({ success: false, message: "veuillez vous connecter" })
    }

    try {
        await Post.findByIdAndDelete(idPost)
        res.status(200).json({ success: true, message: 'Post supprimé avec succès' })
    } catch (error) {
        console.error("Erreur dans deletePost", error)
        res.status(500).json({ success: false, message: "Erreur dans deletePost" })
    }
}

export const updatePost = async (req, res) => {
    const userId = req.userId
    const post = req.body
    const { idPost } = req.params
    // console.log(idPost)


    if (!userId) {
        return res.status(404).json({ success: false, message: "veuillez vous connecter" })
    }

    try {
        await Post.findByIdAndUpdate(idPost, post, { new: true })
        res.status(200).json({ success: true, message: 'Post mis à jour avec succès' })
    } catch (error) {
        console.error("Erreur dans updatePost", error)
        res.status(500).json({ success: false, message: "Erreur dans updatePost" })
    }
}