import './_styles/index.less'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination';

import React, { useState } from "react"

// mui
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Button from "@mui/material/Button"
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import IconButton from "@mui/material/IconButton"
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded'
// components
import { Slides } from "./components/Slides.js"
import { Gallery } from './components/Gallery.js'

// ----------------------------------------------------------------------

export const App: React.FC = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div id="container">
            <div id="header">
                <div className="title">
                    Мой проект
                    <span>Размер: 400х280 мм (В развороте)</span>
                </div>
                <div className="btns">
                    <Button variant="contained" sx={{ backgroundColor: 'black' }} disableElevation>В корзину</Button>
                    <IconButton>
                        <MoreVertRoundedIcon />
                    </IconButton>
                </div>
            </div>
            <div id="subheader">
                <IconButton>
                    <ImportContactsRoundedIcon />
                </IconButton>
            </div>

            <Slides />

            <div id="main">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Галерея" />
                        <Tab label="Шаблоны" />
                        <Tab label="Фон" />
                    </Tabs>
                </Box>

                <Gallery value={value} index={0} />
                {/* <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel> */}
            </div>
        </div>
    )
}