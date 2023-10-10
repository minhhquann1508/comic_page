import React from 'react'
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function PaginationComponent(props:any):JSX.Element {
  const {uri,total} = props;
  const navigate = useNavigate();
  const handleChangPage = (page:number) => {
    navigate(`${uri}&page=${page}`)
  }
  return (
    <div className='flex justify-center mt-10'>
        <Pagination defaultCurrent={1} onChange={handleChangPage} pageSize={36} total={total} showSizeChanger={false}/>
    </div>
  )
}
