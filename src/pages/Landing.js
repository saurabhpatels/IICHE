import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedVideos, getUpcomingEvents, getPastHighlights } from '../data/eventsData';

const Landing = () => {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const eventVideos = getFeaturedVideos();
    const upcomingEvents = getUpcomingEvents();
    const pastHighlights = getPastHighlights();

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

                {/* Sidebar Articles */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                    {eventVideos.slice(0, 4).map((video, index) => (
                        <div key={video.id} className="flex gap-4">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium leading-tight">
                                    {video.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{video.speaker} · {video.date}</p>
                            </div>
                        </div>
                    ))}
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
                                <div key={event.id} className="relative">
                                    <div className="relative">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-40 object-cover rounded-md mb-2"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">{event.type}</p>
                                    <p className="text-sm font-medium mt-1">{event.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{event.speaker} · {event.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Highlights Row */}
                {pastHighlights.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 playfair-display">Past Highlights</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {pastHighlights.slice(0, 4).map((event) => (
                                <div key={event.id} className="relative">
                                    <div className="relative">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-40 object-cover rounded-md mb-2"
                                        />
                                        {event.hasVideo && (
                                            <button
                                                onClick={() => setSelectedVideo(event)}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                                                title="Watch Video"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{event.type}</p>
                                    <p className="text-sm font-medium mt-1">{event.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{event.speaker} · {event.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Featured Video Section */}
            {eventVideos.length > 0 && (
                <div className="px-6 lg:px-10 mt-8">
                    <h2 className="text-2xl font-semibold mb-6 playfair-display">Featured Event Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {eventVideos.map((video) => (
                            <div key={video.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="relative">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-32 object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedVideo(video)}
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
                                    >
                                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-gray-500">{video.type}</p>
                                    <h3 className="text-sm font-medium mt-1 line-clamp-2">{video.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{video.speaker} · {video.date}</p>
                                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full">
                        <div className="relative">
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                                    title={selectedVideo.title}
                                    className="w-full h-96 rounded-t-lg"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
                                <p className="text-lg text-gray-600 mb-2">Speaker: {selectedVideo.speaker}</p>
                                <p className="text-gray-600 mb-4">Date: {selectedVideo.date}</p>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setSelectedVideo(null)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Close Video
                                    </button>
                                    <a
                                        href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Watch on YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
