import React, { useEffect, useState } from 'react';
import styles from './DiscussionPage.module.css';
import { useNavigate } from "react-router-dom";
import {fetchItems, handleVoteDeleteClick, handleMinusClick, handlePlusClick, handleDeleteClick} from '../api/apis';

export interface DiscussionProps {
    id: string;
    name: string;
    description: string;
    dateTime: string;
    votes: number;
    votesToDelete: number;
    planedTime: string;
}

const DiscussionPage: React.FC = () => {
    const [items, setItems] = useState<DiscussionProps[]>([]);

    useEffect(() => {
        fetchItemsFromApi();
    }, []);

    const navigate = useNavigate();

    const moveToFormPage = () => {
        navigate('/form');
    };

    const fetchItemsFromApi = async () => {
        await fetchItems().then((items) => setItems(items));
    }

    const handlePlusClickApi = async (itemId: string) => {
        await handlePlusClick(itemId).then(() => fetchItemsFromApi());
    }

    const handleMinusClickApi = async (itemId: string, itemVotes: number) => {
        if (itemVotes > 1) {
            await handleMinusClick(itemId).then(() => fetchItemsFromApi());
        }
    }

    const handleDeleteVoteApi = async (itemId: string) => {
        await handleVoteDeleteClick(itemId).then(() => fetchItemsFromApi());
    }

    const howManyMinutes = (itemDateTime: string) => {
        const date = new Date(itemDateTime);
        const currentDate = new Date();
        let diff = currentDate.getTime() - date.getTime();
        diff = (diff % (1000 * 60 * 60)) / (1000 * 60);
        return diff;
    }
    
    const removeDiscussion = (itemId: string) => {
        handleDeleteClick(itemId).then(() => fetchItemsFromApi());
    }
    
    return (
        <section className={styles.disPage}>
            <button className={styles.createButton} onClick={moveToFormPage}>Створити</button>
            <h1>Discussion Page</h1>
            <h2>Items:</h2>
            {items && items.sort((a, b) => b.votes- a.votes).map(item => (
                <div className={styles.discussionList} key={item.id}>
                    <h3>{item.name}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <p>Створено: {item.dateTime}</p>
                    <div className={styles.buttons}>
                        <button onClick={() => handlePlusClickApi(item.id)} className={styles.chooseButton}>+</button>
                        <button onClick={async () => await handleMinusClickApi(item.id, item.votes)}className={styles.chooseButton}>-</button>
                    </div>
                    <h4>Голосів: {item.votes}</h4>
                    <h4><button className={styles.deleteButton} onClick={() => handleDeleteVoteApi(item.id)}>Видалити</button> {item.votesToDelete}</h4>
                    <h2>Запланований час: {item.planedTime}</h2>
                    {howManyMinutes(item.dateTime) <= 5
                    && <button className={styles.deleteButton} onClick={() => removeDiscussion(item.id)}>Видалити прямо зараз</button>}
                </div>
            ))}
        </section>
    );
};

export default DiscussionPage;