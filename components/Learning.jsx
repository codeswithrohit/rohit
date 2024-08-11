import React from 'react'
const Learning = () => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <div className=' container sm:max-w-[1200px]  py-[20px]  px-10 '>
                    <h1 className='text-[#4c546c] font-bold'>Learning Paths</h1>

                </div>
            </div>
            <div className='flex justify-center items-center'>
                <div className=' container sm:max-w-[1200px]  py-[20px]  px-10 flex-wrap md:flex-nowrap flex justify-between items-center gap-3 '>
                
                <div className='flex justify-between items-center leaning-box shadow-xl px-3 w-full rounded-md'>
                        <div className='l-img w-[30px]'>
                            <img src='learning.png'alt='laerning'></img>
                        </div>
                        <div className='blog-box1-text  bottom-0 p-5 w-[80%]'>
                            <p className='text-black font-bold'>React Native</p>
                            <small className='text-[#5567ff]'>Sketch</small>


                        </div>

                        <div className='love'>
                            <i className='fa-regular fa-heart'></i>
                        </div>
                    </div>
               

                    

                    <div className='flex justify-between items-center leaning-box shadow-xl px-3 w-full rounded-md'>
                        <div className='l-img w-[30px]'>
                            <img src='learning.png'alt='laerning'></img>
                        </div>
                        <div className='blog-box1-text  bottom-0 p-5 w-[80%]'>
                            <p className='text-black font-bold'>React Native</p>
                            <small className='text-[#5567ff]'>Sketch</small>


                        </div>

                        <div className='love'>
                            <i className='fa-regular fa-heart'></i>
                        </div>
                    </div>


                    <div className='flex justify-between items-center leaning-box shadow-xl px-3 w-full rounded-md'>
                        <div className='l-img w-[30px]'>
                            <img src='learning.png'alt='laerning'></img>
                        </div>
                        <div className='blog-box1-text  bottom-0 p-5 w-[80%]'>
                            <p className='text-black font-bold'>React Native</p>
                            <small className='text-[#5567ff]'>Sketch</small>


                        </div>

                        <div className='love'>
                            <i className='fa-regular fa-heart'></i>
                        </div>
                    </div>

                    

                </div>

                
            </div>

        </>
    )
}

export default Learning
