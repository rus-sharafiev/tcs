import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { addToStore } from '../../utils/addToStore'
import { Slide } from '../../components/Slides'
import { ImageFileObject } from '../../utils/getImageObject'

// --------------------------------------------------------------------------------

const initialState: {
    gallery: ImageFileObject[],
    template: ImageFileObject[],
    background: ImageFileObject[],
    slides: Slide[]
} = {
    gallery: [],
    template: [],
    background: [],
    slides: [...Array(5).fill({ left: undefined, right: undefined })]
}

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setStoredFiles: (state, action: PayloadAction<typeof initialState>) => {
            state.gallery = action.payload.gallery
            state.template = action.payload.template
            state.background = action.payload.background
            state.slides = action.payload.slides
        },
        setFiles: (state, action: PayloadAction<{ files: ImageFileObject[], type: 'gallery' | 'template' | 'background' }>) => {
            state[action.payload.type] = [...state[action.payload.type], ...action.payload.files]
            localStorage.setItem(action.payload.type, JSON.stringify(state[action.payload.type]))
        },
        removeFile: (state, action: PayloadAction<{ index: number, type: 'gallery' | 'template' | 'background' }>) => {
            state[action.payload.type] = state[action.payload.type].filter((_, index) => index !== action.payload.index)
            localStorage.setItem(action.payload.type, JSON.stringify(state[action.payload.type]))
        },
        resetFiles: (state, action: PayloadAction<{ type: 'gallery' | 'template' | 'background' }>) => {
            state[action.payload.type] = initialState[action.payload.type]
            localStorage.removeItem(action.payload.type)
        },

        addFileToSlide: (state, action: PayloadAction<{ file: ImageFileObject, index: number, side: 'left' | 'right' }>) => {
            state.slides[action.payload.index] = { ...state.slides[action.payload.index], [action.payload.side]: action.payload.file }
            localStorage.setItem('slides', JSON.stringify(state.slides))
        },
        resetSlides: (state) => {
            state.slides = initialState.slides
            localStorage.removeItem('slides')
        },
    }
})

export const { setStoredFiles, setFiles, removeFile, resetFiles, addFileToSlide, resetSlides } = filesSlice.actions

export default filesSlice.reducer