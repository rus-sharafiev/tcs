import { Slide } from "../components/Slides"
import { ImageFileObject } from "./getImageObject"

// --------------------------------------------------------------------------------

export type RestoredFiles = {
    gallery: ImageFileObject[]
    template: ImageFileObject[]
    background: ImageFileObject[]
    slides: Slide[]
}

export const restoreFilesByType = (type: 'gallery' | 'template' | 'background' | 'slides') => {
    const storedFiles = localStorage.getItem(type)

    let storedArr: unknown
    storedFiles
        ? storedArr = JSON.parse(storedFiles)
        : storedArr = type === 'slides'
            ? [...Array(5).fill({ left: undefined, right: undefined })]
            : []

    return storedArr
}

export const restoreFiles = () => {
    const gallery = restoreFilesByType('gallery') as ImageFileObject[]
    const template = restoreFilesByType('template') as ImageFileObject[]
    const background = restoreFilesByType('background') as ImageFileObject[]
    const slides = restoreFilesByType('slides') as Slide[]

    return {
        gallery,
        template,
        background,
        slides
    }
}