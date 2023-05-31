export type FileWithPreview = File & { preview: string }

/**
 * Function that added `preview` property to `File` object
 * 
 * @param file `File` object
 * @returns the same file with `FileReader.result` in `preview`
 * 
 * @example 
 * ```` ts
 *  <input 
 *      type="file" 
 *      multiple
 *      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
 *           e.target.files && Promise.all(Array.from(e.target.files)
 *               .map(file => setImagePreview(file)))
 *               .then(images => setFieldValue('images', images))
 *       }}
 *  />
 * ````
 */
export const setImagePreview = async (file: File): Promise<FileWithPreview> => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((res, rej) => {
        reader.onload = () => {
            if (reader.result) {
                Object.defineProperty(file, 'preview', {
                    value: reader.result,
                    writable: false
                })
                res(file as FileWithPreview)
            } else {
                rej()
            }
        }
    })
}