import { useState, useEffect } from 'react'
import './App.css'
import ChatWidget from './components/ChatWidget'
import ChatSection from './components/ChatSection'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    '/img/img_carrousel_1.jpg',
    '/img/img_carrousel_2.jpg',
    '/img/img_carrousel_3.jpg',
    '/img/img_carrousel_4.jpg',
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        return next >= slides.length ? 0 : next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Añadir un efecto para manejar la transición final
  useEffect(() => {
    if (currentSlide === slides.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide(0);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, slides.length]);

  return (
    <div className="app">
      <header 
        className={`header ${isScrolled ? 'scrolled' : ''} ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="container">
          <nav className="nav">
            <a href="/" className="logo">
              <img src="/img/logo_espacio_domestico.webp" alt="Espacio Doméstico Logo" className="logo-image" />
              <span className="logo-text">Espacio Doméstico</span>
            </a>
            <ul className="nav-links">
              <li><a href="#productos">Productos</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li><a href="#tienda" className="button button-primary">Tienda</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Encuentra tu hogar perfecto con nuestros muebles y electrodomésticos de segunda mano
              </h1>
              <p className="hero-subtitle">
                Calidad garantizada, precios accesibles y un impacto positivo en el medio ambiente
              </p>
              <div className="hero-buttons">
                <a href="#productos" className="button button-primary">Explorar Productos</a>
                <a href="#contacto" className="button button-secondary">Contactar</a>
              </div>
            </div>
          </div>
          <div className="hero-carousel">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
              />
            ))}
            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <ChatSection />
        <ChatWidget />

        <section className="features">
          <div className="container">
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">🔄</div>
                <h3>Calidad Verificada</h3>
                <p>Todos nuestros productos pasan por un riguroso proceso de revisión y certificación</p>
              </div>
              <div className="feature">
                <div className="feature-icon">💰</div>
                <h3>Precios Accesibles</h3>
                <p>Encuentra las mejores ofertas para equipar tu hogar sin comprometer la calidad</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌱</div>
                <h3>Sostenibilidad</h3>
                <p>Contribuye a un mundo más sostenible dando una segunda vida a los productos</p>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <div className="container">
            <h2>Nuestras Categorías</h2>
            <div className="category-grid">
              <div className="category-card">
                <div className="category-image">
                  <img src="/img/accesorios.avif" alt="Accesorios" className="category-image" />
                </div>
                <h3>Accesorios</h3>
                <p>Encuentra los mejores accesorios para tu hogar</p>
                <a href="#accesorios" className="button button-text">Ver más →</a>
              </div>
              <div className="category-card">
                <div className="category-image">
                  <img src="/img/electrodomesticos.png" alt="Electrodomésticos" className="category-image" />
                </div>
                <h3>Electrodomésticos</h3>
                <p>Electrodomésticos de última generación</p>
                <a href="#electrodomesticos" className="button button-text">Ver más →</a>
              </div>
              <div className="category-card">
                <div className="category-image">
                  <img src="/img/muebles.jpg" alt="Muebles" className="category-image" />
                </div>
                <h3>Muebles</h3>
                <p>Muebles de diseño para tu hogar</p>
                <a href="#muebles" className="button button-text">Ver más →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>¿Listo para encontrar tu próximo tesoro?</h2>
              <p>Visita nuestra tienda y descubre increíbles ofertas en muebles y electrodomésticos de segunda mano</p>
              <a href="#tienda" className="button button-primary">Ir a la Tienda</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>📍 Calle Principal 123</p>
            <p>📞 +34 123 456 789</p>
            <p>✉️ info@espaciodomestico.com</p>
          </div>
          <div className="footer-section">
            <h3>Horario</h3>
            <p>Lunes - Viernes: 9:00 - 20:00</p>
            <p>Sábados: 10:00 - 18:00</p>
            <p>Domingos: Cerrado</p>
          </div>
          <div className="footer-section map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.123456789012!2d-5.8491234!3d43.3634567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd368c9c2c5c5c5c%3A0x1234567890abcdef!2sEspacio%20Dom%C3%A9stico%2C%20C.%20Juan%20M%20S%C3%A1nchez-Oca%C3%B1a%2C%2033010%20Oviedo%2C%20Asturias!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Espacio Doméstico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
