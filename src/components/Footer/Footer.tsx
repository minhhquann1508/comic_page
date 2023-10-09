import React from 'react'

export default function Footer():JSX.Element {
  return (
    <footer className='flex justify-center items-center bg-gray-800 py-10'>
      <div className='flex flex-col gap-5 items-center'>
        <div>
          <h1 className='text-green-200'>Contact for work,copyright and more</h1>
          <p className='text-gray-400 text-sm text-center'>Email : <a className='hover:underline duration-150' href="">minhhquann1508@gmail.com</a></p>
        </div>
        <div>
          <p className='text-gray-400 text-sm'>Điều khoản dịch vụ</p>
          <p className='text-gray-400 text-sm'>Chính sách bảo mật</p>
        </div>
        <div>
          <p className='text-green-200 text-sm'>2023 - wibucomics</p>
        </div>
      </div>
    </footer>
  )
}
