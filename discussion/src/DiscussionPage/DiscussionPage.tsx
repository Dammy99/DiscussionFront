import React, { useEffect, useState } from 'react';
import styles from './DiscussionPage.module.css';
import { useNavigate } from "react-router-dom";
import {fetchItems, handleMinusClick, handlePlusClick} from '../api/apis';

export interface DiscussionProps {
    id: string;
    name: string;
    description: string;
    dateTime: string;
    votes: number;
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
        handlePlusClick(itemId).then(() => fetchItemsFromApi());
    }

    const handleMinusClickApi = async (itemId: string, itemVotes: number) => {
        if (itemVotes !== 0) {
            handleMinusClick(itemId).then(() => fetchItemsFromApi());
        }
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
                        <button onClick={() => handleMinusClickApi(item.id, item.votes)}className={styles.chooseButton}>-</button>
                    </div>
                    <h4>Голосів: {item.votes}</h4>
                </div>
            ))}
        </section>
    );
};

export default DiscussionPage;