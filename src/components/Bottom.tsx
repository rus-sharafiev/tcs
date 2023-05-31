import type SwiperCore from 'swiper'
import { useEffect, useState } from "react"
// @mui
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
// components
import { Gallery } from './Gallery'

// ----------------------------------------------------------------------

interface BottomProps {
    swiper: SwiperCore | null
    setType: React.Dispatch<React.SetStateAction<"template" | "gallery" | "background">>
}

export const Bottom: React.FC<BottomProps> = ({ swiper, setType }) => {
    const [value, setValue] = useState(0)
    const [currentTab, setCurrentTab] = useState<'gallery' | 'template' | 'background'>('gallery')

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        switch (value) {
            case 0: {
                setCurrentTab('gallery')
                setType('gallery')
                break
            }
            case 1: {
                setCurrentTab('template')
                setType('template')
                break
            }
            case 2: {
                setCurrentTab('background')
                setType('background')
                break
            }
        }

    }, [value])

    return (
        <div id="bottom">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Галерея" />
                    <Tab label="Шаблоны" />
                    <Tab label="Фон" />
                </Tabs>
            </Box>

            <Gallery value={value} index={value} swiper={swiper} type={currentTab} />
        </div>

    )
}