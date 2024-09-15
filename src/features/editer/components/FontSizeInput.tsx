import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'

interface FontSizeInputProps {
  value: number
  onChange: (value: number) => void
}

export const FontSizeInput = ({value, onChange}:FontSizeInputProps) => {
  const increment = () => onChange(value + 1)
  const decrement = () => onChange(value - 1)


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    onChange(value)
  }
   return (
     <div className={'flex items-center'}>
       <Button variant={'outline'} className={'p-2 rounded-r-none border-r-0'} size={'icon'} onClick={decrement}>
         <Minus className={'size-4'}/>
       </Button>
       <Input type={'number'} value={value} className={'w-[70px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none'} onChange={handleChange}/>
       <Button variant={'outline'} className={'p-2 rounded-l-none border-l-0'} size={'icon'} onClick={increment}>
         <Plus/>
       </Button>
     </div>
   )
}