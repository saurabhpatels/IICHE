// Shared events data for both Landing and Events pages
export const eventsData = [
    {
        id: 1,
        title: "Annual Chemical Engineering Symposium 2024",
        speaker: "Dr. Rajesh Kumar",
        date: "Dec 15, 2024",
        type: "Conference",
        photos: [
            "https://placehold.co/400x300?text=Symposium+2024",
            "https://placehold.co/400x300?text=Symposium+Gallery+1",
            "https://placehold.co/400x300?text=Symposium+Gallery+2"
        ],
        description: "Keynote address on sustainable chemical processes and industry innovations",
        location: "IIChE Baroda Regional Centre",
        youtubeId: "10INuUr-Ctk"
    },
    {
        id: 2,
        title: "Process Safety Workshop Series",
        speaker: "Prof. Meera Patel",
        date: "Dec 20, 2024",
        type: "Workshop",
        photos: [
            "https://placehold.co/400x300?text=Safety+Workshop",
            "https://placehold.co/400x300?text=Safety+Workshop+Gallery+1",
            "https://placehold.co/400x300?text=Safety+Workshop+Gallery+2"
        ],
        description: "Comprehensive workshop on process safety management and best practices",
        location: "Chemical Engineering Department",
        youtubeId: "10INuUr-Ctk"
    },
    {
        id: 3,
        title: "Green Chemistry in Process Industries",
        speaker: "Dr. Amit Shah",
        date: "Dec 30, 2024",
        type: "Technical Talk",
        photos: [
            "https://placehold.co/400x300?text=Green+Chemistry",
            "https://placehold.co/400x300?text=Green+Chemistry+Gallery+1",
            "https://placehold.co/400x300?text=Green+Chemistry+Gallery+2"
        ],
        description: "Innovative approaches to sustainable manufacturing and green processes",
        location: "Main Auditorium",
        youtubeId: "10INuUr-Ctk"
    },
    {
        id: 4,
        title: "Advanced Process Control Techniques",
        speaker: "Dr. Priya Sharma",
        date: "Jan 5, 2025",
        type: "Workshop",
        photos: [
            "https://placehold.co/400x300?text=Process+Control",
            "https://placehold.co/400x300?text=Process+Control+Gallery+1",
            "https://placehold.co/400x300?text=Process+Control+Gallery+2"
        ],
        description: "Modern control strategies for chemical processes and automation",
        location: "Conference Hall A",
        youtubeId: "10INuUr-Ctk"
    },
    {
        id: 5,
        title: "Chemical Engineering Innovation Summit",
        speaker: "Prof. Vikram Singh",
        date: "Jan 12, 2025",
        type: "Conference",
        photos: [
            "https://placehold.co/400x300?text=Innovation+Summit",
            "https://placehold.co/400x300?text=Innovation+Summit+Gallery+1",
            "https://placehold.co/400x300?text=Innovation+Summit+Gallery+2"
        ],
        description: "Exploring cutting-edge innovations in chemical engineering",
        location: "Main Auditorium",
        youtubeId: null
    },
    {
        id: 6,
        title: "Sustainable Process Design Workshop",
        speaker: "Dr. Anjali Desai",
        date: "Jan 18, 2025",
        type: "Workshop",
        photos: [
            "https://placehold.co/400x300?text=Sustainable+Design",
            "https://placehold.co/400x300?text=Sustainable+Design+Gallery+1",
            "https://placehold.co/400x300?text=Sustainable+Design+Gallery+2"
        ],
        description: "Designing sustainable and eco-friendly chemical processes",
        location: "Seminar Room 101",
        youtubeId: null
    },
    {
        id: 7,
        title: "Young Engineer Excellence Awards",
        speaker: "IIChE Committee",
        date: "Jan 25, 2025",
        type: "Award Ceremony",
        photos: [
            "https://placehold.co/400x300?text=Excellence+Awards",
            "https://placehold.co/400x300?text=Excellence+Awards+Gallery+1",
            "https://placehold.co/400x300?text=Excellence+Awards+Gallery+2"
        ],
        description: "Celebrating excellence and achievements in chemical engineering",
        location: "Alumni Hall",
        youtubeId: null
    },
    {
        id: 8,
        title: "Chemical Process Optimization Seminar",
        speaker: "Dr. Sanjay Verma",
        date: "Nov 15, 2024",
        type: "Seminar",
        photos: [
            "https://placehold.co/400x300?text=Process+Optimization",
            "https://placehold.co/400x300?text=Process+Optimization+Gallery+1",
            "https://placehold.co/400x300?text=Process+Optimization+Gallery+2"
        ],
        description: "Advanced techniques for process optimization and efficiency",
        location: "Technical Exhibition Area",
        youtubeId: "dQw4w9WgXcQ"
    },
    {
        id: 9,
        title: "Process Safety Management Workshop",
        speaker: "Prof. Meera Patel",
        date: "Oct 28, 2024",
        type: "Workshop",
        photos: [
            "https://placehold.co/400x300?text=Safety+Management",
            "https://placehold.co/400x300?text=Safety+Management+Gallery+1",
            "https://placehold.co/400x300?text=Safety+Management+Gallery+2"
        ],
        description: "Comprehensive safety management systems and protocols",
        location: "Research Laboratory",
        youtubeId: "9bZkp7q19f0"
    },
    {
        id: 10,
        title: "Student Excellence Awards 2024",
        speaker: "IIChE Committee",
        date: "Sep 30, 2024",
        type: "Award Ceremony",
        photos: [
            "https://placehold.co/400x300?text=Student+Awards",
            "https://placehold.co/400x300?text=Student+Awards+Gallery+1",
            "https://placehold.co/400x300?text=Student+Awards+Gallery+2"
        ],
        description: "Recognizing outstanding student achievements and contributions",
        location: "Student Activity Centre",
        youtubeId: null
    },
    {
        id: 11,
        title: "Process Safety Management Workshop",
        speaker: "Prof. Meera Patel",
        date: "Oct 28, 2026",
        type: "Workshop",
        photos: [
            "https://placehold.co/400x300?text=Safety+Management",
            "https://placehold.co/400x300?text=Safety+Management+Gallery+1",
            "https://placehold.co/400x300?text=Safety+Management+Gallery+2"
        ],
        description: "Comprehensive safety management systems and protocols",
        location: "Research Laboratory",
        youtubeId: "9bZkp7q19f0"
    },
];

// Helper functions
export const getUpcomingEvents = () => {
    const today = new Date();
    return eventsData.filter(event => new Date(event.date) > today);
};

export const getPastEvents = () => {
    const today = new Date();
    return eventsData.filter(event => new Date(event.date) <= today);
};

export const getHighlights = () => {
    // Get the most recent 6 events (both past and upcoming)
    return eventsData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
};

export const getAllEvents = () => eventsData;


// Static list of event types
export const EVENT_TYPES = [
    'Conference',
    'Workshop',
    'Seminar',
    'Technical Talk',
    'Award Ceremony',
    'Student Event',
    'Guest Lecture',
    'Industry Visit',
    'Research Presentation',
    'Other'
];