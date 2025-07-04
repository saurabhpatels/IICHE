import { useState, useEffect, useMemo } from 'react';
import eventService from '../services/eventService';

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await eventService.getAllEvents();
            if (response.success) {
                setEvents(response.data);
            } else {
                setError(response.message || 'Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Helper functions similar to eventsData.js but working with real API data
    const getUpcomingEvents = useMemo(() => {
        const today = new Date();
        return events.filter(event => new Date(event.date) > today);
    }, [events]);

    const getPastEvents = useMemo(() => {
        const today = new Date();
        return events.filter(event => new Date(event.date) <= today);
    }, [events]);

    const getHighlights = useMemo(() => {
        // Get the most recent 6 events (both past and upcoming)
        return events
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6);
    }, [events]);

    const getAllEvents = useMemo(() => {
        return events;
    }, [events]);

    return {
        events,
        loading,
        error,
        fetchEvents,
        getUpcomingEvents,
        getPastEvents,
        getHighlights,
        getAllEvents
    };
};

export default useEvents; 