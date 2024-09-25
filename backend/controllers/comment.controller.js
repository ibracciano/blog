import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    const userId = req.userId
    if (!userId) {
        return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
    }
    try {
        // récupérer les données du commentaire
        const { postId, content } = req.body
        const comment = new Comment({
            userId: userId,
            postId: postId,
            content,
        });
        // console.log(comment)
        // sauvegarder le commentaire
        await comment.save();
        // renvoyer le commentaire
        res.status(200).json({ success: true, message: "Commentaire ajouté avec succès", data: comment });
    } catch (error) {
        console.error("Erreur dans createComment", error)
        res.status(500).json({ success: false, message: "Erreur dans createComment" })
    }
}

export const getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId: postId }).populate('userId').sort({ creatadAt: -1 });
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error("Erreur dans getCommentsByPostId", error)
        res.status(500).json({ success: false, message: "Erreur dans getCommentsByPostId" })
    }
}