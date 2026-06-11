import LightDarkToggle from './LightDarkToggle'
import Hamburger from '/src/assets/hamburger.svg?react'
import { type Dispatch, type SetStateAction } from 'react'

type Props = {
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function MobileHeader({setIsSidePanelOpen}: Props) {
  return (
    <div className='w-full h-16 p-4 bg-background sticky top-0 xs:hidden xs:flex-wrap flex gap-8 justify-end z-1001'>
        <LightDarkToggle/>
        <button 
            onClick={() => setIsSidePanelOpen(true)} 
            >
                <Hamburger className='size-6  ml-auto ' />
        </button>
    </div>
  )
}