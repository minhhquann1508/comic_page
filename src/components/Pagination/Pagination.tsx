import React from 'react'
import { Pagination } from 'antd';
export default function PaginationComponent():JSX.Element {
  return (
    <div className='flex justify-center mt-10'>
        <Pagination defaultCurrent={1} pageSize={36} total={1000} showSizeChanger={false}/>
    </div>
  )
}
