import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Reusable Media Slider Component using Swiper
const MediaSlider = ({ event, isModal = false, initialSlide = 0, isFullscreen = false, onCloseFullscreen }) => {
    const slides = [];
    if (event.youtubeId) {
        slides.push({ type: 'video', content: event.youtubeId });
    }
    if (event.photos?.length > 0) {
        event.photos.forEach(photo => {
            slides.push({ type: 'image', content: photo.url });
        });
    }

    // Only show navigation if there are multiple slides
    const showNavigation = slides.length > 1;
    const uniqueId = `swiper-${Math.random().toString(36).substring(2, 15)}`;

    const SwiperContent = ({ isFullscreenView = false }) => (
        <div className={`relative ${isFullscreenView ? 'h-full' : (isModal ? 'h-96' : 'h-48')} overflow-hidden rounded-lg group`}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={showNavigation ? {
                    prevEl: `.${uniqueId}${isFullscreenView ? '-fullscreen' : ''}-prev`,
                    nextEl: `.${uniqueId}${isFullscreenView ? '-fullscreen' : ''}-next`,
                } : false}
                pagination={{ clickable: true }}
                className="w-full h-full"
                initialSlide={isFullscreenView ? initialSlide : 0}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {slide.type === 'video' ? (
                            <div className="w-full h-full relative">
                                <iframe
                                    src={`https://www.youtube.com/embed/${slide.content}`}
                                    title={event.title}
                                    className="w-full h-full rounded-lg"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <img
                                src={slide.content}
                                alt={event.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {showNavigation && (
                <>
                    <button
                        className={`${uniqueId}${isFullscreenView ? '-fullscreen' : ''}-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110`}
                    >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className={`${uniqueId}${isFullscreenView ? '-fullscreen' : ''}-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110`}
                    >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );

    return (
        <>
            <SwiperContent />

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={onCloseFullscreen}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
                            title="Close fullscreen"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Fullscreen Swiper */}
                        <SwiperContent isFullscreenView={true} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MediaSlider; 