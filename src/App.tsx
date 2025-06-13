import { useState, useEffect } from 'react'
import './App.css'

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
                  <img src="/electrodomesticos.jpg" alt="Electrodomésticos" />
                </div>
                <h3>Electrodomésticos</h3>
                <p>Refrigeradores, lavadoras, microondas y más</p>
                <a href="#electrodomesticos" className="button button-text">Ver más →</a>
              </div>
              <div className="category-card">
                <div className="category-image">
                  <img src="/muebles.jpg" alt="Muebles" />
                </div>
                <h3>Muebles</h3>
                <p>Sofás, mesas, sillas y decoración</p>
                <a href="#muebles" className="button button-text">Ver más →</a>
              </div>
              <div className="category-card">
                <div className="category-image">
                  <img src="/accesorios.jpg" alt="Accesorios" />
                </div>
                <h3>Accesorios</h3>
                <p>Todo para complementar tu hogar</p>
                <a href="#accesorios" className="button button-text">Ver más →</a>
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
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Espacio Doméstico</h4>
              <p>Tu destino para muebles y electrodomésticos de segunda mano con calidad garantizada.</p>
            </div>
            <div className="footer-section">
              <h4>Contacto</h4>
              <p>Email: info@espaciodomestico.com</p>
              <p>Teléfono: (123) 456-7890</p>
            </div>
            <div className="footer-section">
              <h4>Horario</h4>
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p>Sábados: 10:00 - 15:00</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Espacio Doméstico. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
