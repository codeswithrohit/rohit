import React from 'react'

const Hero = () => {
    return (
        <>

        
        <div className='bg-[url(https://thumbs.dreamstime.com/b/ai-machine-learning-hands-robot-human-touching-big-data-network-connection-background-science-artificial-intelligence-172987598.jpg)] bg-fixed bg-no-repeat bg-cover'>
            <div className='flex justify-center items-center'>
                <div className=' container sm:max-w-[1200px]  py-[150px]'>
                    <div className='hero px-10'>
                        <h1 className='text-white sm:text-5xl text-3xl font-bold py-2'>Learn to Code</h1>
                        <p className='text-white sm:text-2xl py-4  '>Business, Technology and Creative Skills taught by industry experts.<br /> Explore a wide range of skills with our professional tutorials.
                        </p>
                        <button className='bg-white text-black py-3 px-6 font-bold-medium text-xl rounded-md'>Browse Course</button>
                    </div>
                </div>

            </div>


         


        </div>

        <div className='flex justify-center items-center py-10 shadow-xl '>
                <div className=' container sm:max-w-[1200px]  px-10 flex justify-between items-center flex-wrap gap-y-9'>

                   {/* 1 */}
                    <div className='hero-section2-box1 flex justify-between items-center gap-6'>
                        <div className='hero-section2-box2-icon bg-[#5567ff] py-4 px-5 rounded-full '>
                            <i className='fa-brands fa-youtube text-white text-2xl'></i>
                        </div>
                        <div className='hero-section2-box2-text'>
                            <p className='text-[#4c546c] font-bold '>8,000+ Courses</p>
                            <span>Explore a wide range of skills.</span>

                        </div>

                    </div>
                    {/* 2 */}


                    <div className='hero-section2-box1 flex justify-between items-center gap-6'>
                        <div className='hero-section2-box2-icon bg-[#5567ff] py-4 px-5 rounded-full '>
                            <i className='fa-solid fa-circle-check text-white text-2xl'></i>
                        </div>
                        <div className='hero-section2-box2-text'>
                            <p className='text-[#4c546c] font-bold '>8,000+ Courses</p>
                            <span>Explore a wide range of skills.</span>

                        </div>

                    </div>

                    {/* 3 */}


                    <div className='hero-section2-box1 flex justify-between items-center gap-6'>
                        <div className='hero-section2-box2-icon bg-[#5567ff] py-4 px-5 rounded-full '>
                            <i className='fa-solid fa-clock-rotate-left text-white text-2xl'></i>
                        </div>
                        <div className='hero-section2-box2-text'>
                            <p className='text-[#4c546c] font-bold '>8,000+ Courses</p>
                            <span>Explore a wide range of skills.</span>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Hero
