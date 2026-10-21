import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div
      className="absolute-admin-logo"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      <img
        src="/logo.png"
        alt="Absolute Group Inc."
        width={42}
        height={42}
        style={{
          width: '42px',
          height: '42px',
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          lineHeight: 1.1,
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '0.04em',
            color: 'var(--theme-elevation-1000, #ffffff)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          ABSOLUTE
        </span>
        <span
          style={{
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--theme-elevation-600, #94a3b8)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            marginTop: '2px',
          }}
        >
          Group Inc.
        </span>
      </div>
    </div>
  )
}

export default Logo
