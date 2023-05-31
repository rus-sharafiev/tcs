import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FileWithPreview } from '../../utils/setImagePreview.js'

// --------------------------------------------------------------------------------

function getFilesFromStorage() {
    const serialized = localStorage.getItem('files')
    return serialized ? JSON.parse(serialized) as FileWithPreview[] : []
}

const initialState: {
    gallery: FileWithPreview[],
    template: FileWithPreview[],
    background: FileWithPreview[]
} = {
    gallery: [],
    template: [],
    background: []
}

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<{ files: FileWithPreview[], type: 'gallery' | 'template' | 'background' }>) => {
            state[action.payload.type] = [...state[action.payload.type], ...action.payload.files]
        },
        resetFiles: (state, action: PayloadAction<{ type: 'gallery' | 'template' | 'background' }>) => {
            state[action.payload.type] = initialState[action.payload.type]
        }
    }
})

export const { setFiles, resetFiles } = filesSlice.actions

export default filesSlice.reducer