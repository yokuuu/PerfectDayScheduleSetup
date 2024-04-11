'use client'
import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import CellFunction from './CalendarLogic/CellFunction'

interface Props {
    date: number
    fullDate: string
}

export default function CalendarModal({ date, fullDate }: Props) {
    const [openModal, setOpenModal] = useState<string | undefined>()
    const props = { openModal, setOpenModal }

    return (
        <>
            <Button onClick={() => props.setOpenModal('dismissible')}>
                {date}
            </Button>
            <Modal
                size={'sm'}
                className="px-[25vh] py-[15vh] over-hidden"
                dismissible
                show={props.openModal === 'dismissible'}
                onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Header className="bg-testBlack p-5 border-b-2 border-white">
                    <span className="text-xl text-white">{fullDate}</span>
                </Modal.Header>
                <Modal.Body className="back-check">
                    <div className="w-full h-[50vh] flex items-center justify-center">
                        <CellFunction date={fullDate} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
