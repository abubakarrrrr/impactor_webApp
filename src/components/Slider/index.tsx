import React from 'react'

import Slider from 'react-slick'
import ImageComponent from '../ImageComponent';
import Button from '../button';

const Slider_component = ({images}:any) => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: true,       
    autoplaySpeed: 3000,    


        };

  return (
    <div className=' w-full'>
        <Slider  {...settings} >

        {
            images.map((val, index)=>{
                return <div key={index} className=' relative shadow w-full h-full rounded-5xl '>
                   <ImageComponent  img={val}  className=" h-full object-cover shadow rounded rounded-4xl" />
                   <Button text="Donate Now" classname=" absolute bottom-5 right-10 text-danger px-3 py-2 font-bold bg-[#F0F1F2]" />
                </div>
            })
        }

</Slider>
    
      
    </div>
  )
}

export default Slider_component
