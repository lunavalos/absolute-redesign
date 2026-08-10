'use client'

import React from 'react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useConfig, useAuth } from '@payloadcms/ui'

export const LogoutButton = () => {
  const { config } = useConfig()
  const { user } = useAuth()
  
  if (!user) return null

  const initial = user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'A')

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px 0 0 0',
      borderTop: '1px solid var(--theme-elevation-150)',
      marginTop: '20px'
    }}>
      {/* Logout Button */}
      <Link 
        href={`${config.routes.admin}/logout`}
        className="custom-logout-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid #ff4d4f',
          color: '#ff4d4f',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '13px',
          transition: 'all 0.2s ease',
          backgroundColor: 'transparent',
          width: '100%'
        }}
      >
        <LogOut style={{ width: '18px', height: '18px' }} />
        <span>Cerrar Sesión</span>
      </Link>

      {/* User Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
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
    </div>
  )
}
