import React, { useState, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';
import eventService from '../services/eventService';
import MediaSlider from './MediaSlider';
import PhotoGrid from './PhotoGrid';

// Helper function to format date
const formatDate = (dateString) => {
    return dateString ? moment(dateString).format('MMM DD, YYYY') : '';
};

const EventModal = ({ event, onClose, onEventUpdated }) => {
    const [localEvent, setLocalEvent] = useState(event);
    const [isUploading, setIsUploading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenSlideIndex, setFullscreenSlideIndex] = useState(0);

    // Memoize photo IDs for better performance
    const photoIds = useMemo(() =>
        localEvent.photos?.map(photo => photo.filename) || [],
        [localEvent.photos]
    );

    const handleAddPhotos = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);
        try {
            const result = await eventService.addPhotosToEvent(localEvent._id || localEvent.id, files);
            if (result.success) {
                setLocalEvent(prev => ({
                    ...prev,
                    photos: [...(prev.photos || []), ...(result.data.newPhotos || [])]
                }));
                onEventUpdated?.(localEvent._id || localEvent.id, 'photos_added');
                toast.success('Photos added successfully!');
            }
        } catch (error) {
            toast.error('Failed to add photos');
        } finally {
            setIsUploading(false);
        }
    };

    const handlePhotoClick = useCallback((index) => {
        // Calculate the actual slide index considering videos
        let slideIndex = index;
        if (localEvent.youtubeId) {
            slideIndex += 1; // Add 1 if there's a video at the beginning
        }
        setFullscreenSlideIndex(slideIndex);
        setIsFullscreen(true);
    }, [localEvent.youtubeId]);

    const handleCloseFullscreen = useCallback(() => {
        setIsFullscreen(false);
    }, []);

    const handlePhotosDeleted = useCallback((deletedPhotoIds) => {
        setLocalEvent(prev => ({
            ...prev,
            photos: prev.photos.filter(photo => !deletedPhotoIds.includes(photo.filename))
        }));
        onEventUpdated?.(localEvent._id || localEvent.id, 'photos_deleted');
    }, [localEvent._id, localEvent.id, onEventUpdated]);

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-0">
                            <MediaSlider event={localEvent} isModal={true} />

                            <div className="p-6">
                                <EventHeader event={localEvent} />
                                <EventDetails event={localEvent} />

                                {/* Photos Grid */}
                                {localEvent.photos?.length > 0 && (
                                    <PhotoGrid
                                        photos={localEvent.photos}
                                        onPhotoClick={handlePhotoClick}
                                        onPhotosDeleted={handlePhotosDeleted}
                                        eventId={localEvent._id || localEvent.id}
                                    />
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">


                                    <label className={`px-4 py-2 text-white rounded-lg transition-colors cursor-pointer ${isUploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                                        }`}>
                                        {isUploading ? 'Uploading...' : 'Add Photos'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleAddPhotos}
                                            className="hidden"
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen MediaSlider */}
            <MediaSlider
                event={localEvent}
                isFullscreen={isFullscreen}
                initialSlide={fullscreenSlideIndex}
                onCloseFullscreen={handleCloseFullscreen}
            />
        </>
    );
};

// Sub-components for better organization
const EventHeader = ({ event }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                {event.type}
            </span>
            {event.youtubeId && (
                <a
                    href={`https://www.youtube.com/watch?v=${event.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch
                </a>
            )}
        </div>
        <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
    </div>
);

const EventDetails = ({ event }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
        <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-lg text-gray-600">{event.speaker}</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-600">{event.location}</p>
        </div>
        {event.description && (
            <p className="text-gray-700 mb-6">{event.description}</p>
        )}
    </>
);

export default EventModal; 