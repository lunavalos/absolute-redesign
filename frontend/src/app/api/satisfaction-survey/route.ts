import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      company,
      assistedBy,
      serviceSatisfaction,
      expectationsMet,
      supportQuality,
      futureUse,
      recommendation,
      feedback,
      recaptchaToken,
    } = body;

    if (!fullName || !serviceSatisfaction || !expectationsMet || !supportQuality || !futureUse || !recommendation) {
      return NextResponse.json(
        { success: false, error: 'Por favor completa todos los campos requeridos.' },
        { status: 400 }
      );
    }

    // 1. Validar ReCAPTCHA v3 si se proporciona el token
    if (recaptchaToken) {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LcnzqknAAAAAGF9JsU5aSwmS-V5Hp8QAqZeg9zA';
      try {
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
          console.warn('[Satisfaction Survey ReCAPTCHA Failed]:', verifyData);
          return NextResponse.json(
            { success: false, error: 'Verificación anti-spam fallida. Intenta nuevamente.' },
            { status: 400 }
          );
        }
      } catch (recaptchaErr) {
        console.warn('[ReCAPTCHA Verification Error]:', recaptchaErr);
      }
    }

    // 2. Guardar en Payload CMS
    const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
    let savedInPayload = false;
    try {
      const payloadRes = await fetch(`${payloadUrl}/api/satisfaction-surveys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          company: company || '',
          assistedBy: assistedBy || '',
          serviceSatisfaction,
          expectationsMet,
          supportQuality,
          futureUse,
          recommendation,
          feedback: feedback || '',
        }),
      });

      if (payloadRes.ok) {
        savedInPayload = true;
      } else {
        const errorText = await payloadRes.text();
        console.error('[Payload Save Error]:', payloadRes.status, errorText);
      }
    } catch (payloadErr) {
      console.error('[Payload Connection Error]:', payloadErr);
    }

    // 3. Enviar notificación por correo vía SMTP (Brevo)
    const smtpHost = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    const recipients = process.env.CONTACT_RECIPIENTS || 'contact@absolute-fi.com, orlando@absolute-fi.com, contacto@lunavalos.com';

    if (smtpPass && smtpUser) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 24px; color: #1e293b; margin: 0; }
              .card { background: #ffffff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); max-width: 620px; margin: 0 auto; border-top: 5px solid #0E4194; }
              h2 { color: #0E4194; margin-top: 0; margin-bottom: 8px; font-size: 22px; }
              .subtitle { color: #64748b; font-size: 14px; margin-bottom: 24px; }
              .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
              .table td { padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; vertical-align: top; }
              .table td.label { font-weight: 600; color: #475569; width: 42%; background-color: #f8fafc; border-radius: 6px 0 0 6px; }
              .table td.value { color: #0f172a; font-weight: 500; }
              .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; background-color: #dbeafe; color: #1e40af; }
              .highlight-box { background: #f8fafc; border-left: 4px solid #0E4194; padding: 16px; border-radius: 8px; margin-top: 24px; }
              .footer { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 28px; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>⭐ Nueva Encuesta de Satisfacción</h2>
              <div class="subtitle">Un cliente ha completado el cuestionario de satisfacción desde el código QR / enlace web:</div>
              
              <table class="table">
                <tr>
                  <td class="label">Nombre del Cliente:</td>
                  <td class="value"><strong>${fullName}</strong></td>
                </tr>
                <tr>
                  <td class="label">Empresa:</td>
                  <td class="value">${company || 'No especificada'}</td>
                </tr>
                <tr>
                  <td class="label">Asesor que lo asistió:</td>
                  <td class="value"><span class="badge">${assistedBy || 'No especificado'}</span></td>
                </tr>
                <tr>
                  <td class="label">Satisfacción con el servicio:</td>
                  <td class="value"><strong>${serviceSatisfaction}</strong></td>
                </tr>
                <tr>
                  <td class="label">Cumplimiento de expectativas:</td>
                  <td class="value">${expectationsMet}</td>
                </tr>
                <tr>
                  <td class="label">Soporte y atención recibido:</td>
                  <td class="value">${supportQuality}</td>
                </tr>
                <tr>
                  <td class="label">¿Usaría los servicios de nuevo?:</td>
                  <td class="value">${futureUse}</td>
                </tr>
                <tr>
                  <td class="label">¿Recomendaría Absolute?:</td>
                  <td class="value"><strong>${recommendation}</strong></td>
                </tr>
              </table>

              ${feedback ? `
                <div class="highlight-box">
                  <div style="font-weight: bold; color: #0E4194; font-size: 12px; text-transform: uppercase; margin-bottom: 6px;">Sugerencias / Comentarios:</div>
                  <div style="font-size: 14px; color: #334155; white-space: pre-line;">${feedback}</div>
                </div>
              ` : ''}

              <div class="footer">
                Enviado automáticamente desde Absolute Group Web | Registrado en Payload CMS: ${savedInPayload ? 'Sí' : 'Pendiente'}.
              </div>
            </div>
          </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"Absolute Group Feedback" <${smtpFrom}>`,
          to: recipients,
          subject: `⭐ Encuesta de Satisfacción: ${fullName} (${company || assistedBy || 'Cliente'})`,
          html: htmlContent,
        });

        console.log(`[Survey Email Sent]: Sent to ${recipients}`);
      } catch (mailErr) {
        console.error('[Survey Mail Error]:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Encuesta enviada exitosamente.',
      savedInPayload,
    });
  } catch (error: any) {
    console.error('[Survey API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error al procesar la encuesta.' },
      { status: 500 }
    );
  }
}
