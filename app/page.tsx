"use client";
import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "./firebaseConfig";

type StateProp = "OFF" | "ON";
export default function Home() {
  const [state, setState] = useState<StateProp>("OFF");
  const [bgColorBtn, setBgColorBtn] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [bState, setBState] = useState<StateProp>("OFF");
  const [distance, setDistance] = useState<number>(0);
  const [buzzer, setBuzzer] = useState<StateProp>("OFF");

  useEffect(() => {
    setBgColorBtn(state == "ON" ? "bg-green-400" : "bg-red-400");

    const interval = setInterval(() => {
      const stateRef = ref(database, "distance/state");
      const counterRef = ref(database, "counter/state");
      const modeRef = ref(database, "mode/state");

      // Fetch initial state
      onValue(stateRef, (snapshot) => {
        const data = snapshot.val();
        setBuzzer(data <= 30 ? "ON" : "OFF");
        setDistance(data);
      });

      // Fetch counter
      onValue(counterRef, (snapshot) => {
        const data = snapshot.val();
        setCounter(data);
      });

      // Fetch counter
      onValue(modeRef, (snapshot) => {
        const data = snapshot.val();
        setBState(data ? "ON" : "OFF");
        setBgColorBtn((data===1)?"bg-green-400" : "bg-red-400");
      });
    }, 1000); // Update every second

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [state]);

  const toggleState = () => {
    const newState = state === "ON" ? "OFF" : "ON";
    setState(newState);

    // Update mode/state in Firebase
    const modeRef = ref(database, "mode/state");
    set(modeRef, newState === "ON" ? 1 : 0);
  };

  return (
    <div className="relative flex flex-col justify-center items-center  w-full min-h-screen bg-yellow-100">
      <div className="absolute top-0 flex justify-center py-4 bg-blue-300 w-full">
        <p className="text-3xl font-bold">Door Smart Alarm</p>
      </div>
      <div className="flex flex-col justify-center items-center mt-20">
        <p className="text-2xl font-bold text-center mb-10">
          Turn ON Or OFF the Device
        </p>
        <button
          onClick={toggleState}
          className={`${bgColorBtn} rounded-full p-16 w-48 h-48 text-white text-4xl font-bold`}
        >
          {bState}
        </button>
      </div>
      <div className="flex justify-center items-center mt-10 text-2xl font-semibold">
        <p>{"State : " + bState}</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 gap-10 w-full">
        <p className="text-2xl font-bold text-center">Data monitor device</p>
        <div className="flex justify-evenly text-xl xl:text-2xl  font-bold w-full">
          <p>{"Counter : " + counter}</p>
          <p>{"Distance : " + distance}</p>
          <p>{"Buzzer : " + buzzer}</p>
        </div>
      </div>
    </div>
  );
}
