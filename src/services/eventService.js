import apiClient from './api';

class EventService {
    // Get all events
    async getAllEvents() {
        try {
            const response = await apiClient.get('/events');
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    // Create new event (with file upload)
    async createEvent(eventData) {
        try {
            const response = await apiClient.post('/events', eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    // Delete event
    async deleteEvent(id) {
        try {
            const response = await apiClient.delete(`/events/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting event ${id}:`, error);
            throw error;
        }
    }

}

// Export singleton instance
export default new EventService(); 