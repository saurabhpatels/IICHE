import React, { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import eventService from '../services/eventService';

const PhotoGrid = ({ photos, onPhotoClick, onPhotosDeleted, eventId }) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const photoIds = photos.map(photo => photo.filename);

    const handlePhotoSelect = useCallback((photoId) => {
        setSelectedPhotos(prev => {
            if (prev.includes(photoId)) {
                return prev.filter(id => id !== photoId);
            } else {
                return [...prev, photoId];
            }
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        const isAllSelected = photoIds.length > 0 && photoIds.every(id => selectedPhotos.includes(id));

        if (isAllSelected) {
            setSelectedPhotos([]);
        } else {
            setSelectedPhotos([...photoIds]);
        }
    }, [photoIds, selectedPhotos]);

    const handleDeleteSelectedPhotos = async () => {
        if (selectedPhotos.length === 0) return;

        if (!window.confirm(`Delete ${selectedPhotos.length} selected photo(s)? This cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await eventService.deletePhotosFromEvent(eventId, selectedPhotos);

            if (result.success) {
                setSelectedPhotos([]);
                onPhotosDeleted(selectedPhotos);
                toast.success(`${selectedPhotos.length} photo(s) deleted successfully!`);
            }
        } catch (error) {
            toast.error('Failed to delete photos');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Event Photos ({photos.length})</h3>
                <div className="flex items-center gap-2">
                    {photos.length > 0 && (
                        <button
                            onClick={handleSelectAll}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                        >
                            {selectedPhotos.length === photos.length ? 'Deselect All' : 'Select All'}
                        </button>
                    )}
                    {selectedPhotos.length > 0 && (
                        <>
                            <span className="text-sm text-gray-600">
                                {selectedPhotos.length} selected
                            </span>
                            <button
                                onClick={handleDeleteSelectedPhotos}
                                disabled={isDeleting}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Selected'}
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                {photos.map((photo, index) => {
                    const photoId = photo.filename;
                    const isSelected = selectedPhotos.includes(photoId);
                    return (
                        <PhotoThumbnail
                            key={photoId}
                            photo={photo}
                            index={index}
                            isSelected={isSelected}
                            onPhotoClick={onPhotoClick}
                            onPhotoSelect={handlePhotoSelect}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const PhotoThumbnail = ({ photo, index, isSelected, onPhotoClick, onPhotoSelect }) => {
    const handlePhotoSelect = (e) => {
        e.stopPropagation();
        onPhotoSelect(photo.filename);
    };

    return (
        <div className="relative group">
            <img
                src={photo.url}
                alt={`Event photo ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all ${isSelected
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : ''
                    }`}
                onClick={() => onPhotoClick(index)}
            />
            {/* Selection Checkbox */}
            <div
                className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-transform"
                onClick={handlePhotoSelect}
            >
                {isSelected ? (
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                )}
            </div>
        </div>
    );
};

export default PhotoGrid; 