import type SwiperCore from 'swiper'
import { useDropzone } from "react-dropzone"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useEffect, useState } from "react"
import { setFiles } from "../store/reducers/filesSlice"
import { useAppDispatch, useAppSelector } from "../store"
import { setImagePreview } from "../utils/setImagePreview"
// @mui
import Modal from "@mui/material/Modal"
import IconButton from "@mui/material/IconButton"
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

// ----------------------------------------------------------------------

interface SlidesProps {
    setSwiper?: React.Dispatch<React.SetStateAction<SwiperCore | null>>
    type: 'gallery' | 'template' | 'background'
}

export const Slides: React.FC<SlidesProps> = ({ setSwiper, type }) => {
    const files = useAppSelector(state => state.files[type])
    const dispatch = useAppDispatch()
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const [openModal, setOpenModal] = useState(false)

    const onDrop = async (acceptedFiles: File[]) => {
        const filesWithPreview = await Promise.all(acceptedFiles.map(file => setImagePreview(file)))
        dispatch(setFiles({ files: filesWithPreview, type }))
    }

    const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop, noClick: true })

    useEffect(() => {
        setActiveSlide(0)
    }, [type])

    return (
        <div id="slider-container" {...getRootProps()}>
            {files.length > 0
                ? <>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        onSwiper={setSwiper}
                        navigation={{
                            prevEl: '.prev-btn',
                            nextEl: '.next-btn',
                        }}
                        onRealIndexChange={(element) => setActiveSlide(element.activeIndex)}
                    >
                        {files.map((img, index) =>
                            <SwiperSlide key={'slide-' + index}>
                                <div className="img-container" onClick={() => setOpenModal(true)}>
                                    <img src={img.preview} alt={img.name} />
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <div className="navigation">
                        <IconButton className='prev-btn'>
                            <ChevronLeftRoundedIcon />
                        </IconButton>
                        <span>Страница {activeSlide + 1}</span>
                        <IconButton className='next-btn'>
                            <ChevronRightRoundedIcon />
                        </IconButton>
                    </div>
                </>
                :
                <div className="placeholder">Довавьте фото</div>}
            <input {...getInputProps()} />
            {isDragActive && <div className="drag-photo">Перетащите фотографии сюда</div>}

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div className='modal'>
                    {files.length > 0 && files[activeSlide] && <img src={files[activeSlide].preview} alt='image' />}
                </div>
            </Modal>
        </div >
    )
}