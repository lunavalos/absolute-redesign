import React from 'react'

export const Icon: React.FC = () => {
  return (
    <img
      src="/icon.png"
      alt="Absolute Group Inc."
      width={28}
      height={28}
      style={{
        width: '28px',
        height: '28px',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}

export default Icon
