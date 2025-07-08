import React, { useState, useMemo } from 'react';
import EventForm from '../components/EventForm';
import EventCard from '../components/EventCard';
import { EVENT_TYPES } from '../data/eventsData';
import useEvents from '../hooks/useEvents';

const Events = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddEventModal, setShowAddEventModal] = useState(false);

    const { events, loading, error, refreshEvents } = useEvents();

    // Generate categories dynamically from EVENT_TYPES
    const categories = useMemo(() => {
        return ['All Events', ...EVENT_TYPES];
    }, []);

    // Filter events based on category and search term
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesCategory = selectedCategory === 'all' ||
                event.type.toLowerCase().includes(selectedCategory.toLowerCase());
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm, events]);

    const handleAddEvent = (eventData) => {
        setShowAddEventModal(false);
        refreshEvents();
    };


    const handleCancelAddEvent = () => {
        setShowAddEventModal(false);
    };

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading events: {error}</p>
                    <button
                        onClick={() => refreshEvents()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold text-gray-900">Events Gallery</h1>
                        <button
                            onClick={() => setShowAddEventModal(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Event
                        </button>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                        Explore our collection of {events.length} events showcasing chemical engineering excellence
                    </p>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <input
                                type="text"
                                placeholder="Search events, speakers, or locations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category === 'All Events' ? 'all' : category)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${(selectedCategory === 'all' && category === 'All Events') ||
                                    (selectedCategory === category)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <p className="text-sm text-gray-600">
                    Showing {filteredEvents.length} of {events.length} events
                </p>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onEventUpdated={refreshEvents}
                                variant="default"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No events match your criteria.</p>
                        <p className="text-gray-400 mt-2">Try adjusting your search or filters!</p>
                    </div>
                )}
            </div>

            {/* Add Event Modal */}
            {showAddEventModal && (
                <EventForm
                    onSave={handleAddEvent}
                    onCancel={handleCancelAddEvent}
                />
            )}
        </div>
    );
};

export default Events; 