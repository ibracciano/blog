import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

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

export const getComments = async (req, res) => {
    const currentPage = parseInt(req.query.page);
    // console.log(currentPage)
    const perPage = 6
    try {
        const totalComments = await Comment.countDocuments()
        const totalPages = Math.ceil(totalComments / perPage);
        const comments = await Comment.find().sort({ creatadAt: -1 }).skip((currentPage - 1) * perPage).limit(perPage).exec();

        // pagination
        if (currentPage > totalPages) {
            return res.status(404).json({ success: false, message: "Page non trouvée" });
        }

        res.status(200).json({ success: true, data: comments, currentPage, totalPages, totalComments });
        // res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error("Erreur dans getComments", error)
        res.status(500).json({ success: false, message: "Erreur dans getComments" })
    }
}

export const likeComment = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
    }
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Commentaire non trouvé" });
        }
        const userIndex = comment.likes.indexOf(userId);
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(userId);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();

        res.status(200).json({ success: true, data: comment });
    } catch (error) {
        console.error("Erreur dans likeComment", error)
        res.status(500).json({ success: false, message: "Erreur dans likeComment" })
    }
}

export const editComment = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
    }

    try {
        const user = await User.findById(userId);
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Commentaire non trouvé" });
        }

        if (comment.userId !== userId && user.role !== "admin") {
            return res.status(404).json({ success: false, message: "Vous n'êtes pas autorisé à modifier le commentaire" });
        }

        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content,
            },
            { new: true }
        );

        await editedComment.save()

        res.status(200).json({ success: true, message: 'commentaire modifié avec succès', data: editedComment });
    } catch (error) {
        console.error("Erreur dans editComment", error)
        res.status(500).json({ success: false, message: "Erreur dans editComment" })
    }
};

export const deleteComment = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
    }
    try {
        const user = await User.findById(userId);
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Commentaire non trouvé" });
        }
        if (comment.userId !== userId && user.role !== "admin") {
            return res.status(404).json({ success: false, message: "Vous n'êtes pas autorisé à supprimer le commentaire" });
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({ success: true, message: 'commentaire supprimé avec succès' });
    } catch (error) {
        console.error("Erreur dans deleteComment", error)
        res.status(500).json({ success: false, message: "Erreur dans deleteComment" })
    }
};

