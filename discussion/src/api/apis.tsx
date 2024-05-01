import axios from 'axios';
import { DiscussionProps } from './../DiscussionPage/DiscussionPage';

const defaultUrl: string = 'https://discussion-api-bb835342b6c6.herokuapp.com/WeatherForecast';

const createItem = async (name: string, description: string, planedTime: string) => {
    try {
        await axios.post(`${defaultUrl}/postDiscussion`, {
            name: name,
            description: description,
            planedTime: planedTime,
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
        const response = await axios.get(`${defaultUrl}`); // Replace with your backend API endpoint
        console.log(response.data);
        const items = response.data.map((item: DiscussionProps) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            dateTime: new Date(item.dateTime).toLocaleDateString('uk-UA', { weekday:"short", year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
            votes: item.votes,
            votesToDelete: item.votesToDelete,
            planedTime: new Date(item.planedTime).toLocaleDateString('uk-UA', { weekday:"short", year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
        }));
        return items;

    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

const handlePlusClick = async (itemId: string) => {
    console.log("itemId", itemId)
    try {
        await axios.post(`${defaultUrl}/increment/${itemId}`, {
            id: itemId,
        });
    } catch (error) {
        console.error('Error incrementing item count:', error);
    }
};

const handleMinusClick = async (itemId: string) => {
    try {
        await axios.post(`${defaultUrl}/decrement/${itemId}`);
    } catch (error) {
        console.error('Error decrementing item count:', error);
    }
};

const handleVoteDeleteClick = async (itemId: string) => {
    console.log("itemId", itemId)
    try {
        await axios.post(`${defaultUrl}/voteToDelete/${itemId}`, {
            id: itemId,
        });
    } catch (error) {
        console.error('Error incrementing item count:', error);
    }
};

const handleDeleteClick = async (itemId: string) => {
    console.log("itemId", itemId)
    try {
        await axios.post(`${defaultUrl}/delete/${itemId}`, {
            id: itemId,
        });
    } catch (error) {
        console.error('Error incrementing item count:', error);
    }
};

export { createItem, fetchItems, handlePlusClick, handleMinusClick, handleVoteDeleteClick, handleDeleteClick };