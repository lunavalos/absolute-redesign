'use client';

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcnzqknAAAAAHpH33ey9DlZq6eo8FdA5bnVzN9J';

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
      container={{
        parameters: {
          badge: 'inline',
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
