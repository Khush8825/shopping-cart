import React, {useEffect, useState} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './Banner.style.css'

const Banner = () => {
    const [carouseldata, setCarouselData] = useState("");

    const fetchData = async () => {
        const response= await fetch('http://localhost:3001/banners')
        const getJsonResponse = await response.json()
        await setCarouselData(getJsonResponse)
     }

    useEffect(()=>{
        fetchData();
    },[]);
    return (
        <div className='bannerContainer'>
        <Carousel  
        showArrows
        showThumbs={false}
        infiniteLoop
        dynamicHeight
        >
            {carouseldata && carouseldata.map(item => <div>
            <img src={item.bannerImageUrl} alt={item.bannerImageAlt}/>
            </div>)}
        </Carousel>
        </div>
    )
}

export default Banner