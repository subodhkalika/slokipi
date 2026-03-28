import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendBookingConfirmation({ clientEmail, clientName, hostName, eventName, date, time, duration }) {
  if (!resend) {
    console.log('[Email] Resend not configured — skipping email to', clientEmail)
    return
  }

  await resend.emails.send({
    from: 'Slokipi <onboarding@resend.dev>',
    to: clientEmail,
    subject: `Booking Confirmed: ${eventName} with ${hostName}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #4f4dcf, #7777fa); border-radius: 16px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px;">✓</span>
          </div>
          <h1 style="color: #2c3437; font-size: 24px; font-weight: 800; margin: 0;">Booking Confirmed!</h1>
        </div>

        <div style="background: #f0f4f7; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <p style="color: #596064; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Session</p>
          <p style="color: #2c3437; font-size: 18px; font-weight: 700; margin: 0 0 16px;">${eventName}</p>

          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <div>
              <p style="color: #596064; font-size: 12px; margin: 0 0 2px;">Date</p>
              <p style="color: #2c3437; font-size: 14px; font-weight: 600; margin: 0;">${date}</p>
            </div>
            <div>
              <p style="color: #596064; font-size: 12px; margin: 0 0 2px;">Time</p>
              <p style="color: #2c3437; font-size: 14px; font-weight: 600; margin: 0;">${time}</p>
            </div>
            <div>
              <p style="color: #596064; font-size: 12px; margin: 0 0 2px;">Duration</p>
              <p style="color: #2c3437; font-size: 14px; font-weight: 600; margin: 0;">${duration} min</p>
            </div>
          </div>
        </div>

        <p style="color: #596064; font-size: 14px; line-height: 1.6;">
          Hi ${clientName}, your session with <strong>${hostName}</strong> is confirmed.
          You'll receive a calendar invite with the meeting link shortly.
        </p>

        <p style="color: #acb3b7; font-size: 12px; margin-top: 32px; text-align: center;">
          Scheduled with <a href="https://slokipi.com" style="color: #4f4dcf; text-decoration: none;">Slokipi</a>
        </p>
      </div>
    `,
  })
}

export async function sendBookingCancellation({ clientEmail, clientName, hostName, eventName, date, time }) {
  if (!resend) {
    console.log('[Email] Resend not configured — skipping cancellation email to', clientEmail)
    return
  }

  await resend.emails.send({
    from: 'Slokipi <onboarding@resend.dev>',
    to: clientEmail,
    subject: `Booking Cancelled: ${eventName} with ${hostName}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #2c3437; font-size: 24px; font-weight: 800; text-align: center;">Booking Cancelled</h1>
        <p style="color: #596064; font-size: 14px; line-height: 1.6; text-align: center;">
          Hi ${clientName}, your <strong>${eventName}</strong> with ${hostName} on ${date} at ${time} has been cancelled.
        </p>
        <p style="color: #acb3b7; font-size: 12px; margin-top: 32px; text-align: center;">
          <a href="https://slokipi.com" style="color: #4f4dcf; text-decoration: none;">Slokipi</a>
        </p>
      </div>
    `,
  })
}
