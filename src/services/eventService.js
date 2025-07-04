import apiClient from './api';
import toast from 'react-hot-toast';

class EventService {
    // Get all events
    async getAllEvents() {
        try {
            const response = await apiClient.get('/events');
            return {
                success: true,
                data: response.data.data || response.data,
                message: 'Events fetched successfully'
            };
        } catch (error) {
            console.error('Error fetching events:', error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch events';
            toast.error(errorMessage);
            return {
                success: false,
                data: [],
                message: errorMessage,
                error: error
            };
        }
    }

    // Create new event (with file upload)
    async createEvent(eventData) {
        const toastId = toast.loading('Creating event...');

        try {
            const response = await apiClient.post('/events', eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Event created successfully!', { id: toastId });
            return {
                success: true,
                data: response.data.data || response.data,
                message: 'Event created successfully'
            };
        } catch (error) {
            console.error('Error creating event:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create event';
            toast.error(errorMessage, { id: toastId });
            return {
                success: false,
                data: null,
                message: errorMessage,
                error: error
            };
        }
    }

    // Update existing event
    async updateEvent(id, eventData) {
        const toastId = toast.loading('Updating event...');

        try {
            const response = await apiClient.put(`/events/${id}`, eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Event updated successfully!', { id: toastId });
            return {
                success: true,
                data: response.data.data || response.data,
                message: 'Event updated successfully'
            };
        } catch (error) {
            console.error(`Error updating event ${id}:`, error);
            const errorMessage = error.response?.data?.message || 'Failed to update event';
            toast.error(errorMessage, { id: toastId });
            return {
                success: false,
                data: null,
                message: errorMessage,
                error: error
            };
        }
    }

    // Delete event
    async deleteEvent(id) {
        const toastId = toast.loading('Deleting event...');

        try {
            const response = await apiClient.delete(`/events/${id}`);

            toast.success('Event deleted successfully!', { id: toastId });
            return {
                success: true,
                data: response.data.data || response.data,
                message: 'Event deleted successfully'
            };
        } catch (error) {
            console.error(`Error deleting event ${id}:`, error);
            const errorMessage = error.response?.data?.message || 'Failed to delete event';
            toast.error(errorMessage, { id: toastId });
            return {
                success: false,
                data: null,
                message: errorMessage,
                error: error
            };
        }
    }

    // Delete selected photos from an event
    async deletePhotosFromEvent(eventId, filenames) {
        const toastId = toast.loading('Deleting photos...');

        try {
            const response = await apiClient.delete(`/events/${eventId}/photos`, {
                data: { filenames }
            });

            toast.success(`${filenames.length} photo(s) deleted successfully!`, { id: toastId });
            return {
                success: true,
                data: response.data.data || response.data,
                message: 'Photos deleted successfully'
            };
        } catch (error) {
            console.error(`Error deleting photos from event ${eventId}:`, error);
            const errorMessage = error.response?.data?.message || 'Failed to delete photos';
            toast.error(errorMessage, { id: toastId });
            return {
                success: false,
                data: null,
                message: errorMessage,
                error: error
            };
        }
    }

    // Helper method to show generic error toast
    showError(message, error = null) {
        console.error(message, error);
        toast.error(message);
    }

    // Helper method to show success toast
    showSuccess(message) {
        toast.success(message);
    }

    // Helper method to show loading toast
    showLoading(message) {
        return toast.loading(message);
    }
}

// Export singleton instance
export default new EventService(); 