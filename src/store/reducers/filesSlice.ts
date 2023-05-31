import { createSlice } from '@reduxjs/toolkit'
import { FileWithPreview } from '../../utils/setImagePreview.js'

// --------------------------------------------------------------------------------

function getFilesFromStorage() {
    const serialized = localStorage.getItem('files')
    return serialized ? JSON.parse(serialized) as FileWithPreview[] : []
}

const initialState: {
    files: FileWithPreview[]
} = {
    files: getFilesFromStorage()
}

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload
            // localStorage.setItem('files', JSON.stringify(state.files))
        },
        resetFiles: (state) => {
            state.files = initialState.files
            localStorage.removeItem('files')
        }
    }
})

export const { setFiles, resetFiles } = filesSlice.actions

export default filesSlice.reducer