import React from 'react'
import { LOADING_IMG } from '../../utils/constant'

export default function Loading():JSX.Element {
  return (
    <div className='h-screen flex justify-center items-center'>
        <img src={LOADING_IMG} alt="loading_img" width={150} height={150} />
    </div>
  )
}
