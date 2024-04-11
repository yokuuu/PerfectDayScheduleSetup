'use client'

import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import HelpTabs from './HelpTabs'
import { HiAcademicCap } from 'react-icons/hi'

export default function HelpModal() {
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }

    return (
        <>
            <Button
                onClick={() => props.setOpenModal('dismissible')}
                className="modalButton"
            >
                <div className="header__link">
                    <HiAcademicCap />
                    <div className="text-[#cfcdff] header__link-text">
                        Помощь
                    </div>
                </div>
            </Button>
            <Modal
                className="px-[25vh] py-[15vh] over-hidden"
                dismissible
                show={props.openModal === 'dismissible'}
                onClose={() => props.setOpenModal(undefined)}
                size="sm"
            >
                <Modal.Header className="bg-testBlack p-5 border-b-2 border-white">
                    <span className="text-xl text-white">Помощь</span>
                </Modal.Header>
                <Modal.Body className="bg-testBlack back-check overflow-y-scroll">
                    <div className="w-full h-[50vh] tabs">
                        <HelpTabs />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
