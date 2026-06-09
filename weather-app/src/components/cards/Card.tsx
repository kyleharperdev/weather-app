import clsx from 'clsx'
import { type ReactNode } from 'react'

type Props = {
    children: ReactNode
    title: string
    ChildrenClassName?: string
}

export default function Card({children, title, ChildrenClassName}: Props) {
  return (
    <div className='p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <div className={clsx(ChildrenClassName, "animate-[fade-in_1s_ease-out_forwards]")}>{children}</div>
    </div>
  )
}