import React, { useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import eventService from '../services/eventService';
import MediaSlider from './MediaSlider';

// Helper function to format date
const formatDate = (dateString) => {
    return dateString ? moment(dateString).format('MMM DD, YYYY') : '';
};

const EventCard = ({ event, onEventUpdated }) => {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e) => {
        e.stopPropagation();

        if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`)) return;

        setIsDeleting(true);
        try {
            const result = await eventService.deleteEvent(event._id);
            if (result.success && onEventUpdated) {
                onEventUpdated(event._id, 'deleted');
            }
        } catch (error) {
            toast.error('Failed to delete event');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
                <div >
                    <MediaSlider event={event} />
                    <div className="p-4" onClick={() => setShowModal(true)}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                {event.type}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{event.title}</h3>
                        <div className="flex items-center gap-1 mb-1">
                            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <p className="text-sm text-gray-600">{event.speaker}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-xs text-gray-500">{event.location}</p>
                        </div>
                    </div>
                </div>

                <div className="px-4 pb-4">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Event'}
                    </button>
                </div>
            </div>

            {showModal && (
                <EventModal
                    event={event}
                    onClose={() => setShowModal(false)}
                    onEventUpdated={onEventUpdated}
                />
            )}
        </>
    );
};

// Modal component for event details
const EventModal = ({ event, onClose, onEventUpdated }) => {
    const [localEvent, setLocalEvent] = useState(event);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handlePhotoSelect = (photo, index) => {
        const photoId = photo.filename;
        setSelectedPhotos(prev => {
            if (prev.includes(photoId)) {
                return prev.filter(id => id !== photoId);
            } else {
                return [...prev, photoId];
            }
        });
    };

    const handleDeleteSelectedPhotos = async () => {
        if (selectedPhotos.length === 0) return;

        if (!window.confirm(`Delete ${selectedPhotos.length} selected photo(s)? This cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await eventService.deletePhotosFromEvent(
                localEvent._id || localEvent.id,
                selectedPhotos
            );

            if (result.success) {
                // Update local event state by removing deleted photos
                setLocalEvent(prev => ({
                    ...prev,
                    photos: prev.photos.filter(photo => {
                        return !selectedPhotos.includes(photo.filename);
                    })
                }));

                setSelectedPhotos([]);
                onEventUpdated?.(localEvent._id || localEvent.id, 'photos_deleted');
                toast.success(`${selectedPhotos.length} photo(s) deleted successfully!`);
            }
        } catch (error) {
            toast.error('Failed to delete photos');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
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
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                                        {localEvent.type}
                                    </span>
                                    {localEvent.youtubeId && (
                                        <a
                                            href={`https://www.youtube.com/watch?v=${localEvent.youtubeId}`}
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
                                <span className="text-sm text-gray-500">{formatDate(localEvent.date)}</span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{localEvent.title}</h2>
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <p className="text-lg text-gray-600">{localEvent.speaker}</p>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-gray-600">{localEvent.location}</p>
                            </div>
                            {localEvent.description && (
                                <p className="text-gray-700 mb-6">{localEvent.description}</p>
                            )}

                            {/* Photos Grid with Selection */}
                            {localEvent.photos?.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold">Event Photos</h3>
                                        {selectedPhotos.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600">
                                                    {selectedPhotos.length} selected
                                                </span>
                                                <button
                                                    onClick={handleDeleteSelectedPhotos}
                                                    disabled={isDeleting}
                                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                                >
                                                    {isDeleting ? 'Deleting...' : 'Delete Selected'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {localEvent.photos.map((photo, index) => {
                                            const photoId = photo.filename;
                                            const isSelected = selectedPhotos.includes(photoId);

                                            return (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={photo.url}
                                                        alt={`Event photo ${index + 1}`}
                                                        className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all ${isSelected
                                                            ? 'ring-2 ring-blue-500 ring-offset-2'
                                                            : 'hover:scale-105'
                                                            }`}
                                                        onClick={() => handlePhotoSelect(photo, index)}
                                                    />
                                                    {/* Selection Checkbox */}
                                                    <div
                                                        className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handlePhotoSelect(photo, index);
                                                        }}
                                                    >
                                                        {isSelected ? (
                                                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            <div className="w-3 h-3 border border-gray-300 rounded-sm"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Close
                                </button>

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
    );
};

export default EventCard; 