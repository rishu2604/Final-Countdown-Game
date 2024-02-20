import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {
    const dialog = useRef();

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    // this is not the solution because it is a variable and it gets recreated every time the state changes
    // let timer;  

    // This ref will not be recreated, reset or cleared at every state change, instead it will be stored behind the scenes by react
    const timer = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if(timeRemaining<=0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(()=>{
            setTimeRemaining(prevTime=>prevTime-10);
        }, 10);
    }
    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }
    return (
        <>
            <ResultModal ref={dialog} timeRemaining={timeRemaining} targetTime={targetTime} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">{targetTime} second{targetTime>1 ? 's' : ''}</p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
