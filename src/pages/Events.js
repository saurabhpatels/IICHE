import React, { useState, useMemo } from 'react';

const Events = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Generate 500 event images with different categories and descriptions
    const eventImages = useMemo(() => {
        const categories = ['conference', 'workshop', 'seminar', 'award-ceremony', 'technical-talk', 'student-event', 'industry-visit', 'research-presentation'];
        const eventTypes = {
            conference: ['Annual Chemical Engineering Symposium', 'Process Safety Conference', 'Green Chemistry Summit', 'Innovation in Chemical Engineering'],
            workshop: ['Process Control Workshop', 'Safety Management Training', 'CAD Design Workshop', 'Laboratory Safety Workshop'],
            seminar: ['Research Methodology Seminar', 'Industry Trends Seminar', 'Career Development Seminar', 'Technical Writing Seminar'],
            'award-ceremony': ['Student Excellence Awards', 'Young Engineer Awards', 'Research Achievement Awards', 'Industry Partnership Awards'],
            'technical-talk': ['Advanced Process Control', 'Sustainable Manufacturing', 'Digital Transformation', 'Quality Management'],
            'student-event': ['Student Chapter Meeting', 'Technical Quiz Competition', 'Project Exhibition', 'Alumni Interaction'],
            'industry-visit': ['Pharmaceutical Plant Visit', 'Petrochemical Complex Tour', 'Research Lab Visit', 'Manufacturing Facility Tour'],
            'research-presentation': ['PhD Research Presentation', 'Poster Presentation', 'Thesis Defense', 'Research Colloquium']
        };

        const speakers = [
            'Dr. Rajesh Kumar', 'Prof. Meera Patel', 'Dr. Priya Sharma', 'Prof. Vikram Singh',
            'Dr. Anjali Desai', 'Dr. Sanjay Verma', 'Dr. Amit Shah', 'Prof. Neha Gupta',
            'Dr. Ramesh Tiwari', 'Prof. Sunita Reddy', 'Dr. Karan Malhotra', 'Prof. Pooja Sharma'
        ];

        const locations = [
            'IIChE Baroda Regional Centre', 'Chemical Engineering Department', 'Main Auditorium',
            'Conference Hall A', 'Seminar Room 101', 'Industry Partner Facility', 'Research Laboratory',
            'Student Activity Centre', 'Alumni Hall', 'Technical Exhibition Area'
        ];

        const images = [];

        for (let i = 1; i <= 500; i++) {
            const category = categories[i % categories.length];
            const eventType = eventTypes[category][i % eventTypes[category].length];
            const speaker = speakers[i % speakers.length];
            const location = locations[i % locations.length];
            const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

            images.push({
                id: i,
                src: `https://picsum.photos/400/300?random=${i}`,
                alt: `${eventType} - Event ${i}`,
                title: eventType,
                category: category,
                speaker: speaker,
                location: location,
                date: date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                description: `A comprehensive ${category} featuring ${speaker} at ${location}. This event showcases the latest developments in chemical engineering and provides networking opportunities for professionals and students.`
            });
        }

        return images;
    }, []);

    // Filter images based on category and search term
    const filteredImages = useMemo(() => {
        return eventImages.filter(image => {
            const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
            const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                image.location.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [eventImages, selectedCategory, searchTerm]);

    const categories = [
        { id: 'all', name: 'All Events' },
        { id: 'conference', name: 'Conferences' },
        { id: 'workshop', name: 'Workshops' },
        { id: 'seminar', name: 'Seminars' },
        { id: 'award-ceremony', name: 'Award Ceremonies' },
        { id: 'technical-talk', name: 'Technical Talks' },
        { id: 'student-event', name: 'Student Events' },
        { id: 'industry-visit', name: 'Industry Visits' },
        { id: 'research-presentation', name: 'Research Presentations' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Events Gallery</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Explore our collection of {eventImages.length} event photos showcasing chemical engineering excellence
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
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedCategory === category.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <p className="text-sm text-gray-600">
                    Showing {filteredImages.length} of {eventImages.length} events
                </p>
            </div>

            {/* Image Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="aspect-w-4 aspect-h-3">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {image.category.replace('-', ' ')}
                                    </span>
                                    <span className="text-xs text-gray-500">{image.date}</span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                    {image.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-1">{image.speaker}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">{image.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Image Details */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full h-96 object-cover rounded-t-lg"
                            />

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {selectedImage.category.replace('-', ' ')}
                                    </span>
                                    <span className="text-sm text-gray-500">{selectedImage.date}</span>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                                <p className="text-lg text-gray-600 mb-2">Speaker: {selectedImage.speaker}</p>
                                <p className="text-gray-600 mb-4">Location: {selectedImage.location}</p>
                                <p className="text-gray-700">{selectedImage.description}</p>

                                <div className="mt-6 flex gap-3">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        View Event Details
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                        Download Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events; 