import Image from 'next/image'
import React from 'react'
import strive_light from "../../../public/favicon.ico"
import strive_dark from "../../../public/favicon.ico"
import Link from 'next/link'

function LogoImage() {
    return (
        <>
            <Image
                src={strive_dark}
                className='block dark:hidden'
                alt="Strive Logo"
                height={50}
                style={{
                    height: '50px',
                    margin: '',
                }}
            />  
            <Image
                src={strive_light}
                className='hidden dark:block'
                alt="Strive Logo"
                height={50}
                style={{
                    height: '50px',
                    margin: '',
                }}
            />  
        </>
    )
}

export default LogoImage