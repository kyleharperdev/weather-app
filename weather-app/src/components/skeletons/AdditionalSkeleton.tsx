import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'


export default function AdditionalSkeleton({}) {
  return (
        <Card title='Additional Weather Info' ChildrenClassName='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {Array.from({length: 6}).map((_, index) => (
                <div className='flex justify-between' key={index}>
                    <div className='flex gap-4'>
                        <Skeleton className='h-8 w-20'/>
                        <Skeleton className='size-8 rounded-full'/>
                    </div>
                    <span className='uppercase'>
                        <Skeleton className='size-8'/>
                    </span>
                </div>
            ))}
        </Card>
  )
}