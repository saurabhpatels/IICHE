import React, { useState } from 'react';
import toast from 'react-hot-toast';
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
    if (event.photos && event.photos.length > 0) {
        event.photos.forEach(photo => {
            slides.push({ type: 'image', content: photo.url || photo });
        });
    }

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

const EventCard = ({ event, variant = 'default', onEventDeleted }) => {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteEvent = async (e) => {
        e.stopPropagation(); // Prevent card click when clicking delete button

        // Show confirmation dialog
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the event "${event.title}"? This action cannot be undone.`
        );

        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            const result = await eventService.deleteEvent(event._id || event.id);

            if (result.success) {
                // Call parent callback to refresh the events list
                if (onEventDeleted) {
                    onEventDeleted(event._id || event.id);
                }
            }
        } catch (error) {
            console.error('Error in handleDeleteEvent:', error);
            toast.error('Failed to delete event. Please try again.');
        } finally {
            setIsDeleting(false);
        }
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
                        onEventDeleted={onEventDeleted}
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
                    <div className="mt-2 flex gap-2">
                        <button
                            onClick={handleDeleteEvent}
                            disabled={isDeleting}
                            className={`px-3 py-1 text-xs text-white rounded-lg transition-colors ${isDeleting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700'
                                }`}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <EventModal
                    event={event}
                    onClose={handleCloseModal}
                    onEventDeleted={onEventDeleted}
                />
            )}
        </>
    );
};

// Modal component for event details
const EventModal = ({ event, onClose, onEventDeleted }) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [localEvent, setLocalEvent] = useState(event);

    const handlePhotoSelect = (photo, isChecked) => {
        const filename = photo.filename || photo.name || photo;
        if (isChecked) {
            setSelectedPhotos(prev => [...prev, filename]);
        } else {
            setSelectedPhotos(prev => prev.filter(f => f !== filename));
        }
    };

    const handleSelectAll = () => {
        if (selectedPhotos.length === localEvent.photos.length) {
            // If all are selected, deselect all
            setSelectedPhotos([]);
        } else {
            // Select all photos
            setSelectedPhotos(localEvent.photos.map(photo => photo.filename || photo.name || photo));
        }
    };

    const handleDeleteSelectedPhotos = async () => {
        if (selectedPhotos.length === 0) return;

        setIsDeleting(true);

        try {
            const result = await eventService.deletePhotosFromEvent(localEvent._id || localEvent.id, selectedPhotos);

            if (result.success) {
                // Update local event state by removing deleted photos
                const updatedEvent = {
                    ...localEvent,
                    photos: localEvent.photos.filter(photo => {
                        const filename = photo.filename || photo.name || photo;
                        return !selectedPhotos.includes(filename);
                    })
                };
                setLocalEvent(updatedEvent);

                // Clear selected photos
                setSelectedPhotos([]);
            }
        } catch (error) {
            console.error('Failed to delete photos:', error);
            toast.error('Failed to delete photos. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

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
                        <MediaSlider event={localEvent} isModal={true} autoPlayVideo={false} />
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {localEvent.type}
                            </span>
                            <span className="text-sm text-gray-500">{localEvent.date}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{localEvent.title}</h2>
                        <p className="text-lg text-gray-600 mb-2">Speaker: {localEvent.speaker}</p>
                        <p className="text-gray-600 mb-4">Location: {localEvent.location}</p>
                        <p className="text-gray-700 mb-4">{localEvent.description}</p>

                        {/* Photos Grid Section */}
                        {localEvent.photos && localEvent.photos.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Event Photos</h3>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600">
                                            {selectedPhotos.length} of {localEvent.photos.length} selected
                                        </span>
                                        <button
                                            onClick={handleSelectAll}
                                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                                        >
                                            {selectedPhotos.length === localEvent.photos.length ? 'Deselect All' : 'Select All'}
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-auto-fit gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                                    {localEvent.photos.map((photo, index) => {
                                        const photoUrl = photo.url || photo;
                                        const photoId = photo._id || photo.id || index;
                                        const filename = photo.filename || photo.name || photo;

                                        return (
                                            <div key={photoId} className="relative group">
                                                <img
                                                    src={photoUrl}
                                                    alt={`Event photo ${index + 1}`}
                                                    className="w-[150px] h-[150px] object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                                    style={{ width: '150px', height: '150px' }}
                                                />
                                                {/* Checkbox */}
                                                <div className="absolute top-2 left-2 z-10">
                                                    <input
                                                        type="checkbox"
                                                        id={`photo-${photoId}`}
                                                        checked={selectedPhotos.includes(filename)}
                                                        onChange={(e) => handlePhotoSelect(photo, e.target.checked)}
                                                        className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 shadow-lg"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
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
                            {localEvent.youtubeId && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${localEvent.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Watch on YouTube
                                </a>
                            )}
                            {selectedPhotos.length > 0 && (
                                <button
                                    onClick={handleDeleteSelectedPhotos}
                                    disabled={isDeleting}
                                    className={`px-4 py-2 text-white rounded-lg transition-colors ${isDeleting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                >
                                    {isDeleting ? 'Deleting...' : `Delete Selected (${selectedPhotos.length})`}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard; 