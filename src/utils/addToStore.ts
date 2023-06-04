import { ImageFileObject, getImageObject } from "./getImageObject"

// --------------------------------------------------------------------------------

export const addToStore = async (type: 'gallery' | 'template' | 'background', files: ImageFileObject[]) => {

    const storedString = localStorage.getItem(type)
    const storedArr = storedString ? JSON.parse(storedString) : []
    localStorage.setItem(type, JSON.stringify([...storedArr, ...files]))
}

export const addSlidesToStore = async (type: 'gallery' | 'template' | 'background', files: ImageFileObject[]) => {

    const storedString = localStorage.getItem(type)
    const storedArr = storedString ? JSON.parse(storedString) : []
    localStorage.setItem(type, JSON.stringify([...storedArr, ...files]))
}