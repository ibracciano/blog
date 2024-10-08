// en mode local
// const backendURL = "http://localhost:3000"
const backendURL = "https://blog-backend-9jwj.onrender.com"


export const api = {
    signUp: `${backendURL}/api/user/signup`,
    signIn: `${backendURL}/api/user/signin`,
    signOut: `${backendURL}/api/user/logout`,
    EmailVerify: `${backendURL}/api/user/verify-email`,
    AuthVerify: `${backendURL}/api/user/check-auth`,
    forgotPassword: `${backendURL}/api/user/forgot-password`,
    resetPassword: `${backendURL}/api/user/reset-password`,
    updateProfileUser: `${backendURL}/api/user/update-profile`,
    removeProfileUser: `${backendURL}/api/user/remove-profile`,
    addPost: `${backendURL}/api/post/add-post`,
    getPosts: `${backendURL}/api/post/get-posts`,
    getRelatedPosts: `${backendURL}/api/post/related-posts`,
    deletePost: `${backendURL}/api/post/delete-post`,
    updatePost: `${backendURL}/api/post/update-post`,
    getUsers: `${backendURL}/api/user/get-users`,
    deleteUser: `${backendURL}/api/user/delete-user`,
    addComment: `${backendURL}/api/comment/create-comment`,
    getComments: `${backendURL}/api/comment/get-comments`,
    getCommentSinglePost: `${backendURL}/api/comment/get-comments`,
    putLikeComment: `${backendURL}/api/comment/likeComment`,
    putEditComment: `${backendURL}/api/comment/editComment`,
    deleteComment: `${backendURL}/api/comment/deleteComment`,
}