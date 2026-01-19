import { ChevronLeft, ChevronRight, Clock, Heart, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import Boda1 from './assets/Boda1.jpg';
import Boda2 from './assets/Boda2.jpg';
import FotoCortinaMarian from './assets/Cortina de flores.png';
import FotoCortinaGilberto from './assets/Cortina flores Izquierda.png';
import FondoFlores from './assets/FondoFlores.png';
import LiverpoolLogo from './assets/LiverpoolLogo.png';
import SaveTheDate from './assets/SaveTheDate.png';
import SaveTheDate2 from './assets/SaveTheDate2.jpg';
import SaveTheDate3 from './assets/SaveTheDate3.jpg';
import SaveTheDate4 from './assets/SaveTheDate4.jpg';
import SaveTheDate5 from './assets/SaveTheDate5.jpg';
const WeddingInvitation = () => {
 const carouselRef = useRef(null);
useEffect(() => {
  const carousel = carouselRef.current;
  if (!carousel) return;

  // Esperamos a que el layout esté listo
  requestAnimationFrame(() => {
    const cards = carousel.children;
    if (cards.length < 2) return;

    // Centramos la segunda imagen
    const secondCard = cards[1];
    const offset =
      secondCard.offsetLeft -
      (carousel.offsetWidth / 2 - secondCard.offsetWidth / 2);

    carousel.scrollTo({
      left: offset,
      behavior: "instant",
    });
  });
}, []);

const scrollCarousel = (direction) => {
  const carousel = carouselRef.current;
  if (!carousel) return;

  const scrollAmount = carousel.offsetWidth * 0.8;

  carousel.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};


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
    { tipo: "VELACIÓN", nombres: ["Andrés Juárez Ortiz", "Lorena Margarita Limón González"] },
    { tipo: "ARRAS", nombres: ["Hugo Eloy Matías Galindo", "Laura Mejía Ortiz"] },
    { tipo: "LAZO", nombres: ["Arturo Díaz", "Vania Rodríguez"] },
    { tipo: "ANILLOS", nombres: ["Óscar Alvarado Rojas", "Violeta Cancino Ruiz"] },
    { tipo: "BIBLIA Y ROSARIO", nombres: ["Sergio Lares"] }
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
<section
  className="
    relative
    w-full
    overflow-hidden
    flex
    justify-center
    bg-no-repeat
    bg-center
    bg-cover
  "
  style={{
    backgroundImage: `url(${FondoFlores})`,
  }}
>

  {/* Wrapper que define el ancho en desktop */}
  <div className="relative w-full lg:w-1/2">

    {/* Imagen principal */}
    <img 
      src={Boda1}
      alt="Marian y Gil"
      className="w-full h-auto block"
    />

    {/* Overlay oscuro */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

    {/* Contenido inferior */}
    <div 
      className="absolute bottom-0 left-0 w-full py-6 px-6 text-center z-10"
      style={{ backgroundColor: 'rgba(220, 198, 170, 0.90)' }}
    >
      <h3 className="text-sm md:text-xl uppercase tracking-widest mb-3 font-light text-white">
        ¡Nos Casamos!
      </h3>

      <h1 
        className="text-5xl md:text-6xl lg:text-7xl mb-3"
        style={{ fontFamily: "'Great Vibes', cursive", color: '#ffffffff' }}
      >
        Belén y Gil
      </h1>

      <h3 className="text-base md:text-xl uppercase tracking-wider font-light text-white">
        12 Septiembre 2026
      </h3>

      <Heart className="w-5 h-5 mx-auto mt-4 text-white" />
    </div>

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

      {/* Invitación */}
      <section className="relative w-full overflow-hidden flex justify-center" style={{
    backgroundImage: `url(${FondoFlores})`,
  }}>

  <img 
    className="w-full lg:w-1/2 h-auto rounded-xl shadow-lg"
    src={SaveTheDate}
    alt="Fondo"
  />
</section>


      {/* Ceremonia Religiosa */}
<section className="py-12 md:py-20 px-4 bg-[#F8F4EE]">
  <div className="max-w-4xl mx-auto">

    {/* Título */}
    <div className="text-center mb-8 md:mb-12">
      <h2
        className="text-xl md:text-4xl lg:text-5xl mb-3 md:mb-4"
        style={{ color: '#6B6C44' }}
      >
        Ceremonia Religiosa
      </h2>

      <p
        className="text-sm md:text-base lg:text-lg mb-3"
        style={{ color: '#6B6C44' }}
      >
        Santuario de La Congregación de Nuestra Señora de Guadalupe
      </p>

      <div className="w-16 md:w-24 h-1 mx-auto bg-[#F6CD44]" />
    </div>

    {/* Tarjeta hora */}
    <div className="flex justify-center mb-8">
  <div
    className="
      w-full
      max-w-[240px] md:max-w-[320px]
      p-5 md:p-8
      rounded-lg
      shadow-sm
    "
    style={{ backgroundColor: 'white' }}
  >
    <Clock
      className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4"
      style={{ color: '#C3890B' }}
    />

    <h3
      className="text-lg md:text-2xl mb-1 md:mb-2 text-center"
      style={{ color: '#6B6C44' }}
    >
      Hora
    </h3>

    <p
      className="text-base md:text-xl text-center"
      style={{ color: '#C3890B' }}
    >
      4:00 PM
    </p>
  </div>
</div>

    {/* Botón ubicación */}
    <div className="text-center mt-6 md:mt-8">
      <a
        href="https://maps.app.goo.gl/ZU2scjK687aD1tE38?g_st=iw"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2
          px-6 py-3 md:px-8 md:py-4
          rounded-full
          text-sm md:text-lg
          text-white
          hover:opacity-90
          transition-opacity
        "
        style={{ backgroundColor: '#C3890B' }}
      >
        <MapPin className="w-4 h-4 md:w-5 md:h-5" />
        Ubicación
      </a>
    </div>

  </div>
</section>

{/* Recepción */}
<section className="py-12 md:py-20 px-4 bg-[#6B6C44]">
  <div className="max-w-4xl mx-auto text-center">

    {/* Título */}
    <h2
      className="text-xl md:text-4xl lg:text-5xl mb-3 md:mb-4"
      style={{ color: '#F8F4EE' }}
    >
      Fiesta
    </h2>

    <p
      className="text-sm md:text-base lg:text-lg mb-3 md:mb-4"
      style={{ color: '#F8F4EE' }}
    >
      Lantana Jardín y Salones
    </p>

    <div className="w-16 md:w-24 h-1 mx-auto mb-8 md:mb-12 bg-[#F6CD44]" />

    {/* Tarjeta Hora */}
    <div className="flex justify-center mb-8">
      <div
        className="
          w-full
          max-w-[240px] md:max-w-[320px]
          p-5 md:p-8
          rounded-lg
          shadow-sm
        "
        style={{ backgroundColor: 'rgba(248, 244, 238, 0.12)' }}
      >
        <Clock
          className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4"
          style={{ color: '#F6CD44' }}
        />

        <h3
          className="text-lg md:text-2xl mb-1 md:mb-2"
          style={{ color: '#F8F4EE' }}
        >
          Hora
        </h3>

        <p
          className="text-base md:text-xl"
          style={{ color: '#DCC6AA' }}
        >
          6:30 PM
        </p>
      </div>
    </div>

    {/* Botón ubicación */}
    <a
      href="https://maps.app.goo.gl/3iaKarTD2H2juk3VA?g_st=iw"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center gap-2
        px-6 py-3 md:px-8 md:py-4
        rounded-full
        text-sm md:text-lg
        hover:opacity-90
        transition-opacity
      "
      style={{ backgroundColor: '#F6CD44', color: '#6B6C44' }}
    >
      <MapPin className="w-4 h-4 md:w-5 md:h-5" />
      Ubicación
    </a>

  </div>
</section>

       

     {/* Padrinos */}
<section className="py-14 md:py-20 px-4" style={{ backgroundColor: '#F8F4EE' }}>
  <div className="max-w-4xl mx-auto">

    {/* Título */}
    <div className="text-center mb-10 md:mb-12">
      <h2
        className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4"
        style={{ color: '#6B6C44' }}
      >
        Padrinos
      </h2>

      <div
        className="w-16 md:w-24 h-1 mx-auto"
        style={{ backgroundColor: '#F6CD44' }}
      />
    </div>

    {/* Tarjetas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {padrinos.map((padrino, idx) => (
        <div
          key={idx}
          className="
            w-full
            max-w-[320px] md:max-w-none
            mx-auto
            p-5 md:p-6
            rounded-lg
            shadow-sm
          "
          style={{ backgroundColor: 'white' }}
        >
          <h3
            className="text-lg md:text-2xl mb-3 md:mb-4 text-center uppercase tracking-wide"
            style={{ color: '#C3890B' }}
          >
            {padrino.tipo}
          </h3>

          <div className="space-y-1 md:space-y-2 text-center">
            {padrino.nombres.map((nombre, i) => (
              <p
                key={i}
                className="text-sm md:text-lg"
                style={{ color: '#6B6C44' }}
              >
                {nombre}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>

  </div>
</section>


  
{/* Fotos */}
<section className="py-20 px-4 bg-[#DCC6AA] relative">
  <div className="max-w-5xl mx-auto relative">

    {/* Flecha izquierda */}
    <ChevronLeft
      onClick={() => scrollCarousel("left")}
      className="
        absolute left-2 top-1/2 -translate-y-1/2 z-10
        text-white opacity-80 md:hidden
        cursor-pointer
      "
      size={32}
    />

    {/* Flecha derecha */}
    <ChevronRight
      onClick={() => scrollCarousel("right")}
      className="
        absolute right-2 top-1/2 -translate-y-1/2 z-10
        text-white opacity-80 md:hidden
        cursor-pointer
      "
      size={32}
    />

    {/* Carrusel */}
    <div
      ref={carouselRef}
      className="
        flex gap-4
        overflow-x-auto
        snap-x snap-mandatory
        scroll-smooth
        scrollbar-hide
        md:grid md:grid-cols-3 md:overflow-visible
      "
    >
      {[SaveTheDate2, SaveTheDate3, SaveTheDate4].map((img, index) => (
        <div
          key={index}
          className="
            snap-center
            min-w-[80%] sm:min-w-[60%]
            md:min-w-0
            aspect-[3/4]
            rounded-lg
            overflow-hidden
            shadow-2xl
          "
        >
          <img
            src={img}
            alt="Foto Marian y Gil"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>

  </div>
</section>



      {/* Dress Code */}
<section className="py-14 md:py-20 px-4" style={{ backgroundColor: '#F8F4EE' }}>
  <div className="max-w-4xl mx-auto text-center">

    {/* Título */}
    <h2
      className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4"
      style={{ color: '#6B6C44' }}
    >
      Dress Code
    </h2>

    <div
      className="w-16 md:w-24 h-1 mx-auto mb-8 md:mb-12"
      style={{ backgroundColor: '#F6CD44' }}
    />

    {/* Tipo */}
    <p
      className="text-lg md:text-2xl lg:text-3xl mb-6 md:mb-8 uppercase tracking-widest"
      style={{ color: '#C3890B' }}
    >
      Formal
    </p>

    {/* Tarjetas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
      
      {/* Hombres */}
      <div
        className="
          w-full
          max-w-[300px] md:max-w-none
          mx-auto
          p-5 md:p-6
          rounded-lg
          shadow-sm
        "
        style={{ backgroundColor: 'white' }}
      >
        <div className="text-4xl mb-2">👔</div>
        <h3
          className="text-lg md:text-2xl mb-1 md:mb-2"
          style={{ color: '#6B6C44' }}
        >
          Hombres
        </h3>
        <p
          className="text-sm md:text-xl uppercase tracking-wide"
          style={{ color: '#C3890B' }}
        >
          Traje
        </p>
      </div>

      {/* Mujeres */}
      <div
        className="
          w-full
          max-w-[300px] md:max-w-none
          mx-auto
          p-5 md:p-6
          rounded-lg
          shadow-sm
        "
        style={{ backgroundColor: 'white' }}
      >
        <div className="text-4xl mb-2">👗</div>
        <h3
          className="text-lg md:text-2xl mb-1 md:mb-2"
          style={{ color: '#6B6C44' }}
        >
          Mujeres
        </h3>
        <p
          className="text-sm md:text-xl uppercase tracking-wide"
          style={{ color: '#C3890B' }}
        >
          Vestido largo
        </p>
      </div>

    </div>

    {/* Reglas */}
    <div
      className="
        w-full
        max-w-[420px]
        mx-auto
        p-5 md:p-6
        rounded-lg
        shadow-sm
      "
      style={{ backgroundColor: 'white' }}
    >
      <p className="text-sm md:text-lg mb-2" style={{ color: '#6B6C44' }}>
        Colores <strong>Blanco, Rojo y Amarillo</strong>
      </p>
      <p className="text-sm md:text-lg" style={{ color: '#6B6C44' }}>
        Reservados para la novia y damas de honor
      </p>
      <p className="text-sm md:text-lg mt-3" style={{ color: '#6B6C44' }}>
        ❌ No tenis
      </p>
    </div>

  </div>
</section>


  {/* Mesa de Regalos */}
<section
  className="py-14 md:py-20 px-4"
  style={{ backgroundColor: "#6B6C44" }}
>
  <div className="max-w-4xl mx-auto text-center">

    {/* Título */}
    <h2
      className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4"
      style={{ color: "#F8F4EE" }}
    >
      Mesa de Regalos
    </h2>

    {/* Línea */}
    <div
      className="w-16 md:w-24 h-1 mx-auto mb-8 md:mb-12"
      style={{ backgroundColor: "#F6CD44" }}
    />

    {/* Texto */}
    <p
      className="text-sm md:text-lg mb-6 md:mb-8 leading-relaxed"
      style={{ color: "#DCC6AA" }}
    >
      Tu presencia es nuestro mejor regalo,  
      pero si deseas obsequiarnos algo:
    </p>

    {/* Tarjeta */}
    <div
      className="
        mx-auto
        w-full
        max-w-[260px] sm:max-w-[300px] md:max-w-[360px]
        p-5 md:p-6
        rounded-2xl
        flex flex-col
        items-center
        gap-5
        shadow-sm
      "
      style={{ backgroundColor: "#F8F4EE" }}
    >
      {/* Logo Liverpool */}
      <img
        src={LiverpoolLogo}
        alt="Liverpool"
        className="w-24 md:w-28 h-auto object-contain"
      />

      {/* Botón */}
      <a
        href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51921084"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center justify-center gap-2
          px-6 md:px-8
          py-3
          rounded-full
          text-sm md:text-base
          hover:opacity-90 transition
        "
        style={{
          backgroundColor: "#F6CD44",
          color: "#6B6C44",
        }}
      >
        🎁 Ver Mesa de Regalos
      </a>
    </div>

  </div>
</section>


      {/* Quinta Foto */}
      
        <div className="max-w-4xl mx-auto">
          <div 
            className="aspect-video rounded-lg flex items-center justify-center text-white text-2xl shadow-2xl"
            style={{ backgroundColor: '#DCC6AA' }}
          >
                     <img 
      src={SaveTheDate5}
      alt="Marian y Gil"
      className="w-full h-auto block"
    />
          </div>
        </div>
      

      {/* Confirmación */}
<section
  className="py-14 md:py-20 px-4"
  style={{ backgroundColor: "#F8F4EE" }}
>
  <div className="max-w-4xl mx-auto text-center">

    {/* Título */}
    <h2
      className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4"
      style={{ color: "#6B6C44" }}
    >
      Confirma tu Asistencia
    </h2>

    {/* Línea */}
    <div
      className="w-16 md:w-24 h-1 mx-auto mb-8 md:mb-12"
      style={{ backgroundColor: "#F6CD44" }}
    />

    {/* Texto */}
    <p
      className="text-sm md:text-lg mb-8 md:mb-10 leading-relaxed"
      style={{ color: "#6B6C44" }}
    >
      Por favor confirma tu asistencia antes del <strong>30 de marzo </strong>  
      para asegurar tu lugar y ayudarnos con la organización del evento.
    </p>

    {/* Tarjetas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

      {/* Novio */}
      <div
        className="
          w-full
          max-w-[280px] md:max-w-none
          mx-auto
          p-5 md:p-6
          rounded-xl
          shadow-sm
        "
        style={{ backgroundColor: "white" }}
      >
        <h3
          className="text-lg md:text-2xl mb-4"
          style={{ color: "#C3890B" }}
        >
          Invitados del Novio
        </h3>

        <a
          href="https://wa.me/524427491821?text=Hola%20😊%20Confirmo%20mi%20asistencia%20para%20acompa%C3%B1arlos%20en%20este%20evento%20tan%20especial%20y%20m%C3%A1gico.%20✨%F0%9F%92%9B"
  target="_blank"
  rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center
            px-6 py-3
            rounded-full
            text-sm md:text-base
            hover:opacity-90 transition
          "
          style={{ backgroundColor: "#6B6C44", color: "#F8F4EE" }}
        >
          Confirmar
        </a>
      </div>

      {/* Novia */}
      <div
        className="
          w-full
          max-w-[280px] md:max-w-none
          mx-auto
          p-5 md:p-6
          rounded-xl
          shadow-sm
        "
        style={{ backgroundColor: "white" }}
      >
        <h3
          className="text-lg md:text-2xl mb-4"
          style={{ color: "#C3890B" }}
        >
          Invitados de la Novia
        </h3>

        <a
          href="https://wa.me/524427491821?text=Hola%20😊%20Confirmo%20mi%20asistencia%20para%20acompa%C3%B1arlos%20en%20este%20evento%20tan%20especial%20y%20m%C3%A1gico.%20✨%F0%9F%92%9B"
  target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center
            px-6 py-3
            rounded-full
            text-sm md:text-base
            hover:opacity-90 transition
          "
          style={{ backgroundColor: "#6B6C44", color: "#F8F4EE" }}
        >
          Confirmar
        </a>
      </div>

    </div>
  </div>
</section>


      {/* Footer */}
<footer
  className="py-10 md:py-12 px-4 text-center"
  style={{ backgroundColor: "#6B6C44" }}
>
  <Heart
    className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3"
    style={{ color: "#F6CD44" }}
  />

  <p
    className="text-sm md:text-lg"
    style={{ color: "#F8F4EE" }}
  >
    ¡Nos vemos el 12 de Septiembre!
  </p>

  <p
    className="mt-1 text-sm md:text-base"
    style={{ color: "#DCC6AA" }}
  >
    Marian & Gilberto
  </p>
</footer>

    </div>
  );
};

export default WeddingInvitation;