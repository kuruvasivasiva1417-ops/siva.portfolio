import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
const port = Number(process.env.PORT || 3001)
const maxMessageLength = 5000
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const requiredSettings = ['MAIL_HOST', 'MAIL_PORT', 'MAIL_USER', 'MAIL_PASS', 'MAIL_TO']
const requestCounts = new Map()

app.use(express.json({ limit: '12kb' }))

function isRateLimited(ip) {
  const now = Date.now()
  const recentRequests = (requestCounts.get(ip) || []).filter((timestamp) => now - timestamp < 60_000)
  recentRequests.push(now)
  requestCounts.set(ip, recentRequests)
  return recentRequests.length > 5
}

function createTransporter() {
  const missingSettings = requiredSettings.filter((setting) => !process.env[setting])

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

function logEnvironmentStatus() {
  console.log('Mail configuration:')
  for (const setting of requiredSettings) {
    console.log(`${setting}: ${process.env[setting] ? 'configured' : 'missing'}`)
  }
}

async function verifyMailConnection() {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log('SMTP connection verified')
  } catch (error) {
    console.error('SMTP connection failed:', {
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
      message: error.message,
      response: error.response,
    })
  }
}

app.post('/api/contact', async (request, response) => {
  if (isRateLimited(request.ip)) {
    return response.status(429).json({ error: 'Too many requests' })
  }

  const name = typeof request.body?.name === 'string' ? request.body.name.trim() : ''
  const email = typeof request.body?.email === 'string' ? request.body.email.trim() : ''
  const message = typeof request.body?.message === 'string' ? request.body.message.trim() : ''

  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || !message || message.length > maxMessageLength) {
    return response.status(400).json({ error: 'Invalid contact form data' })
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

    return response.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact email failed:', {
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
      message: error.message,
      response: error.response,
    })
    return response.status(500).json({ error: 'Unable to send message' })
  }
})

app.use((_request, response) => response.status(404).json({ error: 'Not found' }))

app.listen(port, () => {
  console.log(`Contact API listening on port ${port}`)
  logEnvironmentStatus()
  void verifyMailConnection()
})
