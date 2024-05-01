import axios from 'axios';
import { DiscussionProps } from './../DiscussionPage/DiscussionPage';

const createItem = async (name: string, description: string) => {
    try {
        await axios.post('http://localhost:37608/WeatherForecast/postDiscussion', {
            name: name,
            description: description
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        } );
        fetchItems();
    } catch (error) {
        console.error('Error creating item:', error);
    }
};


const fetchItems = async () => {
    try {
        const response = await axios.get('http://localhost:37608/WeatherForecast'); // Replace with your backend API endpoint
        console.log(response.data);
        const items = response.data.map((item: DiscussionProps) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            dateTime: new Date(item.dateTime).toLocaleDateString('uk-UA', { weekday:"short", year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            votes: item.votes
        }));
        return items;

    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

const handlePlusClick = async (itemId: string) => {
    // Send request to increment item count
    console.log("itemId", itemId)
    try {

        await axios.post(`http://localhost:37608/WeatherForecast/increment/${itemId}`, {
            id: itemId,
        });
        // Refresh items after successful request
    } catch (error) {
        console.error('Error incrementing item count:', error);
    }
};

const handleMinusClick = async (itemId: string) => {
    // Send request to decrement item count
    try {
        await axios.post(`http://localhost:37608/WeatherForecast/decrement/${itemId}`);
        // Refresh items after successful request
    } catch (error) {
        console.error('Error decrementing item count:', error);
    }
};

export { createItem, fetchItems, handlePlusClick, handleMinusClick };