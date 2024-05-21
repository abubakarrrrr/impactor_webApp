import React from 'react'

const Label = ({text, className}:any) => {
  return (
    <div>
      <label className={` ${className} text-primary text-[12px]`}>{text}</label>
    </div>
  )
}

export default Label
