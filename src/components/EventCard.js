import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import eventService from '../services/eventService';

// Reusable Media Slider Component using Swiper
const MediaSlider = ({ event, isModal = false, autoPlayVideo = false, variant = 'default' }) => {
    // Create slides array with video first (if exists) then images
    const slides = [];
    if (event.youtubeId) {
        slides.push({ type: 'video', content: event.youtubeId });
    }
    event.photos.forEach(photo => {
        slides.push({ type: 'image', content: photo.url });
    });

    // Different styles for card vs modal vs variant
    const getContainerHeight = () => {
        if (isModal) return 'h-96';
        if (variant === 'sidebar') return 'h-full';
        if (variant === 'compact') return 'h-40';
        return 'h-48'; // default
    };

    const containerHeight = getContainerHeight();

    // Show navigation and pagination only if more than one slide
    const showControls = slides.length > 1;

    return (
        <div className={`relative ${containerHeight} overflow-hidden`}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={isModal ? true : false}
                pagination={showControls ? { clickable: true } : false}
                spaceBetween={0}
                autoplay={true}
                slidesPerView={1}
                className="w-full h-full"
                style={{
                    '--swiper-navigation-color': '#ffffff',
                    '--swiper-pagination-color': '#ffffff',
                    '--swiper-navigation-size': isModal ? '24px' : '16px',
                    '--swiper-pagination-bullet-size': '8px',
                    '--swiper-pagination-bullet-inactive-opacity': '0.5',
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        {slide.type === 'video' ? (
                            <div className="w-full h-full relative">
                                <iframe
                                    src={`https://www.youtube.com/embed/${slide.content}${autoPlayVideo ? '?autoplay=1' : ''}`}
                                    title={event.title}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                {/* Video indicator */}
                                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                                    Video
                                </div>
                            </div>
                        ) : (
                            <img
                                src={slide.content}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const EventCard = ({ event, variant = 'default' }) => {
    const [showModal, setShowModal] = useState(false);


    const handleDeleteEvent = () => {
        eventService.deleteEvent(event._id);
    };

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Different variants for different page layouts
    const cardStyles = {
        default: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden',
        compact: 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden',
        sidebar: 'flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded-lg'
    };

    if (variant === 'sidebar') {
        return (
            <>
                <div className={cardStyles.sidebar} onClick={handleCardClick}>
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <MediaSlider event={event} isModal={false} variant="sidebar" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium leading-tight line-clamp-2">
                            {event.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{event.speaker} · {event.date}</p>
                    </div>
                </div>
                {showModal && (
                    <EventModal
                        event={event}
                        onClose={handleCloseModal}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <div className={`${cardStyles[variant]} group`}>
                <div className="relative">
                    <MediaSlider event={event} isModal={false} variant={variant} />
                </div>
                <div className="p-3" onClick={handleCardClick}>
                    <div className="flex items-center justify-between mb-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {event.type}
                        </span>
                        <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {event.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">{event.speaker}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{event.location}</p>
                    <div>
                        <button onClick={handleDeleteEvent} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            delete
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <EventModal
                    event={event}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

// Modal component for event details
const EventModal = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="rounded-t-lg overflow-hidden">
                        <MediaSlider event={event} isModal={true} autoPlayVideo={false} />
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {event.type}
                            </span>
                            <span className="text-sm text-gray-500">{event.date}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
                        <p className="text-lg text-gray-600 mb-2">Speaker: {event.speaker}</p>
                        <p className="text-gray-600 mb-4">Location: {event.location}</p>
                        <p className="text-gray-700 mb-4">{event.description}</p>

                        {/* Photos Grid Section */}
                        {event.photos && event.photos.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4">Event Photos</h3>
                                <div className="grid grid-cols-auto-fit gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                                    {event.photos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={photo.url || photo}
                                                alt={`Event photo ${index + 1}`}
                                                className="w-[150px] h-[150px] object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                                style={{ width: '150px', height: '150px' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                            {event.youtubeId && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${event.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Watch on YouTube
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard; 