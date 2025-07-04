import React from 'react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard';

const Landing = () => {
    const navigate = useNavigate();
    const { getUpcomingEvents, getPastEvents, getHighlights, loading, error } = useEvents();

    // Show loading state
    if (loading) {
        return (
            <div className="bg-white text-black min-h-screen flex items-center justify-center">
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
            <div className="bg-white text-black min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading events: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const upcomingEvents = getUpcomingEvents;
    const pastEvents = getPastEvents;
    const highlights = getHighlights;

    return (
        <div className="bg-white text-black">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row gap-4 p-6 lg:p-10">
                <div className="lg:w-2/3 bg-[#d9f0f6] rounded-xl overflow-hidden">
                    <img
                        src="https://placehold.co/1200x600?text=Abstract+Red+Sculpture"
                        alt="Abstract red sculpture with sharp angles against a blue sky"
                        className="w-full h-96 object-cover rounded-t-xl"
                    />
                    <div className="p-6">
                        <p className="text-sm text-gray-700 mb-2">IIChE Baroda Regional Centre</p>
                        <h1 className="text-4xl font-semibold leading-tight mb-4 playfair-display">
                            Connecting Chemical Engineers <br /> Through Knowledge & Innovation.
                        </h1>
                        <p className="text-gray-600 mb-4">
                            Join our community of scientists, engineers & technologists to exchange ideas and explore developments in chemical engineering science.
                        </p>
                        <button
                            onClick={() => navigate('/subscribe')}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
                        >
                            Subscribe to Events
                            <span className="ml-2 text-lg">→</span>
                        </button>
                    </div>
                </div>

                {/* Sidebar Recent Events */}
                <div className="lg:w-1/3 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold mb-2">Recent Events</h3>
                    {highlights.length > 0 ? (
                        highlights.slice(0, 4).map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                variant="sidebar"
                            />
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            <p>No recent events available</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Latest Events Section */}
            <div className="px-6 lg:px-10 mt-8">
                {/* Upcoming Events Row */}
                {upcomingEvents.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 playfair-display">Upcoming Events</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {upcomingEvents.slice(0, 4).map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    variant="compact"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Events Row */}
                {pastEvents.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 playfair-display">Past Events</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {pastEvents.slice(0, 4).map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    variant="compact"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Show message if no events */}
                {upcomingEvents.length === 0 && pastEvents.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No events available at the moment.</p>
                        <p className="text-gray-400 mt-2">Check back later for upcoming events!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landing;
