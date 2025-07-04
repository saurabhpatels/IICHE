// Shared events data for both Landing and Events pages
export const eventsData = [
    {
        id: 1,
        title: "Annual Chemical Engineering Symposium 2024",
        speaker: "Dr. Rajesh Kumar",
        date: "Dec 15, 2024",
        type: "Conference",
        image: "https://placehold.co/400x300?text=Symposium+2024",
        thumbnail: "https://placehold.co/400x225?text=Symposium+2024",
        description: "Keynote address on sustainable chemical processes and industry innovations",
        location: "IIChE Baroda Regional Centre",
        youtubeId: "10INuUr-Ctk",
        hasVideo: true,
        isHighlight: true,
        isFeatured: true
    },
    {
        id: 2,
        title: "Process Safety Workshop Series",
        speaker: "Prof. Meera Patel",
        date: "Dec 20, 2024",
        type: "Workshop",
        image: "https://placehold.co/400x300?text=Safety+Workshop",
        thumbnail: "https://placehold.co/400x225?text=Safety+Workshop",
        description: "Comprehensive workshop on process safety management and best practices",
        location: "Chemical Engineering Department",
        youtubeId: "10INuUr-Ctk",
        hasVideo: true,
        isHighlight: true,
        isFeatured: true
    },
    {
        id: 3,
        title: "Green Chemistry in Process Industries",
        speaker: "Dr. Amit Shah",
        date: "Dec 30, 2024",
        type: "Technical Talk",
        image: "https://placehold.co/400x300?text=Green+Chemistry",
        thumbnail: "https://placehold.co/400x225?text=Green+Chemistry",
        description: "Innovative approaches to sustainable manufacturing and green processes",
        location: "Main Auditorium",
        youtubeId: "10INuUr-Ctk",
        hasVideo: true,
        isHighlight: true,
        isFeatured: true
    },
    {
        id: 4,
        title: "Advanced Process Control Techniques",
        speaker: "Dr. Priya Sharma",
        date: "Jan 5, 2025",
        type: "Workshop",
        image: "https://placehold.co/400x300?text=Process+Control",
        thumbnail: "https://placehold.co/400x225?text=Process+Control",
        description: "Modern control strategies for chemical processes and automation",
        location: "Conference Hall A",
        youtubeId: "10INuUr-Ctk",
        hasVideo: true,
        isHighlight: true,
        isFeatured: true
    },
    {
        id: 5,
        title: "Chemical Engineering Innovation Summit",
        speaker: "Prof. Vikram Singh",
        date: "Jan 12, 2025",
        type: "Conference",
        image: "https://placehold.co/400x300?text=Innovation+Summit",
        thumbnail: "https://placehold.co/400x225?text=Innovation+Summit",
        description: "Exploring cutting-edge innovations in chemical engineering",
        location: "Main Auditorium",
        youtubeId: null,
        hasVideo: false,
        isHighlight: false,
        isFeatured: false
    },
    {
        id: 6,
        title: "Sustainable Process Design Workshop",
        speaker: "Dr. Anjali Desai",
        date: "Jan 18, 2025",
        type: "Workshop",
        image: "https://placehold.co/400x300?text=Sustainable+Design",
        thumbnail: "https://placehold.co/400x225?text=Sustainable+Design",
        description: "Designing sustainable and eco-friendly chemical processes",
        location: "Seminar Room 101",
        youtubeId: null,
        hasVideo: false,
        isHighlight: false,
        isFeatured: false
    },
    {
        id: 7,
        title: "Young Engineer Excellence Awards",
        speaker: "IIChE Committee",
        date: "Jan 25, 2025",
        type: "Award Ceremony",
        image: "https://placehold.co/400x300?text=Excellence+Awards",
        thumbnail: "https://placehold.co/400x225?text=Excellence+Awards",
        description: "Celebrating excellence and achievements in chemical engineering",
        location: "Alumni Hall",
        youtubeId: null,
        hasVideo: false,
        isHighlight: false,
        isFeatured: false
    },
    {
        id: 8,
        title: "Chemical Process Optimization Seminar",
        speaker: "Dr. Sanjay Verma",
        date: "Nov 15, 2024",
        type: "Seminar",
        image: "https://placehold.co/400x300?text=Process+Optimization",
        thumbnail: "https://placehold.co/400x225?text=Process+Optimization",
        description: "Advanced techniques for process optimization and efficiency",
        location: "Technical Exhibition Area",
        youtubeId: "dQw4w9WgXcQ",
        hasVideo: true,
        isHighlight: true,
        isFeatured: false
    },
    {
        id: 9,
        title: "Process Safety Management Workshop",
        speaker: "Prof. Meera Patel",
        date: "Oct 28, 2024",
        type: "Workshop",
        image: "https://placehold.co/400x300?text=Safety+Management",
        thumbnail: "https://placehold.co/400x225?text=Safety+Management",
        description: "Comprehensive safety management systems and protocols",
        location: "Research Laboratory",
        youtubeId: "9bZkp7q19f0",
        hasVideo: true,
        isHighlight: true,
        isFeatured: false
    },
    {
        id: 10,
        title: "Student Excellence Awards 2024",
        speaker: "IIChE Committee",
        date: "Sep 30, 2028",
        type: "Award Ceremony",
        image: "https://placehold.co/400x300?text=Student+Awards",
        thumbnail: "https://placehold.co/400x225?text=Student+Awards",
        description: "Recognizing outstanding student achievements and contributions",
        location: "Student Activity Centre",
        youtubeId: null,
        hasVideo: false,
        isHighlight: true,
        isFeatured: false
    },
    {
        id: 11,
        title: "Process Safety Management Workshop",
        speaker: "Prof. Meera Patel",
        date: "Oct 28, 2026",
        type: "Workshop",
        image: "https://placehold.co/400x300?text=Safety+Management",
        thumbnail: "https://placehold.co/400x225?text=Safety+Management",
        description: "Comprehensive safety management systems and protocols",
        location: "Research Laboratory",
        youtubeId: "9bZkp7q19f0",
        hasVideo: true,
        isHighlight: true,
        isFeatured: false
    },
];

// Helper functions
export const getFeaturedVideos = () => eventsData.filter(event => event.isFeatured && event.hasVideo);
export const getUpcomingEvents = () => eventsData.filter(event => new Date(event.date) > new Date());
export const getPastHighlights = () => eventsData.filter(event => event.isHighlight && new Date(event.date) <= new Date());
export const getAllEvents = () => eventsData;