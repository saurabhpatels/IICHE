import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Sample YouTube video data for events
    const eventVideos = [
        {
            id: 1,
            title: "Annual Chemical Engineering Symposium 2024",
            speaker: "Dr. Rajesh Kumar",
            date: "Dec 15, 2024",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "https://placehold.co/400x225?text=Symposium+2024",
            description: "Keynote address on sustainable chemical processes"
        },
        {
            id: 2,
            title: "Process Safety Workshop Series",
            speaker: "Prof. Meera Patel",
            date: "Dec 20, 2024",
            youtubeId: "9bZkp7q19f0",
            thumbnail: "https://placehold.co/400x225?text=Safety+Workshop",
            description: "Comprehensive workshop on process safety management"
        },
        {
            id: 3,
            title: "Green Chemistry in Process Industries",
            speaker: "Dr. Amit Shah",
            date: "Dec 30, 2024",
            youtubeId: "kJQP7kiw5Fk",
            thumbnail: "https://placehold.co/400x225?text=Green+Chemistry",
            description: "Innovative approaches to sustainable manufacturing"
        },
        {
            id: 4,
            title: "Advanced Process Control Techniques",
            speaker: "Dr. Priya Sharma",
            date: "Jan 5, 2025",
            youtubeId: "y6120QOlsfU",
            thumbnail: "https://placehold.co/400x225?text=Process+Control",
            description: "Modern control strategies for chemical processes"
        }
    ];

    const upcomingEvents = [
        {
            id: 1,
            image: "https://placehold.co/300x200?text=Textured+Building+Material",
            alt: "Close-up of sustainable textured building material",
            type: "Workshop",
            title: "Advanced Process Control Techniques",
            speaker: "Dr. Priya Sharma",
            date: "Jan 5, 2025",
            youtubeId: "y6120QOlsfU",
            hasVideo: true
        },
        {
            id: 2,
            image: "https://placehold.co/300x200?text=Robotic+Arms+on+Construction+Site",
            alt: "Orange robotic arms working at a construction site",
            type: "Conference",
            title: "Chemical Engineering Innovation Summit",
            speaker: "Prof. Vikram Singh",
            date: "Jan 12, 2025",
            youtubeId: "kJQP7kiw5Fk",
            hasVideo: true
        },
        {
            id: 3,
            image: "https://placehold.co/300x200?text=Smart+City+Architecture",
            alt: "Modern smart city architecture with geometric buildings",
            type: "Seminar",
            title: "Sustainable Process Design Workshop",
            speaker: "Dr. Anjali Desai",
            date: "Jan 18, 2025",
            youtubeId: "9bZkp7q19f0",
            hasVideo: true
        },
        {
            id: 4,
            image: "https://placehold.co/300x200?text=Eco-Friendly+Construction",
            alt: "Eco-friendly construction materials and scaffolding",
            type: "Award Ceremony",
            title: "Young Engineer Excellence Awards",
            speaker: "IIChE Committee",
            date: "Jan 25, 2025",
            hasVideo: false
        }
    ];

    const pastHighlights = [
        {
            id: 1,
            image: "https://placehold.co/300x200?text=Modern+Office+Facade",
            alt: "Contemporary office building with large glass windows",
            type: "Past Event",
            title: "Chemical Process Optimization Seminar",
            speaker: "Dr. Sanjay Verma",
            date: "Nov 15, 2024",
            youtubeId: "dQw4w9WgXcQ",
            hasVideo: true
        },
        {
            id: 2,
            image: "https://placehold.co/300x200?text=Textured+Building+Material",
            alt: "Close-up of sustainable textured building material",
            type: "Workshop",
            title: "Process Safety Management Workshop",
            speaker: "Prof. Meera Patel",
            date: "Oct 28, 2024",
            youtubeId: "9bZkp7q19f0",
            hasVideo: true
        },
        {
            id: 3,
            image: "https://placehold.co/300x200?text=Robotic+Arms+on+Construction+Site",
            alt: "Orange robotic arms working at a construction site",
            type: "Conference",
            title: "Annual Chemical Engineering Symposium",
            speaker: "Dr. Rajesh Kumar",
            date: "Oct 15, 2024",
            youtubeId: "kJQP7kiw5Fk",
            hasVideo: true
        },
        {
            id: 4,
            image: "https://placehold.co/300x200?text=Smart+City+Architecture",
            alt: "Modern smart city architecture with geometric buildings",
            type: "Award Ceremony",
            title: "Student Excellence Awards 2024",
            speaker: "IIChE Committee",
            date: "Sep 30, 2024",
            hasVideo: false
        }
    ];

    return (
        <div className="bg-white text-black ">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row gap-4 p-6 lg:p-10">
                <div className="lg:w-2/3 bg-[#d9f0f6] rounded-xl overflow-hidden">
                    <img
                        src="https://placehold.co/1200x600?text=Abstract+Red+Sculpture"
                        alt="Abstract red sculpture with sharp angles against a blue sky"
                        className="w-full h-96 object-cover rounded-t-xl"
                    />
                    <div className="p-6">
                        <p className="text-sm text-gray-700 mb-2 ">IIChE Baroda Regional Centre</p>
                        <h1 className="text-4xl font-semibold leading-tight mb-4 playfair-display">
                            Connecting Chemical Engineers <br /> Through Knowledge & Innovation.
                        </h1>
                        <p className="text-gray-600 mb-4 ">
                            Join our community of scientists, engineers & technologists to exchange ideas and explore developments in chemical engineering science.
                        </p>
                        <button
                            onClick={() => navigate('/subscribe')}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition "
                        >
                            Subscribe to Events
                            <span className="ml-2 text-lg">→</span>
                        </button>
                    </div>
                </div>

                {/* Sidebar Articles */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                    <div className="flex gap-4">
                        <img
                            src="https://placehold.co/150x100?text=Drone+Over+Site"
                            alt="Drone flying over a construction site"
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex flex-col">
                            <p className="text-sm font-medium leading-tight ">
                                Annual Chemical Engineering Symposium 2024
                            </p>
                            <p className="text-xs text-gray-500 mt-1 ">Dr. Rajesh Kumar · Dec 15, 2024</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1 ">Upcoming Event</p>
                        <p className="text-sm font-medium leading-tight ">
                            Process Safety Workshop Series
                        </p>
                        <p className="text-xs text-gray-500 mt-1 ">Prof. Meera Patel · Dec 20, 2024</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1 ">Student Award</p>
                        <p className="text-sm font-medium leading-tight ">
                            Outstanding Student Medal Ceremony
                        </p>
                        <p className="text-xs text-gray-500 mt-1 ">IIChE Committee · Dec 25, 2024</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1 ">Technical Talk</p>
                        <p className="text-sm font-medium leading-tight ">
                            Green Chemistry in Process Industries
                        </p>
                        <p className="text-xs text-gray-500 mt-1 ">Dr. Amit Shah · Dec 30, 2024</p>
                    </div>
                </div>
            </div>

            {/* Featured Video Section */}
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
                                <p className="text-xs text-gray-500 ">{video.type}</p>
                                <h3 className="text-sm font-medium mt-1  line-clamp-2">{video.title}</h3>
                                <p className="text-xs text-gray-500 mt-1 ">{video.speaker} · {video.date}</p>
                                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Latest Events Section */}
            <div className="px-6 lg:px-10 mt-8">
                {/* Upcoming Events Row */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 playfair-display">Upcoming Events</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="relative">
                                <div className="relative">
                                    <img
                                        src={event.image}
                                        alt={event.alt}
                                        className="w-full h-40 object-cover rounded-md mb-2"
                                    />
                                    {event.hasVideo && (
                                        <button
                                            onClick={() => setSelectedVideo({
                                                id: event.id,
                                                title: event.title,
                                                speaker: event.speaker,
                                                date: event.date,
                                                youtubeId: event.youtubeId,
                                                thumbnail: event.image
                                            })}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                                            title="Watch Video"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 ">{event.type}</p>
                                <p className="text-sm font-medium mt-1 ">{event.title}</p>
                                <p className="text-xs text-gray-500 mt-1 ">{event.speaker} · {event.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Past Highlights Row */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6 playfair-display">Past Highlights</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pastHighlights.map((event) => (
                            <div key={event.id} className="relative">
                                <div className="relative">
                                    <img
                                        src={event.image}
                                        alt={event.alt}
                                        className="w-full h-40 object-cover rounded-md mb-2"
                                    />
                                    {event.hasVideo && (
                                        <button
                                            onClick={() => setSelectedVideo({
                                                id: event.id,
                                                title: event.title,
                                                speaker: event.speaker,
                                                date: event.date,
                                                youtubeId: event.youtubeId,
                                                thumbnail: event.image
                                            })}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                                            title="Watch Video"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 ">{event.type}</p>
                                <p className="text-sm font-medium mt-1 ">{event.title}</p>
                                <p className="text-xs text-gray-500 mt-1 ">{event.speaker} · {event.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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
