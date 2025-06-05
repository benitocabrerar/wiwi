import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode[];
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesToShow = 1,
  slidesToScroll = 1,
  autoplay = false,
  autoplaySpeed = 3000,
  dots = false,
  arrows = true,
  infinite = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = children.length;

  // Calcular el número de slides visibles según el tamaño de la pantalla
  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return slidesToShow;
    
    if (window.innerWidth < 640) {
      return 1;
    } else if (window.innerWidth < 768) {
      return Math.min(2, slidesToShow);
    } else {
      return slidesToShow;
    }
  };

  const [visibleSlides, setVisibleSlides] = useState(slidesToShow);

  // Actualizar el número de slides visibles al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShow]);

  // Configurar autoplay
  useEffect(() => {
    if (autoplay) {
      startAutoplay();
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, currentSlide, totalSlides]);

  const startAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      goToNextSlide();
    }, autoplaySpeed);
  };

  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const resumeAutoplay = () => {
    if (autoplay && !autoplayTimerRef.current) {
      startAutoplay();
    }
  };

  // Navegar a un slide específico
  const goToSlide = (index: number) => {
    let newIndex = index;

    if (infinite) {
      if (index < 0) {
        newIndex = totalSlides - visibleSlides;
      } else if (index > totalSlides - visibleSlides) {
        newIndex = 0;
      }
    } else {
      if (index < 0) {
        newIndex = 0;
      } else if (index > totalSlides - visibleSlides) {
        newIndex = totalSlides - visibleSlides;
      }
    }

    setCurrentSlide(newIndex);
  };

  const goToPrevSlide = () => {
    goToSlide(currentSlide - slidesToScroll);
  };

  const goToNextSlide = () => {
    goToSlide(currentSlide + slidesToScroll);
  };

  // Gestión de eventos táctiles para deslizar
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    pauseAutoplay();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Deslizar a la izquierda
      goToNextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Deslizar a la derecha
      goToPrevSlide();
    }

    resumeAutoplay();
  };

  // Renderizar slides
  const renderSlides = () => {
    return children.map((child, index) => (
      <div
        key={index}
        className={`carousel-slide ${
          index >= currentSlide && index < currentSlide + visibleSlides ? 'block' : 'hidden'
        }`}
        style={{ width: `${100 / visibleSlides}%` }}
      >
        {child}
      </div>
    ));
  };

  // Renderizar indicadores de puntos
  const renderDots = () => {
    const dotsArray = [];
    const numDots = Math.ceil((totalSlides - visibleSlides + 1) / slidesToScroll);

    for (let i = 0; i < numDots; i++) {
      dotsArray.push(
        <button
          key={i}
          className={`w-2 h-2 mx-1 rounded-full ${
            i * slidesToScroll === currentSlide
              ? 'bg-primary-600 dark:bg-primary-500'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
          onClick={() => goToSlide(i * slidesToScroll)}
          aria-label={`Go to slide ${i + 1}`}
        />
      );
    }

    return dotsArray;
  };

  return (
    <div
      className="carousel-container relative"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div
        className="carousel-track flex"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderSlides()}
      </div>

      {arrows && (
        <>
          <button
            className={`carousel-arrow carousel-arrow-prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10 ${
              !infinite && currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={goToPrevSlide}
            disabled={!infinite && currentSlide === 0}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className={`carousel-arrow carousel-arrow-next absolute top-1/2 right-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10 ${
              !infinite && currentSlide >= totalSlides - visibleSlides
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={goToNextSlide}
            disabled={!infinite && currentSlide >= totalSlides - visibleSlides}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {dots && (
        <div className="carousel-dots flex justify-center mt-4">
          {renderDots()}
        </div>
      )}
    </div>
  );
};

export default Carousel;
