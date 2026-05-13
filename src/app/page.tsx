"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScrollText, 
  Hourglass, 
  Hammer, 
  Compass, 
  MapPin, 
  BriefcaseMedical, 
  Syringe, 
  BookOpen, 
  Headphones, 
  BellRing, 
  MailQuestion,
  User,
  Quote,
  Lightbulb,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { SECTIONS_DATA } from './data';

export default function Home() {
  const [activeReto, setActiveReto] = useState(false);
  const [softSkillStep, setSoftSkillStep] = useState('intro'); // intro, test, result
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTest = (result: string) => {
    setTestResult(result);
    setSoftSkillStep('result');
  };

  return (
    <div className="container">
      {/* HERO SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', margin: '4rem 0', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(0,255,204,0.1)', border: '1px solid var(--neon-cyan)', borderRadius: '20px', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--neon-cyan)' }}>
          EDICIÓN ENERO: FAMILIA SANIDAD 🦷
        </div>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          La lava de tu <span className="text-neon-cyan">futuro</span>
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '800px', color: 'var(--text-muted)' }}>
          Conectando el CIFP Los Gladiolos con la realidad profesional. Contenido interactivo hecho por y para el alumnado.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button className="btn-neon" onClick={() => document.getElementById('reto')?.scrollIntoView({ behavior: 'smooth' })}>
            Aceptar Reto del Mes
          </button>
          <button className="btn-neon" style={{ borderColor: 'var(--neon-magenta)', color: 'var(--neon-magenta)' }} onClick={() => document.getElementById('pulso')?.scrollIntoView({ behavior: 'smooth' })}>
            Explorar Secciones
          </button>
        </div>
      </motion.section>

      {/* PULSO HISTÓRICO */}
      <section id="pulso" style={{ margin: '6rem 0' }}>
        <h2 className="section-title"><ScrollText size={40} className="text-neon-cyan" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '1rem' }}/>Pulso Histórico</h2>
        <div className="grid-cards">
          {SECTIONS_DATA.pulsoHistorico.map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                {item.icon === 'Hourglass' ? <Hourglass className="text-neon-yellow" /> : <Hammer className="text-neon-red" />}
                <h3 style={{ margin: 0 }}>{item.title}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)' }}>{item.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BRÚJULA PROFESIONAL */}
      <section id="brujula" style={{ margin: '6rem 0' }}>
        <h2 className="section-title"><Compass size={40} className="text-neon-cyan" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '1rem' }}/>Brújula Profesional</h2>
        <div className="grid-cards">
          {/* Entrevista */}
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '0 0 120px' }}>
                <div style={{ width: '120px', height: '120px', background: 'var(--bg-dark)', borderRadius: '50%', border: '2px solid var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={60} className="text-neon-cyan" />
                </div>
              </div>
              <div style={{ flex: '1' }}>
                <h3 className="text-neon-cyan">{SECTIONS_DATA.brujula.entrevista.name}</h3>
                <p style={{ color: 'var(--neon-magenta)', fontSize: '0.9rem', marginBottom: '1rem' }}>{SECTIONS_DATA.brujula.entrevista.role}</p>
                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                  <Quote size={24} className="text-neon-cyan" style={{ position: 'absolute', left: 0, top: 0, opacity: 0.5 }} />
                  <p style={{ fontStyle: 'italic' }}>{SECTIONS_DATA.brujula.entrevista.advice}</p>
                </div>
                <div style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--neon-yellow)' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: 'var(--neon-yellow)' }}>
                    <Lightbulb size={18} /> Tip de Experto
                  </h4>
                  <p style={{ fontSize: '0.95rem', margin: 0 }}>{SECTIONS_DATA.brujula.entrevista.tip}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Erasmus */}
          <div className="card">
            <h3 className="text-neon-magenta" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={24} /> Ruta Erasmus
            </h3>
            <p style={{ fontWeight: 'bold' }}>{SECTIONS_DATA.brujula.erasmus.student} en {SECTIONS_DATA.brujula.erasmus.destination}</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>"{SECTIONS_DATA.brujula.erasmus.experience}"</p>
          </div>
        </div>
      </section>

      {/* BOTIQUÍN DEL EMPRENDEDOR */}
      <section id="botiquin" style={{ margin: '6rem 0' }}>
        <h2 className="section-title"><BriefcaseMedical size={40} className="text-neon-cyan" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '1rem' }}/>El Botiquín del Emprendedor</h2>
        <div className="grid-cards">
          {/* Dosis de éxito */}
          <div className="card">
            <h3 className="text-neon-cyan">Dosis de Éxito</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {SECTIONS_DATA.botiquin.dosisExito.map((dosis, i) => (
                <div key={i} style={{ borderBottom: '1px solid #2a2a35', pb: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', margin: 0 }}>{dosis.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dosis.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Inyección de Talento */}
          <div className="card" style={{ borderColor: 'var(--neon-magenta)', border: '2px solid' }}>
            <h3 className="text-neon-magenta" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Syringe /> Inyección: {SECTIONS_DATA.botiquin.softSkill.name}
            </h3>
            <AnimatePresence mode="wait">
              {softSkillStep === 'intro' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="intro">
                  <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{SECTIONS_DATA.botiquin.softSkill.indicaciones}</p>
                  <button className="btn-neon" style={{ width: '100%', borderColor: 'var(--neon-magenta)', color: 'var(--neon-magenta)' }} onClick={() => setSoftSkillStep('test')}>
                    Hacer Test de Alergia (10s)
                  </button>
                </motion.div>
              )}

              {softSkillStep === 'test' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="test">
                  <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>{SECTIONS_DATA.botiquin.softSkill.test.question}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {SECTIONS_DATA.botiquin.softSkill.test.options.map((opt, i) => (
                      <button key={i} className="btn-neon" style={{ fontSize: '0.85rem', textAlign: 'left' }} onClick={() => handleTest(opt.result)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {softSkillStep === 'result' && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key="result" style={{ textAlign: 'center' }}>
                  {testResult?.includes('Perfecto') ? <CheckCircle2 size={40} className="text-neon-cyan" style={{ margin: '0 auto 1rem' }} /> : <XCircle size={40} className="text-neon-red" style={{ margin: '0 auto 1rem' }} />}
                  <p style={{ fontWeight: 'bold' }}>{testResult}</p>
                  <button className="btn-neon" style={{ marginTop: '1rem', fontSize: '0.8rem' }} onClick={() => setSoftSkillStep('intro')}>Resetear Dosis</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MAGMA CULTURAL & OXÍGENO */}
      <section style={{ margin: '6rem 0' }} className="grid-cards">
        <div className="card">
          <h2 style={{ fontSize: '2rem', borderBottom: '2px solid var(--neon-cyan)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            <BookOpen className="text-neon-cyan" style={{ marginRight: '10px' }}/>Magma Cultural
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SECTIONS_DATA.magmaCultural.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '4px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--neon-magenta)', display: 'block' }}>{item.type.toUpperCase()}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                </div>
                <button className="btn-neon" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>Ver</button>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 style={{ fontSize: '2rem', borderBottom: '2px solid #00ffcc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            <Headphones className="text-neon-cyan" style={{ marginRight: '10px' }}/>Oxígeno Activo
          </h2>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Banda sonora del centro y pausas activas para el bienestar integral.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button className="btn-neon" style={{ fontSize: '0.8rem' }}>Spotify Colaborativo</button>
              <button className="btn-neon" style={{ fontSize: '0.8rem', borderColor: 'var(--neon-magenta)', color: 'var(--neon-magenta)' }}>SOS Exámenes</button>
            </div>
          </div>
        </div>
      </section>

      {/* ALERTA RETO */}
      <section id="reto" style={{ margin: '6rem 0', textAlign: 'center' }}>
        <motion.div 
          animate={activeReto ? { boxShadow: ['0 0 10px #ff3333', '0 0 30px #ff3333', '0 0 10px #ff3333'] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ background: 'var(--bg-card)', border: '2px solid var(--neon-red)', borderRadius: '12px', padding: '3rem', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.8rem', color: 'var(--neon-red)', fontWeight: 'bold' }}>
            {SECTIONS_DATA.alertaReto.month}
          </div>
          <BellRing size={60} className="text-neon-red" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '3rem', color: 'var(--neon-red)' }}>ALERTA RETO</h2>
          <p style={{ fontSize: '1.2rem', margin: '1rem 0 2rem 0', color: 'var(--text-main)', maxWidth: '700px', marginInline: 'auto' }}>
            {SECTIONS_DATA.alertaReto.challenge}
          </p>
          <button 
            className="btn-neon" 
            style={{ background: activeReto ? 'var(--neon-red)' : 'transparent', color: activeReto ? '#fff' : 'var(--neon-red)', borderColor: 'var(--neon-red)', fontSize: '1.2rem' }}
            onClick={() => setActiveReto(!activeReto)}
          >
            {activeReto ? 'ENVIANDO SOLUCIÓN...' : 'ACEPTAR EL RETO'}
          </button>
        </motion.div>
      </section>

      {/* CONSULTORIO FOL */}
      <section style={{ margin: '6rem 0', display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
          <MailQuestion size={50} className="text-neon-cyan" style={{ margin: '0 auto 1rem auto' }} />
          <h2>Consultorio FOL</h2>
          <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>Buzón anónimo para dudas sobre el mundo laboral. ¡Te respondemos en el próximo número!</p>
          <div style={{ background: '#fff', padding: '1.5rem', width: '160px', height: '160px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
            <div style={{ border: '4px solid #000', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}><div style={{ width: '20px', height: '20px', background: '#000' }}></div><div style={{ width: '20px', height: '20px', background: '#000' }}></div></div>
              <div style={{ textAlign: 'center', color: '#000', fontSize: '0.7rem', fontWeight: 'bold' }}>GLADIOLÍZATE QR</div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}><div style={{ width: '20px', height: '20px', background: '#000' }}></div><div style={{ width: '20px', height: '20px', background: '#000' }}></div></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}