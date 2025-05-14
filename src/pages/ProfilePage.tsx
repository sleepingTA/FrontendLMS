import React, { useState } from 'react'
import Sidebar from '../components/ui/Sidebar';
import ProfileEdit from '../components/ui/ProfileEdit';
import SecurityEdit from '../components/ui/Security';
import Photo from '../components/ui/Photo';

export default function Profile() {
    const [toggleState, setToggleState] = useState<number>(1);

    return (
        <div className="max-w-7xl mx-auto p-6 flex gap-8">
            {/* sidebar bên trái */}
            <Sidebar toggleState={toggleState} setToggleState={setToggleState}/>
            {/* main bên phải */}
            <div className='flex-1'>
                {toggleState === 1 && <ProfileEdit />}
                {toggleState === 2 && <SecurityEdit />}
                {toggleState === 3 && <Photo />}
            </div>
        </div>
    )
}
