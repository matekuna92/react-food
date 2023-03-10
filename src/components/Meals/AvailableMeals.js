import {useState, useEffect} from 'react';

import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // function passed  to useEffect should not return promise, it should return the cleanup function
    // thats why the nested fetchMeals function is needed
    useEffect(() => {
        const fetchMeals = async () => {
            setError(null);

            try {
                const response = await fetch('https://react-http-9c568-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
                const responseData = await response.json();

                const fetchedMeals = [];

                for (const item in responseData) {
                    fetchedMeals.push({
                        id: item,
                        name: responseData[item].name,
                        description: responseData[item].description,
                        price: responseData[item].price
                    });
                }

                setMeals(fetchedMeals);
                setLoading(false);
                console.log(meals);
            }
            catch (err) {
                setLoading(false);
                setError(err.message);
                console.log(err.message);
            }

        }

        fetchMeals();
    }, []);

    if (loading) {
        return <section className={styles['meals-loading']}>
            <p> Data is loading... </p>
        </section>
    }

    if(error) {
        return <section className={styles['meals-loading']}>
            <p> {error} </p>
        </section>
    }
    // transform array to array of JSX elements
    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;