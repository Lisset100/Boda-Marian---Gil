import { Clock, Gift, Heart, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Boda1 from './assets/Boda1.jpg';
import Boda2 from './assets/Boda2.jpg';
import FotoCortinaMarian from './assets/Cortina de flores.png'; // Agrega tu foto
import FotoCortinaGilberto from './assets/Cortina flores Izquierda.png'; // Agrega tu foto

const WeddingInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const handleScroll = (e) => {
      if (!isOpen) {
        e.preventDefault();
        const delta = e.deltaY || e.touches?.[0]?.clientY;
        
        setScrollAmount(prev => {
          const newAmount = Math.max(0, Math.min(100, prev + (delta > 0 ? 5 : -5)));
          
          if (newAmount >= 100) {
            setIsOpen(true);
          }
          
          return newAmount;
        });
      }
    };

    const handleTouchMove = (e) => {
      if (!isOpen) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date('2026-09-12T16:00:00');
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const padrinos = [
    { tipo: "VELACIÓN", nombres: ["André Juárez Ortiz", "Lorena Limón"] },
    { tipo: "ARRAS", nombres: ["Pedro", "Lilia"] },
    { tipo: "LAZO", nombres: ["Roberto", "Liste"] },
    { tipo: "ANILLOS", nombres: ["Marian", "Paco"] },
    { tipo: "BIBLIA Y ROSARIO", nombres: ["María", "Alan"] }
  ];

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Animación de Apertura con Scroll */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-1000 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Pétalo Izquierdo con imagen de fondo */}
        <div 
          className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(-${scrollAmount}%)`,
            backgroundColor: '#DCC6AA',
            backgroundImage: `linear-gradient(rgba(220, 198, 170, 0.7), rgba(220, 198, 170, 0.7)), url(${FotoCortinaMarian})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute right-0 top-0 w-full h-full flex items-center justify-center">
            <div className="text-center pr-8">
              <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4" style={{ color: '#F8F4EE' }} />
              <p className="text-2xl md:text-4xl" style={{ color: '#F8F4EE' }}>Marian</p>
            </div>
          </div>
        </div>
        
        {/* Pétalo Derecho con imagen de fondo */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(${scrollAmount}%)`,
            backgroundColor: '#C3890B',
            backgroundImage: `linear-gradient(rgba(195, 137, 11, 0.7), rgba(195, 137, 11, 0.7)), url(${FotoCortinaGilberto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
            <div className="text-center pl-8">
              <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4" style={{ color: '#F8F4EE' }} />
              <p className="text-2xl md:text-4xl" style={{ color: '#F8F4EE' }}>Gilberto</p>
            </div>
          </div>
        </div>
        
        {/* Centro - Indicador de scroll */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <div className="flex flex-col items-center">
            <div className="animate-bounce mb-2">
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="#F6CD44" 
                strokeWidth="3" 
                viewBox="0 0 24 24"
              >
                <path d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <p className="text-white text-lg md:text-xl font-light tracking-wide">
              Desliza para abrir
            </p>
            {/* Barra de progreso */}
            <div className="w-32 h-1 bg-white/30 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${scrollAmount}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Corazón central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Heart 
            className="w-12 h-12 transition-all duration-500"
            style={{ 
              color: '#F6CD44',
              transform: `scale(${1 + scrollAmount / 100})`,
              opacity: 1 - scrollAmount / 100
            }} 
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden">
        {/* Imagen de fondo - sin recortar */}
        <img 
          src={Boda1}
          alt="Marian y Gil"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ objectPosition: 'center' }}
        />
        
        {/* Overlay oscuro sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
        
        {/* Sección inferior con overlay beige */}
        <div 
          className="relative z-10 w-full py-6 px-6 text-center"
          style={{ backgroundColor: 'rgba(220, 198, 170, 0.90)' }}
        >
          <p className="text-sm md:text-xl uppercase tracking-widest mb-3 font-light" style={{ color: '#ffffffff' }}>
            Nos Casamos
          </p>
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl mb-3"

            style={{ fontFamily: "'Great Vibes', cursive", color: '#ffffffff' }}
          >
            Belén y Gil
          </h1>
          <p className="text-base md:text-xl uppercase tracking-wider font-light" style={{ color: '#ffffffff' }}>
            12 Septiembre 2026
          </p>
          <Heart className="w-5 h-5 mx-auto mt-4" style={{ color: '#ffffffff' }} />
        </div>
      </section>

      {/* Cuenta Regresiva */}
      <section className="relative w-full overflow-hidden">
        {/* Imagen de fondo */}
        <img 
          className="w-full h-auto"
          src={Boda2}
          alt="Fondo"
        />
        
        {/* Overlay oscuro */}
        <div className="bg-black/40 absolute inset-0"></div>
        
        {/* Contador - posicionado sobre la imagen */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 py-8">
          <h2 className="text-3xl md:text-5xl mb-8 md:mb-16 text-white font-light tracking-wide">
            FALTAN
          </h2>
          <div className="flex space-x-3 md:space-x-8 lg:space-x-12">
            {/* Días */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-lg backdrop-blur-sm border-2 mb-2"
                style={{ 
                  backgroundColor: 'rgba(248, 244, 238, 0.15)',
                  borderColor: 'rgba(248, 244, 238, 0.3)'
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-light text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs md:text-base lg:text-xl text-white uppercase tracking-widest text-center w-16 md:w-28 lg:w-32">
                Días
              </span>
            </div>

            {/* Horas */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-lg backdrop-blur-sm border-2 mb-2"
                style={{ 
                  backgroundColor: 'rgba(248, 244, 238, 0.15)',
                  borderColor: 'rgba(248, 244, 238, 0.3)'
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-light text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs md:text-base lg:text-xl text-white uppercase tracking-widest text-center w-16 md:w-28 lg:w-32">
                Horas
              </span>
            </div>

            {/* Minutos */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-lg backdrop-blur-sm border-2 mb-2"
                style={{ 
                  backgroundColor: 'rgba(248, 244, 238, 0.15)',
                  borderColor: 'rgba(248, 244, 238, 0.3)'
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-light text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs md:text-base lg:text-xl text-white uppercase tracking-widest text-center w-16 md:w-28 lg:w-32">
                Minutos
              </span>
            </div>

            {/* Segundos */}
            <div className="flex flex-col items-center">
              <div 
                className="w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-lg backdrop-blur-sm border-2 mb-2"
                style={{ 
                  backgroundColor: 'rgba(248, 244, 238, 0.15)',
                  borderColor: 'rgba(248, 244, 238, 0.3)'
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-light text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs md:text-base lg:text-xl text-white uppercase tracking-widest text-center w-16 md:w-28 lg:w-32">
                Segundos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Nombres Completos */}
      <section className="py-20 px-4" style={{ backgroundColor: '#DCC6AA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-12" style={{ color: '#F8F4EE' }}>
            Marian Belén Sánchez Juárez
          </h2>
          <div className="text-6xl my-8" style={{ color: '#F8F4EE' }}>&</div>
          <h2 className="text-4xl md:text-5xl" style={{ color: '#F8F4EE' }}>
            Gilberto Gutiérrez Barrón
          </h2>
        </div>
      </section>

      {/* Primera Foto */}
      <section className="py-8 md:py-16 lg:py-20 px-4">
        <div className="max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto">
          <img 
            src={Boda1}
            alt="Foto de los Novios"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </section>

      {/* Ceremonia Religiosa */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F4EE' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4" style={{ color: '#6B6C44' }}>Ceremonia Religiosa</h2>
            <p className="text-2xl mb-4" style={{ color: '#6B6C44' }}>Santuario de La Congregación de Nuestra Señora de Guadalupe</p>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#F6CD44' }}></div>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8 text-center">
            <div className="p-8 rounded-lg mb-8" style={{ backgroundColor: 'white' }}>
              <Clock className="w-12 h-12 mx-auto mb-4" style={{ color: '#C3890B' }} />
              <h3 className="text-2xl mb-2" style={{ color: '#6B6C44' }}>Hora</h3>
              <p className="text-xl" style={{ color: '#C3890B' }}>4:00 PM</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://maps.app.goo.gl/ZU2scjK687aD1tE38?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#C3890B' }}
            >
              <MapPin className="w-5 h-5" />
              Ubicación
            </a>
          </div>
        </div>
      </section>

      {/* Segunda Foto */}
      <section className="py-20 px-4" style={{ backgroundColor: '#6B6C44' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="aspect-square rounded-lg flex items-center justify-center text-white text-xl shadow-2xl"
              style={{ backgroundColor: '#C3890B' }}
            >
              Foto de los Novios 2
            </div>
            <div 
              className="aspect-square rounded-lg flex items-center justify-center text-white text-xl shadow-2xl"
              style={{ backgroundColor: '#DCC6AA' }}
            >
              Foto de los Novios 3
            </div>
          </div>
        </div>
      </section>

      {/* Recepción */}
      <section className="py-20 px-4" style={{ backgroundColor: '#6B6C44' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl mb-4" style={{ color: '#F8F4EE' }}>Fiesta</h2>
          <p className="text-2xl mb-4" style={{ color: '#F8F4EE' }}>Lantana Jardín y Salones</p>
          <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: '#F6CD44' }}></div>
          
          <div className="p-8 rounded-lg mb-8" style={{ backgroundColor: 'rgba(248, 244, 238, 0.1)' }}>
            <Clock className="w-12 h-12 mx-auto mb-4" style={{ color: '#F6CD44' }} />
            <h3 className="text-2xl mb-2" style={{ color: '#F8F4EE' }}>Hora</h3>
            <p className="text-xl" style={{ color: '#DCC6AA' }}>6:30 PM</p>
          </div>
          
          <a 
            href="https://maps.app.goo.gl/3iaKarTD2H2juk3VA?g_st=iw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#F6CD44', color: '#6B6C44' }}
          >
            <MapPin className="w-5 h-5" />
            Ubicación
          </a>
        </div>
      </section>

      {/* Tercera Foto */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className="aspect-[16/9] rounded-lg flex items-center justify-center text-white text-2xl shadow-2xl"
            style={{ backgroundColor: '#F6CD44', color: '#6B6C44' }}
          >
            Foto de los Novios 4
          </div>
        </div>
      </section>

      {/* Padrinos */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F4EE' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4" style={{ color: '#6B6C44' }}>Padrinos</h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#F6CD44' }}></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {padrinos.map((padrino, idx) => (
              <div key={idx} className="p-6 rounded-lg" style={{ backgroundColor: 'white' }}>
                <h3 className="text-2xl mb-4 text-center" style={{ color: '#C3890B' }}>{padrino.tipo}</h3>
                <div className="space-y-2 text-center">
                  {padrino.nombres.map((nombre, i) => (
                    <p key={i} className="text-lg" style={{ color: '#6B6C44' }}>{nombre}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuarta Foto */}
      <section className="py-20 px-4" style={{ backgroundColor: '#DCC6AA' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="aspect-[3/4] rounded-lg flex items-center justify-center text-white text-lg shadow-2xl"
              style={{ backgroundColor: '#6B6C44' }}
            >
              Foto 5
            </div>
            <div 
              className="aspect-[3/4] rounded-lg flex items-center justify-center text-white text-lg shadow-2xl"
              style={{ backgroundColor: '#C3890B' }}
            >
              Foto 6
            </div>
            <div 
              className="aspect-[3/4] rounded-lg flex items-center justify-center text-lg shadow-2xl"
              style={{ backgroundColor: '#F6CD44', color: '#6B6C44' }}
            >
              Foto 7
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl mb-4" style={{ color: '#6B6C44' }}>Dress Code</h2>
          <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: '#F6CD44' }}></div>
          
          <div className="text-3xl mb-8" style={{ color: '#C3890B' }}>FORMAL</div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F8F4EE' }}>
              <h3 className="text-2xl mb-4" style={{ color: '#6B6C44' }}>Hombres</h3>
              <p className="text-xl" style={{ color: '#C3890B' }}>TRAJE</p>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#F8F4EE' }}>
              <h3 className="text-2xl mb-4" style={{ color: '#6B6C44' }}>Mujeres</h3>
              <p className="text-xl" style={{ color: '#C3890B' }}>VESTIDO LARGO</p>
            </div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F8F4EE' }}>
            <p className="text-lg mb-2" style={{ color: '#6B6C44' }}>
              Color <strong>Blanco, Rojo y Amarillo</strong>
            </p>
            <p className="text-lg" style={{ color: '#6B6C44' }}>
              Reservado para la novia y damas de honor
            </p>
            <p className="text-lg mt-4" style={{ color: '#6B6C44' }}>
              ❌ No Tenis
            </p>
          </div>
        </div>
      </section>

      {/* Mesa de Regalos */}
      <section className="py-20 px-4" style={{ backgroundColor: '#6B6C44' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl mb-4" style={{ color: '#F8F4EE' }}>Mesa de Regalos</h2>
          <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: '#F6CD44' }}></div>
          
          <p className="text-xl mb-8" style={{ color: '#DCC6AA' }}>
            Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo:
          </p>
          
          <a 
            href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51921084"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#F6CD44', color: '#6B6C44' }}
          >
            <Gift className="w-5 h-5" />
            Ver Mesa de Regalos Liverpool
          </a>
        </div>
      </section>

      {/* Quinta Foto */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className="aspect-video rounded-lg flex items-center justify-center text-white text-2xl shadow-2xl"
            style={{ backgroundColor: '#DCC6AA' }}
          >
            Foto de los Novios 8
          </div>
        </div>
      </section>

      {/* Confirmación */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F4EE' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl mb-4" style={{ color: '#6B6C44' }}>Confirma tu Asistencia</h2>
          <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: '#F6CD44' }}></div>
          
          <p className="text-xl mb-8" style={{ color: '#6B6C44' }}>
            Por favor confirma tu asistencia antes del 30 de marzo para asegurar tu lugar y ayudarnos con la organización del evento.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'white' }}>
              <h3 className="text-2xl mb-4" style={{ color: '#C3890B' }}>Invitados del Novio</h3>
              <a 
                href="https://wa.me/524427491821"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6B6C44', color: '#F8F4EE' }}
              >
                Confirmar
              </a>
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: 'white' }}>
              <h3 className="text-2xl mb-4" style={{ color: '#C3890B' }}>Invitados de la Novia</h3>
              <a 
                href="https://wa.me/524423762369"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#6B6C44', color: '#F8F4EE' }}
              >
                
                Confirmar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center" style={{ backgroundColor: '#6B6C44' }}>
        <Heart className="w-8 h-8 mx-auto mb-4" style={{ color: '#F6CD44' }} />
        <p className="text-lg" style={{ color: '#F8F4EE' }}>
          ¡Nos vemos el 12 de Septiembre!
        </p>
        <p className="mt-2" style={{ color: '#DCC6AA' }}>
          Marian & Gilberto
        </p>
      </footer>
    </div>
  );
};

export default WeddingInvitation;