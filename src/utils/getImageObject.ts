export type ImageFileObject = {
    data: string | ArrayBuffer | URL
    mimeType: string
    name: string
}

export const getImageObject = async (file: File): Promise<ImageFileObject> => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((res, rej) => {
        reader.onload = () => {
            if (reader.result) {
                res({
                    data: reader.result,
                    mimeType: file.type,
                    name: file.name
                })
            } else {
                rej()
            }
        }
    })
}