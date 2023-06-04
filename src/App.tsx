// main style
import './_styles/index.less'

// swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import type SwiperCore from 'swiper'
import { useEffect, useState } from "react"
// components
import { Top } from './components/Top'
import { Slides } from "./components/Slides"
import { Bottom } from './components/Bottom'
import { useAppDispatch } from './store/index'
import { setStoredFiles } from './store/reducers/filesSlice'
import { restoreFiles } from './utils/restoreFiles'

// ----------------------------------------------------------------------

export const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const [swiper, setSwiper] = useState<SwiperCore | null>(null)
    const [type, setType] = useState<'gallery' | 'template' | 'background'>('gallery')

    useEffect(() => {
        const state = restoreFiles()
        dispatch(setStoredFiles(state))
    }, [])

    return (
        <div id="container">
            <Top />
            <Slides setSwiper={setSwiper} type={type} />
            <Bottom swiper={swiper} setType={setType} />
        </div>
    )
}