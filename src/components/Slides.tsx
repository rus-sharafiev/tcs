import React, { useState } from "react"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from "../store/index.js"

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

// ----------------------------------------------------------------------

export const Slides: React.FC = () => {
    const files = useAppSelector(state => state.files.files)
    const [activeSlide, setActiveSlide] = useState<number>(0)

    console.log(files)

    return (
        <div id="slider-container">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                    prevEl: '.prev-btn',
                    nextEl: '.next-btn',
                }}
                onRealIndexChange={(element) => setActiveSlide(element.activeIndex)}
            >
                {files.map((img, index) =>
                    <SwiperSlide key={'slide-' + index}>
                        <div className="img-container">
                            <img src={img.preview} alt={img.name} />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className="navigation">
                <button
                    type="button"
                    className='prev-btn'
                    title="prev"
                >
                    <ChevronLeftRoundedIcon />
                </button>
                <span>Страница {activeSlide + 1}</span>
                <button
                    type="button"
                    className='next-btn'
                    title="next"
                >
                    <ChevronRightRoundedIcon />
                </button>
            </div>
        </div >
    )
}