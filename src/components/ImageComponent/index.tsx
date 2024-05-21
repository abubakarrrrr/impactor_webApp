import React from 'react'

const ImageComponent = ({img, className}) => {
  return (
    <div>
      <img src={img} alt="img" className={className}  />
    </div>
  )
}

export default ImageComponent
