import type SwiperCore from 'swiper'
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useAppDispatch, useAppSelector } from "../store/index"
import { addFileToSlide, removeFile, resetFiles, resetSlides, setFiles } from "../store/reducers/filesSlice"
// @mui
import Button from "@mui/material/Button"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import ZoomInMapRoundedIcon from '@mui/icons-material/ZoomInMapRounded'
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import { ImageFileObject, getImageObject } from '../utils/getImageObject'
import IconButton from '@mui/material/IconButton'

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
    const slides = useAppSelector(state => state.files.slides)
    const dispatch = useAppDispatch()

    const [expanded, setExpanded] = useState(false)

    const onDrop = async (acceptedFiles: File[]) => {
        const filesWithPreview = await Promise.all(acceptedFiles.map(file => getImageObject(file)))
        dispatch(setFiles({ files: filesWithPreview, type }))
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, noDrag: true })

    const handleAddToSlide = (file: ImageFileObject) => {
        if (!swiper) return
        let side: 'left' | 'right' | undefined = undefined
        if (!slides[swiper.activeIndex].right) side = 'right'
        if (!slides[swiper.activeIndex].left) side = 'left'

        side && dispatch(addFileToSlide({ file, index: swiper.activeIndex, side }))
    }

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
                            onClick={() => dispatch(resetSlides())}
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
                            <div key={'gallery-img-' + index}>
                                <img src={file.data as string} onClick={() => handleAddToSlide(file)} />
                                <IconButton onClick={() => dispatch(removeFile({ index, type }))}>
                                    <ClearRoundedIcon />
                                </IconButton>
                            </div>
                        )}
                    </div>
                </>}
        </div>
    )
}