import { useEventsContext } from '../context/EventsContext';

const useEvents = () => {
    return useEventsContext();
};

export default useEvents; 