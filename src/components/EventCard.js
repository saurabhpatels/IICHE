import React, { useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';
import eventService from '../services/eventService';
import MediaSlider from './MediaSlider';
import EventModal from './EventModal';

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

    const handleCardClick = () => {
        setShowModal(true);
    };

    return (
        <>
            <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div>
                    <MediaSlider event={event} />
                    <div className="p-4 cursor-pointer" onClick={handleCardClick}>
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
                        className="w-full py-2  text-sm text-red-700 bg-red-50 rounded-lg transition-colors disabled:opacity-50"
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

export default EventCard; 