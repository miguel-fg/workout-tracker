import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

//hooks
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();

    // fetches workouts after Home component renders for the first time
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts");
            const json = await response.json();

            if(response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json});
            }
        };

        fetchWorkouts();
    }, [dispatch]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <p key={workout._id}>
                        <WorkoutDetails key={workout._id} workout={workout} />
                    </p>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;