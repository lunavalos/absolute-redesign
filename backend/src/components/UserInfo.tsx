'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'

export const UserInfo = () => {
  const { user } = useAuth()

  if (!user) return null

  // Get initial for avatar
  const initial = user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'A')

  return (
    <div className="custom-user-info" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      marginTop: 'auto',
      borderTop: '1px solid var(--theme-elevation-150)',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '1px solid var(--theme-elevation-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        color: 'var(--theme-elevation-800)',
      }}>
        {initial}
      </div>
      <div style={{
        fontSize: '13px',
        color: 'var(--theme-elevation-500)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {user.email}
      </div>
    </div>
  )
}
