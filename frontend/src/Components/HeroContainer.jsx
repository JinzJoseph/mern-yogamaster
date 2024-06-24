import React from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import HeroBanner from './HeroBanner'
import HeroBanner1 from './HeroBanner1'
import 'swiper/css'
import "swiper/css/effect-creative"
import {EffectCreative} from "swiper"
const HeroContainer = () => {
  return (
   <section>
    <Swiper
    grabCursor={true}
    effect={"creative"}
    creativeEffect={{
        prev:{
            shadow:true,
            translate:["-120%",0,-500]
        },next:{
            shadow:true,
            translate:["120%",0,-500]
        }
    }}
    modules={[EffectCreative]}
    className='mySwiper5'
    Loop={true}
    autoplay={
        {
            delay:250,
            disableOnInteraction:false,
        }
    }
    >
        <SwiperSlide>
            <HeroBanner/>
        </SwiperSlide>
        <SwiperSlide>
            <HeroBanner1/>
        </SwiperSlide>
    </Swiper>

   </section>
  )
}

export default HeroContainer
