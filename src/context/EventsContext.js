import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import eventService from '../services/eventService';

const EventsContext = createContext();

export const useEventsContext = () => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEventsContext must be used within an EventsProvider');
    }
    return context;
};

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const fetchEvents = async (forceRefresh = false) => {
        // Don't fetch if already loading or if data exists and not forcing refresh
        if (loading || (!forceRefresh && events.length > 0 && isInitialized)) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await eventService.getAllEvents();
            if (response.success) {
                setEvents(response.data);
                setIsInitialized(true);
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

    // Method to force refresh events data
    const refreshEvents = async () => {
        await fetchEvents(true);
    };

    // Initialize events on mount
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

    const value = {
        events,
        loading,
        error,
        isInitialized,
        fetchEvents,
        refreshEvents,
        getUpcomingEvents,
        getPastEvents,
        getHighlights,
        getAllEvents
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
}; 