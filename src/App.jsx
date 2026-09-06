import { useEffect, useRef, useState } from 'react'
import './hero-fix.css'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [helmetPhase, setHelmetPhase] = useState(0)
  const helmetSection = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 950)
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    }), { threshold: 0.14 })
    document.querySelectorAll('.reveal, .word').forEach((element) => reveal.observe(element))
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      const value = max ? scrollY / max : 0
      setProgress(value)
      setScrolled(scrollY > 40)
      const projects = [...document.querySelectorAll('.project')]
      setActiveProject(Math.max(0, projects.reduce((current, item, index) => item.getBoundingClientRect().top <= innerHeight * .52 ? index : current, 0)))
    }
    addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => { clearTimeout(timer); reveal.disconnect(); removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    const section = helmetSection.current
    if (!section) return
    const update = () => {
      const value = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / (section.offsetHeight - innerHeight)))
      setHelmetPhase(value < 0.34 ? 0 : value < 0.67 ? 1 : 2)
      ;['left', 'front', 'right'].forEach((name, index) => {
        const opacity = Math.max(0, 1 - Math.abs(value - index / 2) * 4)
        const image = document.querySelector(`[data-helmet="${name}"]`)
        if (image) image.style.opacity = opacity
      })
    }
    addEventListener('scroll', update, { passive: true }); update()
    return () => removeEventListener('scroll', update)
  }, [])

  const projects = [
    ['LEARNIFY', 'AI-POWERED LEARNING PLATFORM', 'An AI-driven learning platform that creates personalized learning paths based on learner profiles, career aspirations and skill requirements.', ['REACT', 'TYPESCRIPT', 'NODE.JS', 'PRISMA', 'AI APIS'], 'https://learnify-version-1.vercel.app/'],
    ['SKILLSPHERE', 'STUDENT SKILL MARKETPLACE', 'A platform designed for students to discover, offer and exchange skills while building meaningful peer-to-peer learning connections.', ['REACT', 'NEXT.JS', 'SUPABASE', 'TYPESCRIPT']],
    ['MELO', 'MODERN MUSIC EXPERIENCE', 'A visually immersive music player interface focused on atmosphere, discovery and the joy of listening.', ['REACT', 'API', 'CSS']],
    ['PORTFOLIO', 'PERSONAL DIGITAL SPACE', 'A living system for documenting experiments, ideas and the work behind them.', ['REACT', 'VITE', 'MOTION']]
  ]
  const skills = { FRONTEND: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'], BACKEND: ['Node.js', 'Express.js', 'REST APIs', 'FastAPI'], DATABASE: ['MySQL', 'PostgreSQL', 'Supabase', 'TiDB'], 'TOOLS / AI': ['Git', 'GitHub', 'Vercel', 'Render', 'Prisma', 'OpenRouter', 'Gemini APIs', 'Prompt Engineering'] }

  return (
    <>
      <div className={`loader ${loaded ? 'is-done' : ''}`}><div className="loader-inner"><div className="loader-name">SREEHARI</div><div className="loader-copy">LOADING EXPERIENCE</div><div className="loader-track"><div className="loader-bar" style={{ width: loaded ? '100%' : '65%' }} /></div></div></div>
      <div className="progress"><i style={{ height: `${progress * 100}%` }} /></div>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}><a className="brand" href="#home">SREEHARI <b>/</b> DEV</a><nav className={`nav-links ${menuOpen ? 'open' : ''}`}>{['HOME', 'ABOUT', 'WORK', 'SKILLS', 'CONTACT'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span /><span /></button></header>
      <main>
        <section className="hero" id="home"><div className="grid-bg" /><div className="floating-text floating-text-one">IDEAS INTO REALITY</div><div className="floating-text floating-text-two">/ 2026 / BUILD / SHIP</div><div className="hero-content"><div className="hero-kicker">INFORMATION TECHNOLOGY / 2026</div><h1 className="display typing-heading"><span className="line"><span>I BUILD</span></span><span className="line"><span>DIGITAL</span></span><span className="line"><span className="serif">EXPERIENCES.</span></span></h1><p className="hero-sub">I'm Sreehari, a developer focused on building modern web applications, AI-powered products and useful digital experiences.</p><div className="hero-actions"><a className="button" href="#work">VIEW MY WORK <span className="arrow">↗</span></a><a className="button" href="#contact">CONTACT ME <span className="arrow">↗</span></a></div></div><div className="hero-note"><i className="scroll-line" /> SCROLL TO EXPLORE</div></section>
        <section className="helmet-section" id="system" ref={helmetSection}><div className="helmet-sticky"><div className="grid-bg" /><div className="helmet-stage"><img data-helmet="left" src="/images/helmet-left.png" alt="Helmet character left-side view" /><img data-helmet="front" src="/images/helmet-front.png" alt="Helmet character front view" /><img data-helmet="right" src="/images/helmet-right.png" alt="Helmet character right-side view" /></div><div className="helmet-copy">{[['01 / DESIGN', 'DESIGN', 'I build interfaces people remember.'], ['02 / DEVELOP', 'DEVELOP', 'Turning ideas into functional digital products.'], ['03 / SHIP', 'SHIP', 'From concept to production.']].map(([label, title, copy], index) => <div className={`helmet-phase ${helmetPhase === index ? 'active' : ''}`} style={{ position: 'absolute', width: '40vw', opacity: helmetPhase === index ? 1 : 0, transform: `translateY(${helmetPhase === index ? 0 : 35}px)`, filter: `blur(${helmetPhase === index ? 0 : 8}px)`, transition: 'opacity .25s, transform .25s, filter .25s' }} key={title}><div className="eyebrow">{label}</div><h2>{title}</h2><p>{copy}</p></div>)}</div><aside className="helmet-side-copy"><strong>THE SYSTEM AVATAR</strong><p>A visual identity for the way I think, build and move ideas into the real world.</p><span>SCROLL / ROTATE / DISCOVER</span></aside><div className="helmet-index">{String(Math.round(progress * 100)).padStart(2, '0')} / 100</div></div></section>
        <section className="section about" id="about"><video className="about-video" autoPlay muted loop playsInline poster="/images/hero.png"><source src="/Video/hero.mp4" type="video/mp4" /></video><div className="section-tag"><span>02</span> / ABOUT</div><div className="reveal"><h2>ABOUT<br /><span className="serif">ME</span></h2></div><div className="about-copy reveal"><p>I'm Sreehari, an Information Technology student at Bannari Amman Institute of Technology who enjoys turning ideas into real products.<br /><br />My focus is web development, full-stack applications and AI-powered systems. I enjoy experimenting with new technologies, solving problems and building products that are actually useful.</p><div className="about-details"><div><span className="detail-label">BASED IN</span><span className="detail-value">SALEM, TAMIL NADU</span></div><div><span className="detail-label">CURRENTLY</span><span className="detail-value">BUILDING WITH AI</span></div></div><div className="stats"><div className="stat"><strong>02</strong><span>YEARS LEARNING &amp; BUILDING</span></div><div className="stat"><strong>08</strong><span>PROJECTS BUILT</span></div><div className="stat"><strong>∞</strong><span>IDEAS WAITING</span></div></div></div></section>
        <section className="section projects" id="work"><div className="section-tag"><span>03</span> / SELECTED WORK</div><div className="projects-intro reveal"><h2>FEATURED<br /><span className="serif">WORK</span></h2><p>A collection of experiments, products and interfaces built with intent.</p></div>{projects.map(([title, category, description, tech, link], index) => <article className={`project ${index === activeProject ? 'is-active' : ''}`} key={title}><div className="project-info"><div className="project-number">PROJECT 0{index + 1}</div><h3>{title}</h3><div className="project-category">{category}</div><p className="project-description">{description}</p><div className="tech-stack">{tech.map((item) => <span key={item}>{item}</span>)}</div><div className="project-links"><a className="text-link" href={link || '#contact'} target={link ? '_blank' : undefined} rel="noreferrer">{link ? 'LIVE PROJECT ↗' : 'VIEW DETAILS ↗'}</a></div></div></article>)}</section>
        <section className="section skills" id="skills"><div className="section-tag"><span>04</span> / SYSTEM</div><div className="reveal"><h2>MY<br /><span className="serif">STACK</span></h2></div><div className="skill-groups">{Object.entries(skills).map(([group, items]) => <div className="skill-group reveal" key={group}><h3>{group}</h3><div className="skill-list">{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></section>
        <section className="section philosophy" id="philosophy"><div className="section-tag"><span>05</span> / PHILOSOPHY</div><div className="philosophy-orbit">KEEP MOVING / KEEP MAKING</div><h2>{['THINK.', 'BUILD.', 'BREAK.', 'LEARN.', 'REPEAT.'].map((word, index) => <span className="word" style={{ '--word-index': index }} key={word}>{word}</span>)}</h2></section>
        <section className="section journey"><div className="section-tag"><span>06</span> / JOURNEY</div><h2 className="reveal">THE<br /><span className="serif">JOURNEY</span></h2><div className="timeline"><div className="timeline-progress" />{[['NOW / 2026', 'Information Technology Student', 'Bannari Amman Institute of Technology'], ['01', 'Web Development', 'Interfaces that feel clear, alive and useful.'], ['02', 'AI Product Development', 'Connecting intelligence with meaningful workflows.'], ['03', 'Full Stack Development', 'From the first screen to the data layer.'], ['04', 'Hackathons / Technical Events', 'AICTE AI Summit and beyond.']].map(([time, title, copy]) => <div className="timeline-item reveal" key={title}><time>{time}</time><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
        <section className="section building"><div className="section-tag"><span>07</span> / IN PROGRESS</div><h2 className="reveal">CURRENTLY<br /><span className="serif">BUILDING</span></h2><div className="building-feature reveal"><div className="status"><i className="status-dot" />IN DEVELOPMENT</div><h3>LEARNIFY</h3><p>Building an AI-powered personalized learning platform designed to connect learner aspirations with structured career-focused learning paths.</p><div className="building-meta"><div><span>STATUS</span><b>BUILDING</b></div><div><span>FOCUS</span><b>AI + EDUCATION</b></div><div><span>STACK</span><b>FULL STACK</b></div><div><span>VERSION</span><b>MVP</b></div></div></div></section>
        <section className="section contact" id="contact"><div className="section-tag"><span>08</span> / CONTACT</div><div className="contact-orbit">OPEN FOR GOOD WORK</div><h2 className="reveal typing-heading contact-heading">LET'S<br />BUILD<br /><span className="serif">SOMETHING.</span></h2><div className="contact-copy"><p>Have an idea, project, collaboration or opportunity?<br />Let's talk.</p><div className="contact-links"><a href="mailto:sreeharis0022@gmail.com">EMAIL ME ↗</a><a href="https://www.linkedin.com/in/sreehari-code/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://github.com/sreehari-code" target="_blank" rel="noreferrer">GITHUB ↗</a></div></div></section>
      </main><footer className="footer"><div className="footer-line">SREEHARI © 2026</div><div className="footer-line footer-center">DESIGNED &amp; BUILT BY SREEHARI</div><a className="footer-line footer-right" href="#home">BACK TO TOP ↑</a></footer>
    </>
  )
}

export default App
