import { useState } from "react"
// @mui
import Modal from '@mui/material/Modal'
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded'

// ----------------------------------------------------------------------

export const Top: React.FC = () => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div id="header">
                <div className="title">
                    Мой проект
                    <span>Размер: 400х280 мм (В развороте)</span>
                </div>
                <div className="btns">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'black' }}
                        disableElevation
                        onClick={() => setOpenModal(true)}
                    >
                        В корзину
                    </Button>
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


            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div className='modal'>
                    <div>Продукт успешно добавлен в корзину</div>
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: 'black' }}
                        disableElevation
                    >
                        Перейти в корзину
                    </Button>
                </div>
            </Modal>
        </>
    )
}