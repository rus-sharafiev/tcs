import type SwiperCore from 'swiper'
import { useDropzone } from "react-dropzone"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
// @mui
import Modal from "@mui/material/Modal"
import IconButton from "@mui/material/IconButton"
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { addFileToSlide } from '../store/reducers/filesSlice'
import { ImageFileObject, getImageObject } from '../utils/getImageObject'
import Divider from '@mui/material/Divider'

// ----------------------------------------------------------------------

export interface SlidesProps {
    setSwiper?: React.Dispatch<React.SetStateAction<SwiperCore | null>>
    type: 'gallery' | 'template' | 'background'
}

export interface Slide {
    left: ImageFileObject | undefined
    right: ImageFileObject | undefined
}

export const Slides: React.FC<SlidesProps> = ({ setSwiper, type }) => {
    const slides = useAppSelector(state => state.files.slides)
    const dispatch = useAppDispatch()
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const [openedImage, setOpenedImage] = useState<string>()
    const [openModal, setOpenModal] = useState(false)

    const handleLeftDrop = async (acceptedFiles: File[]) => {
        const filesWithPreview = await Promise.all(acceptedFiles.map(file => getImageObject(file)))
        dispatch(addFileToSlide({ file: filesWithPreview[0], index: activeSlide, side: 'left' }))
    }

    const handleRightDrop = async (acceptedFiles: File[]) => {
        const filesWithPreview = await Promise.all(acceptedFiles.map(file => getImageObject(file)))
        dispatch(addFileToSlide({ file: filesWithPreview[0], index: activeSlide, side: 'right' }))
    }

    const handleOpenImage = (data: string) => {
        setOpenedImage(data)
        setOpenModal(true)
    }

    const left = useDropzone({ onDrop: handleLeftDrop, noClick: true })
    const right = useDropzone({ onDrop: handleRightDrop, noClick: true })

    useEffect(() => {
        setActiveSlide(0)
    }, [type])

    return (
        <div id="slider-container">
            {slides.length > 0
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
                        {slides.map((slide, index) =>
                            <SwiperSlide key={'slide-' + index} className='slide'>
                                <div className='album'>
                                    <div className='left' {...left.getRootProps()}>
                                        <div>{slide.left &&
                                            <img
                                                src={slide.left.data as string}
                                                alt={slide.left.name}
                                                onClick={() => slide.left && handleOpenImage(slide.left.data as string)}
                                            />}
                                        </div>
                                    </div>
                                    <Divider orientation="vertical" flexItem />
                                    <div className='right' {...right.getRootProps()}>
                                        <div>{slide.right &&
                                            <img
                                                src={slide.right.data as string}
                                                alt={slide.right.name}
                                                onClick={() => slide.right && handleOpenImage(slide.right.data as string)}
                                            />}
                                        </div>
                                    </div>
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

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div className='modal'>
                    {openedImage && <img src={openedImage} alt='image' />}
                </div>
            </Modal>
        </div >
    )
}