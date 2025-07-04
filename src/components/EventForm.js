import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EVENT_TYPES } from '../data/eventsData';
import eventService from '../services/eventService';


const EventForm = ({ event, onSave, onCancel }) => {
    const [selectedPhotos, setSelectedPhotos] = useState([]); // Store File objects
    const [photoPreview, setPhotoPreview] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({
        defaultValues: {
            title: '',
            speaker: '',
            date: '',
            type: 'Conference',
            location: '',
            youtubeId: '',
            description: ''
        }
    });

    // Watch for changes to clear errors
    const watchedFields = watch();

    useEffect(() => {
        if (event) {
            reset({
                title: event.title || '',
                speaker: event.speaker || '',
                date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
                type: event.type || 'Conference',
                location: event.location || '',
                youtubeId: event.youtubeId || '',
                description: event.description || ''
            });

            // Set existing photos (for edit mode)
            if (event.photos && event.photos.length > 0) {
                // For existing events, we'll handle this differently since they're URLs
                setPhotoPreview(event.photos.map((photo, index) => ({
                    url: photo,
                    name: `Existing photo ${index + 1}`,
                    isExisting: true
                })));
            }
        }
    }, [event, reset]);

    // Handle multiple file selection
    const handleFileSelect = async (event) => {
        const files = Array.from(event.target.files);

        if (files.length === 0) return;

        try {
            // Store actual File objects
            setSelectedPhotos(prev => [...prev, ...files]);

            // Update preview
            const newPreviews = files.map(file => ({
                url: URL.createObjectURL(file),
                name: file.name,
                isExisting: false
            }));
            setPhotoPreview(prev => [...prev, ...newPreviews]);

            // Clear the file input so users can select the same files again
            event.target.value = '';
        } catch (error) {
            console.error('Error processing files:', error);
        }
    };

    // Remove photo
    const removePhoto = (index) => {
        setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
        setPhotoPreview(prev => {
            // Revoke object URL to prevent memory leaks
            if (prev[index] && prev[index].url.startsWith('blob:')) {
                URL.revokeObjectURL(prev[index].url);
            }
            return prev.filter((_, i) => i !== index);
        });
    };

    // Form submission with API call
    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // Create FormData for file upload
            const formData = new FormData();

            // Append form fields
            formData.append('title', data.title);
            formData.append('speaker', data.speaker);
            formData.append('date', data.date);
            formData.append('type', data.type);
            formData.append('location', data.location);
            formData.append('youtubeId', data.youtubeId || '');
            formData.append('description', data.description || '');
            formData.append('id', event ? event.id : Date.now().toString());

            // Append photos as files
            selectedPhotos.forEach((photo, index) => {
                formData.append(`photos`, photo);
            });

            console.log('Form Data being sent:');
            console.log('Fields:');
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            // Use eventService to create/update event
            let result;
            if (event) {
                // Update existing event
                result = await eventService.updateEvent(event.id, formData);
            } else {
                // Create new event
                result = await eventService.createEvent(formData);
            }

            console.log('Event saved successfully!', result);

            // Call the parent callback if provided
            if (onSave) {
                onSave(result);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Error submitting form: ${error.message || 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Validation rules
    const validationRules = {
        title: {
            required: 'Title is required',
            minLength: {
                value: 3,
                message: 'Title must be at least 3 characters long'
            }
        },
        speaker: {
            required: 'Speaker is required'
        },
        date: {
            required: 'Date is required',
            validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today || 'Date cannot be in the past';
            }
        },
        type: {
            required: 'Event type is required'
        },
        location: {
            required: 'Location is required'
        },
        youtubeId: {
            pattern: {
                value: /^[a-zA-Z0-9_-]{11}$/,
                message: 'Invalid YouTube video ID format'
            }
        },
        description: {
            minLength: {
                value: 10,
                message: 'Description must be at least 10 characters long'
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        {event ? 'Edit Event' : 'Add New Event'}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('title', validationRules.title)}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Speaker <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('speaker', validationRules.speaker)}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.speaker ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.speaker && (
                                    <p className="text-red-500 text-xs mt-1">{errors.speaker.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    {...register('date', validationRules.date)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.date && (
                                    <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('type', validationRules.type)}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.type ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    {EVENT_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.type && (
                                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('location', validationRules.location)}
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">YouTube Video ID</label>
                                <input
                                    type="text"
                                    {...register('youtubeId', validationRules.youtubeId)}
                                    placeholder="e.g., dQw4w9WgXcQ"
                                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.youtubeId ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.youtubeId && (
                                    <p className="text-red-500 text-xs mt-1">{errors.youtubeId.message}</p>
                                )}
                                <p className="text-gray-500 text-xs mt-1">
                                    Optional: Extract from YouTube URL (the part after v=)
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Event Photos <span className="text-red-500">*</span>
                            </label>
                            <p className="text-gray-500 text-xs mb-2">
                                Select multiple photos for the event gallery (at least 1 required). You can select multiple files at once or add more later.
                            </p>

                            <div className="mb-3">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-gray-500 text-xs mt-1">
                                    Hold Ctrl/Cmd to select multiple files at once
                                </p>
                            </div>

                            {/* Photo previews */}
                            {photoPreview.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                                    {photoPreview.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={photo.url}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-md border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                                title="Remove photo"
                                            >
                                                ×
                                            </button>
                                            <p className="text-xs text-gray-500 mt-1 truncate">{photo.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedPhotos.length === 0 && photoPreview.length === 0 && (
                                <p className="text-red-500 text-xs mt-1">At least one photo is required</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                {...register('description', validationRules.description)}
                                rows="3"
                                placeholder="Describe the event, its objectives, and what attendees can expect..."
                                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || (selectedPhotos.length === 0 && photoPreview.length === 0)}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isSubmitting || (selectedPhotos.length === 0 && photoPreview.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? 'Saving...' : (event ? 'Update Event' : 'Add Event')}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventForm; 