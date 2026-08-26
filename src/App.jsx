import { useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  Code2,
  Database,
  Globe,
  CircleUserRound,
  Mail,
  Phone,
  MapPin,
  Menu,
  Send,
  X,
} from 'lucide-react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import './App.css'
import profileImage from './assets/profile.jpg'

const skills = [
  ['Python', 92, 'python'],
  ['SQL', 84, 'sql'],
  ['Java', 80, 'java'],
  ['HTML', 88, 'html'],
  ['CSS', 82, 'css'],
  ['Git & GitHub', 78, 'git'],
  ['VS Code', 85, 'vscode'],
  ['MS Excel', 76, 'excel'],
]

const projects = [
  { number: '01', title: 'Student Management System', tag: 'Python + SQL', description: 'A streamlined academic record system with CRUD workflows and relational data management.', icon: Database, color: 'violet', github: 'https://github.com/kuruvasivasiva1417-ops' },
  { number: '02', title: 'AI Chatbot', tag: 'Python + NLP', description: 'A conversational assistant exploring natural language processing and helpful automation.', icon: Bot, color: 'cyan', github: 'https://github.com/kuruvasivasiva1417-ops' },
  { number: '03', title: 'Face Recognition Attendance', tag: 'Python + OpenCV', description: 'An automated attendance system using computer vision to identify and log students.', icon: BarChart3, color: 'pink', github: 'https://github.com/kuruvasivasiva1417-ops' },
  { number: '04', title: 'Portfolio Website', tag: 'React + CSS', description: 'A fast, expressive portfolio designed to make technical work easy to discover.', icon: Globe, color: 'orange', github: 'https://github.com/kuruvasivasiva1417-ops' },
]

const certifications = ['Python', 'SQL', 'AI Fundamentals', 'NPTEL']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submissionState, setSubmissionState] = useState('idle')

  const closeMenu = () => setMenuOpen(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    if (!form.reportValidity()) return

    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    setSubmissionState('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const result = await response.json()

      if (!response.ok || result.success !== true) throw new Error(result.message || 'Contact request failed')

      form.reset()
      setSubmissionState('success')
    } catch {
      setSubmissionState('error')
    }
  }

  return (
    <div className="site-shell">
      <div className="topline"><span>AVAILABLE FOR OPPORTUNITIES</span><span>DATA SCIENCE / PYTHON</span></div>
      <nav className="nav wrap">
        <a className="brand" href="#home" onClick={closeMenu}><span>KS</span><strong>My Portfolio</strong></a>
        <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={closeMenu}>About</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </div>
      </nav>

      <main>
        <section className="hero wrap" id="home">
          <div className="hero-copy reveal"><p className="eyebrow"><span className="status-dot" /> Hello, I am</p><h1>Hi, I'm <em>Kuruva Siva</em> <span className="wave">👋</span></h1><p className="hero-role">4th Year Data Science <span>/</span> Aspiring Python Developer</p><p className="hero-intro">I’m a passionate Data Science student with a strong interest in Python and Data Analytics. I enjoy working with data, solving problems, and building practical projects using Python. I’m continuously learning and improving my programming and technical skills.</p><div className="hero-actions"><a className="button primary" href="#about">About Me <CircleUserRound size={17} /></a><a className="button primary" href="#projects">My Projects <Globe size={17} /></a><a className="button primary" href="#contact">Contact Me <Mail size={17} /></a></div></div>
          <div className="hero-visual reveal"><div className="photo-frame"><img className="profile-image" src={profileImage} alt="Kuruva Siva" /><div className="photo-placeholder" aria-hidden="true"><span>KS</span><small>DATA SCIENCE</small></div></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
        </section>

        <section className="marquee"><div>DATA SCIENCE <i>✦</i> PYTHON DEVELOPMENT <i>✦</i> DATA SCIENCE <i>✦</i> PYTHON DEVELOPMENT <i>✦</i></div></section>

        <section className="section wrap about-section" id="about"><div className="section-label"><span>01</span><span>ABOUT ME</span></div><div className="about-grid"><div><h2>Curious by nature.<br /><em>Builder</em> by choice.</h2></div><div><p className="large-copy">I am a passionate and motivated B.Tech student and aspiring Python Developer with a strong interest in Python programming and web development. I enjoy building practical projects that solve real-world problems and help me improve my technical skills.</p><div className="about-points"><p><Check size={16} /> Worked with Python, Flask, React, MongoDB, HTML, CSS, and JavaScript</p><p><Check size={16} /> Continuously learning new technologies and applying them through projects and internships</p><p><Check size={16} /> Goal is to start my career as a Python Developer and contribute to innovative software projects</p><p><Check size={16} /> Focused on building practical solutions and improving my technical skills</p></div><a className="button primary" href="/resume.pdf" target="_blank" rel="noreferrer">View Resume <ArrowUpRight size={17} /></a></div></div></section>

        <section className="section skills-section" id="skills"><div className="wrap"><div className="section-label"><span>02</span><span>TOOLKIT</span></div><div className="section-heading"><h2>Things I work <em>with.</em></h2><p>A growing set of tools for turning ideas into useful, reliable software.</p></div><div className="skills-grid">{skills.map(([name, value, type]) => <div className="skill-card" key={name}><div className="skill-top"><span className={`skill-icon ${type}`}>{type === 'python' ? 'Py' : type === 'sql' ? 'DB' : type === 'ds' ? '{}' : type === 'git' ? '⌘' : type === 'excel' ? 'X' : type === 'prompt' ? '✦' : type.toUpperCase()}</span><span>{name}</span><b>{value}%</b></div><div className="progress"><span style={{ width: `${value}%` }} /></div></div>)}</div></div></section>

        <section className="section projects-section wrap" id="projects"><div className="section-label"><span>03</span><span>SELECTED WORK</span></div><div className="section-heading"><h2>Projects with a <em>purpose.</em></h2><p>Academic experiments and personal builds that keep me learning.</p></div><div className="project-grid">{projects.map(({ number, title, tag, description, icon: Icon, color, github }) => <article className={`project-card ${color}`} key={title}><div className="project-art"><span className="project-number">{number}</span><Icon size={48} strokeWidth={1} /><span className="art-grid" /></div><div className="project-body"><span className="project-tag">{tag}</span><h3>{title}</h3><p>{description}</p><div className="project-links"><a href={github} target="_blank" rel="noopener noreferrer" aria-label={`View GitHub for ${title}`}>View GitHub <ArrowUpRight size={15} /></a></div></div></article>)}</div></section>

        <section className="split-section"><div className="wrap split-grid"><div className="education"><div className="section-label"><span>04</span><span>EDUCATION</span></div><h2>Learning the<br /><em>language</em> of data.</h2><div className="edu-card"><div className="edu-icon"><Code2 /></div><div><strong>B.Tech in Data Science</strong><p>Dr.K.V.Subba Reddy Institute Of Technology <span>•</span> 4th Year</p></div><span className="edu-year">2023-2027</span></div></div><div className="certifications"><div className="section-label"><span>CERTIFICATIONS</span><span>↗</span></div><div className="cert-list">{certifications.map((cert, index) => <div className="cert" key={cert}><span>0{index + 1}</span><strong>{cert}</strong><ArrowUpRight size={18} /></div>)}</div></div></div></section>

        <section className="section contact-section wrap" id="contact"><div className="section-label"><span>05</span><span>CONTACT</span></div><div className="contact-grid"><div><h2>Contact Me</h2><p className="large-copy">Have an opportunity, a question, or just want to talk data? My inbox is always open.</p><div className="contact-details"><a href="mailto:kuruvasivasiva1417@gmail.com"><Mail size={17} /> kuruvasivasiva1417@gmail.com</a><a href="tel:+918555820953"><Phone size={17} /> 8555820953</a><span><MapPin size={17} /> Andhra Pradesh, India</span></div></div><form className="contact-form" onSubmit={handleSubmit}><label>Name<input type="text" name="name" placeholder="Your name" maxLength="100" required /></label><label>Email<input type="email" name="email" placeholder="you@example.com" maxLength="254" required /></label><label>Message<textarea name="message" placeholder="Tell me a little about it..." rows="4" maxLength="5000" required /></label><button className="button primary" type="submit" disabled={submissionState === 'sending'} aria-live="polite">{submissionState === 'sending' ? 'Sending...' : submissionState === 'success' ? 'Message sent successfully!' : 'Send message'} {submissionState === 'success' ? <Check size={17} /> : <Send size={16} />}</button>{submissionState === 'error' && <p className="form-status error" role="alert">Failed to send message. Please try again.</p>}{submissionState === 'success' && <p className="form-status success" role="status">Message sent successfully!</p>}</form></div></section>
      </main>
      <footer className="footer wrap"><a className="brand" href="#home"><span>KS</span><strong>Kuruva Siva</strong></a><p>Designed &amp; built with curiosity. © {new Date().getFullYear()}</p><div className="socials"><a href="https://www.linkedin.com/in/kuruva-siva-9262402a6?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin /></a><a href="https://github.com/kuruvasivasiva1417-ops" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><FaGithub /></a><a href="mailto:kuruvasivasiva1417@gmail.com" aria-label="Email" title="Email"><FaEnvelope /></a></div></footer>
    </div>
  )
}

export default App
