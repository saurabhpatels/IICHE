# Events Context

This context provides global state management for events data across the application, preventing duplicate API calls when multiple components need the same data.

## Features

- **Shared State**: All components using `useEvents` hook share the same events data
- **Caching**: Events are fetched only once and cached until explicitly refreshed
- **Loading States**: Global loading and error states managed centrally
- **Helper Functions**: Pre-computed filtered views (upcoming, past, highlights)

## Usage

### Basic Usage
```javascript
import useEvents from '../hooks/useEvents';

const MyComponent = () => {
    const { events, loading, error, getUpcomingEvents } = useEvents();
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return <div>{/* Your component */}</div>;
};
```

### Available Properties

- `events`: Array of all events
- `loading`: Boolean indicating if data is being fetched
- `error`: Error message if fetch failed
- `isInitialized`: Boolean indicating if initial fetch completed
- `fetchEvents(forceRefresh)`: Fetch events (skips if data exists unless forced)
- `refreshEvents()`: Force refresh events data
- `getUpcomingEvents`: Filtered array of future events
- `getPastEvents`: Filtered array of past events
- `getHighlights`: Array of 6 most recent events
- `getAllEvents`: All events (same as `events`)

### When to Use Each Method

- **`fetchEvents()`**: Use for initial data loading (automatic)
- **`refreshEvents()`**: Use after creating, updating, or deleting events to get fresh data
- **`getUpcomingEvents`**: Use to display future events
- **`getPastEvents`**: Use to display historical events
- **`getHighlights`**: Use for featured/recent events display

## How It Works

1. **First Component**: When the first component uses `useEvents`, it triggers the API call
2. **Subsequent Components**: Other components get the cached data immediately
3. **Data Sharing**: All components see the same data and loading states
4. **Refresh**: Use `refreshEvents()` to force a fresh API call when needed

## Benefits

- ✅ No duplicate API calls
- ✅ Consistent data across components
- ✅ Better performance
- ✅ Centralized error handling
- ✅ Automatic caching 