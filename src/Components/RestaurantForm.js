import React, { useState } from 'react'
import axios from 'axios';
import styles from '../css/RestaurantForm.module.css'

const RestaurantForm = () => {
    const [restaurant, setRestaurant] = useState({
        name: '',
        contactName: '',
        pincode: '',
        location: '',
        website: '',
        phoneNumber: '',
        dailyTransactions: '',
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5432/api/submit-restaurant', restaurant)
            .then((response) => {
                console.log('Form submitted successfully!', response.data);
                if(response.data === true)
                setSubmissionStatus('success');
                else
                setSubmissionStatus('failure');
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                setSubmissionStatus('failure');
            });
    }

    const handleGoBack = () => {
        setSubmissionStatus(null);
        setRestaurant({
            name: '',
            contactName: '',
            pincode: '',
            location: '',
            website: '',
            phoneNumber: '',
            dailyTransactions: '',
        });
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formHeading}>Onboard Easy!!</h2>

            {submissionStatus === 'success' ? (
                <div className={styles.successContainer}>
                    <p className={styles.successMessage}>Form submitted successfully!</p>
                    <button className={styles.submitButton} onClick={handleGoBack}>Go Back</button>
                </div>
            ) : submissionStatus === 'failure' ? (
                <div className={styles.failureContainer}>
                    <p className={styles.failureMessage}>Error submitting form. Please try again.</p>
                    <button className={styles.submitButton} onClick={handleGoBack}>Go Back</button>
                </div>
            ) : (
                <form className={styles.form} onSubmit={handleFormSubmit}>
                    <input
                        className={styles.inputField}
                        type="text"
                        name="name"
                        value={restaurant.name}
                        onChange={handleChange}
                        placeholder="Restaurant Name"
                        required
                    />

                    <input className={styles.inputField} type='text' name='contactName' value={restaurant.contactName}
                        onChange={handleChange} placeholder='Contact Name' required/>

                    <input className={styles.inputField} type='text' name='pincode' value={restaurant.pincode}
                        onChange={handleChange} placeholder='Pincode'  />

                    <input className={styles.inputField} type='text' name='location' value={restaurant.location}
                        onChange={handleChange} placeholder='Location' required />

                    <input className={styles.inputField} type='text' name='website' value={restaurant.website}
                        onChange={handleChange} placeholder='Website Link' required/>

                    <input className={styles.inputField} type='tel' name='phoneNumber' value={restaurant.phoneNumber}
                        onChange={handleChange} placeholder='Phone Number' required/>

                    <input className={styles.inputField} type='number' name='dailyTransactions' value={restaurant.dailyTransactions}
                        onChange={handleChange} placeholder='Daily Transactions' required />


                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default RestaurantForm;