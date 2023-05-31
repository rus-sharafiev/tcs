import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { setImagePreview } from "../utils/setImagePreview.js"
import { useAppDispatch } from "../store/index.js"
import { setFiles } from "../store/reducers/filesSlice.js"
import Button from "@mui/material/Button"

import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded'
import { grey } from "@mui/material/colors"

// ----------------------------------------------------------------------

interface TabProps {
    index: number
    value: number
}

export const Gallery = (props: TabProps) => {
    const { value, index, ...other } = props

    const dispatch = useAppDispatch()

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const filesWithPreview = await Promise.all(acceptedFiles.map(file => setImagePreview(file)))
        dispatch(setFiles(filesWithPreview))

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index &&
                <div className="tab-content">
                    <div className="buttons">
                        <Button variant="contained" color="secondary" startIcon={<ClearRoundedIcon />} disableElevation>
                            Очистить
                        </Button>
                        <Button variant="contained" sx={{ backgroundColor: '#f2f2f2' }} startIcon={<DeleteForeverRoundedIcon />} disableElevation>
                            Выбрать
                        </Button>
                        <Button variant="text" startIcon={<ZoomOutMapRoundedIcon />}>
                            Развернуть
                        </Button>
                    </div>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive
                            ? <div className="drag-photo">Перетащите фотографию сюда</div>
                            : <div className="select-photo">Добавить фотографию</div>}
                    </div>
                </div>}
        </div>
    )
}