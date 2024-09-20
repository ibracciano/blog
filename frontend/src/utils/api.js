const backendURL = "http://localhost:3000"

export const api = {
    signUp: `${backendURL}/api/user/signup`,
    signIn: `${backendURL}/api/user/signin`,
    signOut: `${backendURL}/api/user/logout`,
    EmailVerify: `${backendURL}/api/user/verify-email`,
    AuthVerify: `${backendURL}/api/user/check-auth`,
    updateProfileUser: `${backendURL}/api/user/update-profile`,
    removeProfileUser: `${backendURL}/api/user/remove-profile`,
    addPost: `${backendURL}/api/post/add-post`
}