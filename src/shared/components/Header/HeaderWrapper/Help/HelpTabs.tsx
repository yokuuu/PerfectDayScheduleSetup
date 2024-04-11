import React from 'react'
import { Tabs } from 'flowbite-react'
import { HiUserCircle } from 'react-icons/hi'
import { MdDashboard, MdAirplay } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function HelpTabs() {
    return (
        <Tabs
            className="flex items-center justify-center mr-6 mb-[3vh]"
            aria-label="Tabs with underline"
            style="underline"
        >
            <Tabs.Item active title="1-й Шаг" icon={() => <HiUserCircle />}>
                <div className="help_description w-9/12 text-white  m-auto">
                    <h2 className="text-white help__title">Регистрация!</h2>
                    Для начала пользования всеми доступными функциями сайта,
                    необходимо
                    <Link className="text-blue-600" to={'/login'}>
                        {' '}
                        войти{' '}
                    </Link>
                    в аккаунт, либо
                    <Link className="text-blue-600" to={'/registration'}>
                        {' '}
                        зарегистрировать{' '}
                    </Link>
                    его. Таким образов вам будет доступен ваш личный график!
                </div>
            </Tabs.Item>
            <Tabs.Item title="2-й Шаг" icon={() => <MdDashboard />}>
                <div className="help_description w-9/12 text-white  m-auto">
                    <h2 className="text-white  help__title">
                        Добавление графика
                    </h2>
                    Следующий шаг: кастомизация и работа с вашим личным
                    графиком. Для начала решите, что хотите в него добавить,
                    например, вам каждый день нужно делать зарядку, добавьте
                    запись в раздел Чекбокс, с названием "Зарядка", таким
                    образом вы сможете следить за тем, в какие дни вы делали
                    зарядку, а в какие нет. Или, например, вам надо читать книгу
                    от 10 до 100 страниц в день, вы можете добавить запись в
                    раздел Селект, с названием "Чтение" и с опциями "10
                    страниц", "50 страниц", "70 страниц" и т.д. Перейдите на
                    страницу
                    <Link className="text-blue-600" to={'/settings'}>
                        {' '}
                        Настройки{' '}
                    </Link>
                    и добавьте ваши первые дела!
                </div>
            </Tabs.Item>
            <Tabs.Item title="3-й Шаг" icon={() => <MdAirplay />}>
                <div className="help_description w-9/12 text-white font-bold text-4xl m-auto">
                    <h2 className="text-white  help__title">Почти Готово!</h2>
                    После двух предыдущих шагов, все дела наконец сделаны!
                    Осталось только следить за их выполнением и вносить данные в
                    каждый день, не забывайте правильно отслеживать выполнение
                    своих дел и наслаждаться результатом!
                </div>
            </Tabs.Item>
        </Tabs>
    )
}
