const url = 'https://api.cloudinary.com/v1_1/dcpjjrof8/image/upload'
// dcpjjrof8
// blog_preset

export const uploadImage = async (image) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "blog_preset")
    const response = await fetch(url, {
        method: "POST",
        body: data
    })

    return response.json()
}