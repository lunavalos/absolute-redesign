import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, message, recaptchaToken } = body;

    // 1. Validar ReCAPTCHA v3 Token
    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: 'Falta la verificación de ReCAPTCHA.' },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LcnzqknAAAAAGF9JsU5aSwmS-V5Hp8QAqZeg9zA';

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: recaptchaToken,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
      console.warn('[ReCAPTCHA Failed]:', verifyData);
      return NextResponse.json(
        { success: false, error: 'Verificación anti-spam fallida. Intenta nuevamente.' },
        { status: 400 }
      );
    }

    // 2. Configurar Servidor de Correo (Microsoft 365 / SMTP)
    const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || 'contact@absolute-fi.com';
    const smtpPass = process.env.SMTP_PASS;

    // Lista de correos receptores
    const recipients = process.env.CONTACT_RECIPIENTS || 'contact@absolute-fi.com, orlando@absolute-fi.com, contacto@lunavalos.com';

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false, // TLS en puerto 587 (STARTTLS)
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: false,
        },
      });

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; color: #333; }
            .card { background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; border-top: 4px solid #0E4194; }
            h2 { color: #0E4194; margin-top: 0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
            .value { font-size: 15px; color: #111; margin-top: 4px; }
            .message-box { background: #f8fafc; border-left: 3px solid #0E4194; padding: 15px; border-radius: 6px; margin-top: 20px; }
            .footer { font-size: 11px; color: #999; text-align: center; margin-top: 25px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>🚚 Nueva Solicitud de Cotización</h2>
            <p>Se ha recibido una nueva consulta desde el formulario de contacto web:</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <div class="field">
              <div class="label">Nombre del Contacto:</div>
              <div class="value">${name}</div>
            </div>

            <div class="field">
              <div class="label">Empresa:</div>
              <div class="value">${company || 'No especificada'}</div>
            </div>

            <div class="field">
              <div class="label">Correo Electrónico:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>

            <div class="field">
              <div class="label">Teléfono:</div>
              <div class="value">${phone || 'No proporcionado'}</div>
            </div>

            <div class="field">
              <div class="label">Servicio Solicitado:</div>
              <div class="value"><strong>${service}</strong></div>
            </div>

            <div class="message-box">
              <div class="label">Mensaje / Especificaciones del Proyecto:</div>
              <div class="value" style="white-space: pre-line;">${message}</div>
            </div>

            <div class="footer">
              Enviado automáticamente desde Absolute Group Web | Verificación Anti-Spam ReCAPTCHA v3 exitosa.
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Absolute Group Web" <${smtpUser}>`,
        to: recipients,
        replyTo: email,
        subject: `Nueva Cotización Web: ${name} (${company || service})`,
        html: htmlContent,
      });

      console.log(`[SMTP Mail Sent Successfully]: Sent to ${recipients}`);
    } else {
      console.log('[SMTP Config Warning]: SMTP_PASS not set in environment. Email logged to console:');
      console.log({ name, email, phone, company, service, message, recipients });
    }

    return NextResponse.json({ success: true, message: 'Solicitud recibida exitosamente.' });
  } catch (error: any) {
    console.error('[Contact Form API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error al enviar el correo. Intenta nuevamente.' },
      { status: 500 }
    );
  }
}
