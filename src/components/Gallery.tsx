import type SwiperCore from 'swiper'
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { setImagePreview } from "../utils/setImagePreview.js"
import { useAppDispatch, useAppSelector } from "../store/index.js"
import { resetFiles, setFiles } from "../store/reducers/filesSlice.js"
// @mui
import Button from "@mui/material/Button"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import ZoomInMapRoundedIcon from '@mui/icons-material/ZoomInMapRounded'
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'

// ----------------------------------------------------------------------

interface TabProps {
    index: number
    value: number
    swiper: SwiperCore | null
    type: 'gallery' | 'template' | 'background'
}

export const Gallery = (props: TabProps) => {
    const { value, index, swiper, type, ...other } = props

    const slideTo = (index: number) => swiper && swiper.slideTo(index)

    const files = useAppSelector(state => state.files[type])
    const dispatch = useAppDispatch()

    const [expanded, setExpanded] = useState(false)

    const onDrop = async (acceptedFiles: File[]) => {
        const filesWithPreview = await Promise.all(acceptedFiles.map(file => setImagePreview(file)))
        dispatch(setFiles({ files: filesWithPreview, type }))
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noDrag: true })

    useEffect(() => {
        const container = document.getElementById('container')

        if (expanded)
            container?.classList.add('gallery-expanded')
        else
            container?.classList.remove('gallery-expanded')

    }, [expanded])

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index &&
                <>
                    <div className="buttons">
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ClearRoundedIcon />}
                            disableElevation
                            onClick={() => dispatch(resetFiles({ type }))}
                        >
                            Очистить
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ backgroundColor: '#f2f2f2' }}
                            startIcon={<DeleteForeverRoundedIcon />}
                            disableElevation
                        >
                            Выбрать
                        </Button>
                        <Button
                            variant="text"
                            startIcon={expanded ? <ZoomInMapRoundedIcon /> : <ZoomOutMapRoundedIcon />}
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? 'Свернуть' : 'Развернуть'}
                        </Button>
                    </div>

                    <div className="image-container">

                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="add-photo"> Добавить фотографию</div>
                        </div>

                        {files.length > 0 && files.map((file, index) =>
                            <img src={file.preview} key={'gallery-img-' + index} onClick={() => slideTo(index)} />
                        )}
                    </div>
                </>}
        </div>
    )
}