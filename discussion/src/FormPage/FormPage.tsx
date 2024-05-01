import React, { useState } from 'react';
import styles from './FormPage.module.css';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api/apis';
import stylesbutton from '../DiscussionPage/DiscussionPage.module.css';
const FormPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const moveToDiscussionPage = () => {
        navigate('/');
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createItem(name, description).then(() => moveToDiscussionPage());
    }

    return (
        <div className={styles.father}>
            <button className={stylesbutton.createButton} onClick={moveToDiscussionPage}>Назад</button>
            <h1>Form Page</h1>
            <form className={styles.formochka} onSubmit={handleFormSubmit}>
                <section className={styles.submitform}>
                    <label className={styles.label} htmlFor="disName">Назва:</label>
                    <input type="text" id="disName" value={name} onChange={handleNameChange} />

                    <label className={styles.label} htmlFor="description">Опис:</label>
                    <textarea id="description" value={description} onChange={handleDescriptionChange} />
                    
                    <button className={styles.submitButton} type="submit">Submit</button>
                </section>
            </form>
        </div>
    );
};

export default FormPage;