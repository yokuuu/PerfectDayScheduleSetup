'use client'

import CurrentGraphic from './CurrentGraphic'
import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { HiChartPie } from 'react-icons/hi'

export default function CurrentModal() {
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }

    return (
        <>
            <Button
                onClick={() => props.setOpenModal('dismissible')}
                className="modalButton"
            >
                <div className="header__link">
                    <HiChartPie />
                    <div className="text-[#cfcdff] header__link-text">
                        Текущий график
                    </div>
                </div>
            </Button>
            <Modal
                className="px-[25vh] py-[15vh] over-hidden"
                dismissible
                show={props.openModal === 'dismissible'}
                onClose={() => props.setOpenModal(undefined)}
                size="lg"
            >
                <Modal.Header className="bg-testBlack p-5 border-b-2 border-white">
                    <span className="text-xl text-white">Текущий график</span>
                </Modal.Header>
                <Modal.Body className="bg-testBlack back-check">
                    <div className="w-full h-[50vh] ">
                        <CurrentGraphic />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
