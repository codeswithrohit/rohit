import React from 'react'

const Blog = () => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <div className=' container sm:max-w-[1200px]  py-[20px]  px-10'>
                    <h1 className='text-[#4c546c] font-bold'>From the blog</h1>

                </div>
            </div>

            <div className='flex justify-center items-center'>
                <div className='flex-wrap md:flex-nowrap container sm:max-w-[1200px]  py-[0px]  px-10 flex justify-center items-center gap-12'>
                    <div className='blog-box1 relative  w-[100%] h-[200px] rounded-md'>
                        
                        <img src='blog1.png' alt='blog img ' className='w-[100%] h-[100%] object-cover absolute rounded-md' />
                       
                        <div className='blog-box1-heading flex justify-between items-center absolute p-5'>
                            <div className='blog-box1-heading-img w-[10%] rounded-full border-[2px]'>
                                <img src='blog-img1.jpg' alt='' className='rounded-full' />
                            </div>
                            <div className='blog-box1-heading-text text-white'>
                                <span>
                                    <i className='fa-regular fa-user'></i>
                                    <span className='pl-2'>327</span>
                                </span>
                            </div>
                        </div>
                        <div className='blog-box1-text absolute bottom-0 p-5'>
                        <small className='text-[#5567ff]'>Sketch</small>
                        <p className='text-white font-bold'>Merge Duplicates Inconsistent Symbols</p>

                        </div>

                    </div>

                    <div className='blog-box1 relative  w-[100%] h-[200px] rounded-md'>
                        
                        <img src='blog1.png' alt='blog img ' className='w-[100%] h-[100%] object-cover absolute rounded-md' />
                       
                        <div className='blog-box1-heading flex justify-between items-center absolute p-5'>
                            <div className='blog-box1-heading-img w-[10%] rounded-full border-[2px]'>
                                <img src='blog-img1.jpg' alt='' className='rounded-full' />
                            </div>
                            <div className='blog-box1-heading-text text-white'>
                                <span>
                                    <i className='fa-regular fa-user'></i>
                                    <span className='pl-2'>327</span>
                                </span>
                            </div>
                        </div>
                        <div className='blog-box1-text absolute bottom-0 p-5'>
                        <small className='text-[#5567ff]'>Sketch</small>
                        <p className='text-white font-bold'>Merge Duplicates Inconsistent Symbols</p>

                        </div>

                    </div>
                    
                    
                    <div className='blog-box1 relative  w-[100%] h-[200px] rounded-md'>
                        
                        <img src='blog1.png' alt='blog img ' className='w-[100%] h-[100%] object-cover absolute rounded-md' />
                       
                        <div className='blog-box1-heading flex justify-between items-center absolute p-5'>
                            <div className='blog-box1-heading-img w-[10%] rounded-full border-[2px]'>
                                <img src='blog-img1.jpg' alt='' className='rounded-full' />
                            </div>
                            <div className='blog-box1-heading-text text-white'>
                                <span>
                                    <i className='fa-regular fa-user'></i>
                                    <span className='pl-2'>327</span>
                                </span>
                            </div>
                        </div>
                        <div className='blog-box1-text absolute bottom-0 p-5'>
                        <small className='text-[#5567ff]'>Sketch</small>
                        <p className='text-white font-bold'>Merge Duplicates Inconsistent Symbols</p>

                        </div>

                    </div>

                </div>
            </div>



        </>
    )
}

export default Blog
