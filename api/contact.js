import nodemailer from 'nodemailer'

const maxMessageLength = 5000
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const requiredSettings = ['MAIL_HOST', 'MAIL_PORT', 'MAIL_USER', 'MAIL_PASS', 'MAIL_TO']

function getMissingSettings() {
  return requiredSettings.filter((setting) => !process.env[setting])
}

function createTransporter() {
  const missingSettings = getMissingSettings()
  if (missingSettings.length > 0) {
    throw new Error(`Missing mail configuration: ${missingSettings.join(', ')}`)
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
}

function sendJson(response, status, body) {
  response.status(status).json(body)
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { success: false, message: 'Method not allowed' })
  }

  const name = typeof request.body?.name === 'string' ? request.body.name.trim() : ''
  const email = typeof request.body?.email === 'string' ? request.body.email.trim() : ''
  const message = typeof request.body?.message === 'string' ? request.body.message.trim() : ''

  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || !message || message.length > maxMessageLength) {
    return sendJson(response, 400, { success: false, message: 'Invalid contact form data' })
  }

  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      text: `New Contact Form Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return sendJson(response, 200, { success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Vercel contact email failed:', {
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
      message: error.message,
      response: error.response,
    })
    return sendJson(response, 500, { success: false, message: 'Failed to send message' })
  }
}
