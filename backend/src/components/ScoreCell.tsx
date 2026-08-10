import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

export const ScoreCell: React.FC<DefaultCellComponentProps<number>> = ({ cellData }) => {
  if (typeof cellData !== 'number') return <span>-</span>

  let bgColor = 'transparent'
  let textColor = '#000'

  if (cellData >= 80) {
    bgColor = '#e6f4ea' // Green bg
    textColor = '#137333' // Green text
  } else if (cellData >= 50) {
    bgColor = '#fef7e0' // Yellow bg
    textColor = '#b06000' // Yellow text
  } else {
    bgColor = '#fce8e6' // Red bg
    textColor = '#c5221f' // Red text
  }

  return (
    <div
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '16px',
        backgroundColor: bgColor,
        color: textColor,
        fontWeight: 'bold',
        fontSize: '0.85rem',
      }}
    >
      {cellData}%
    </div>
  )
}
