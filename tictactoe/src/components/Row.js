import React from 'react'

export default function Row({ row, rowNum, addMove }) {
    console.log({row});
  return (
      <div className='row'>
          {row.map((cell,j) => {
              return <div key = {j} className='cell' onClick={() => addMove([rowNum,j])}>{row[j]}</div>
          })}      
      </div>
  )
}
