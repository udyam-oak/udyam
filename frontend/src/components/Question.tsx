import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LuTarget } from "react-icons/lu";
import { useLocalStorage } from "@uidotdev/usehooks";
import coinBooster from "../assets/coin_booster.png";
import insurance from "../assets/insurance.png";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [q, setQ] = useState(0);
  const [multiplier, setMulti] = useState(1);
  const [coinB, setCoinBoost] = useState(0);

  const [time, setTime] = useState(0);
  const [isRunning, setRuning] = useState(false);
  const [user, setUser] = useLocalStorage("username", "");
  const [insur, setInsur] = useState(false);
  const [insuC, setInsuC] = useState(0);

  const insuranceF = () => {
    axios
      .get("http://127.0.0.1:5000/getUserItems", {
        params: {
          name: user,
          item: "insurance",
        },
      })
      .then((res) => {
        setInsuC(res.data.item_count);
      });
  };
  const coinBoost = () => {
    axios
      .get("http://127.0.0.1:5000/getUserItems", {
        params: {
          name: user,
          item: "coin_booster",
        },
      })
      .then((res) => {
        setCoinBoost(res.data.item_count);
      });
    toast.success("Activated 2x coin mode");
  };
  useEffect(() => {
    if (coinB > 0) {
      setMulti(2);
    } else {
      toast.error("You don't have any");
    }
  }, [coinB]);
  useEffect(() => {
    if (insuC > 0) {
      setInsuC(true);
    } else {
      toast.error("You don't have any");
    }
  }, [insuC]);
  const getData = () => {
    axios
      .get("http://127.0.0.1:5000/getQuestions", {
        params: {
          challenge_id: id,
        },
      })
      .then((res) => {
        setQuestion(res.data);
      });
  };

  const onSubmitAnswer = (e) => {
    e.preventDefault();
    if (input == question[Object.keys(question)[q]]) {
      toast.success("You got it correct");
      setScore(score + 1);
    } else {
      toast.error("You got it wrong");
    }
    if (q + 1 == Object.keys(question).length) {
      toast.success(`You scored ${score}/${Object.keys(question).length}`);
      setRuning(false);
      sendData();
    }
    if (insur) {
      toast.success("You have gotten a second try");
      setInsur(false);
      return;
    }
    setQ(q + 1);
    setInput("");
  };
  const updateElapsedTime = () => {
    setTime((prevElapsedTime) => prevElapsedTime + 1);
  };

  function getFormattedDate(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  }
  const sendData = () => {
    axios.get("http://127.0.0.1:5000/storeUserChallengeResult", {
      params: {
        challenge_id: id,
        name: user,
        points: 5 * score * multiplier,
        time_taken: time,
        date_attempted: getFormattedDate(),
      },
    });
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      // Update the elapsed time every 1000 milliseconds (1 second)
      intervalId = setInterval(updateElapsedTime, 1000);
    }

    // Clean up the interval when the component unmounts or when the stopwatch is stopped
    return () => clearInterval(intervalId);
  }, [isRunning]);
  useEffect(() => {
    getData();
    setRuning(true);
  }, []);
  return (
    <div className="flex w-screen justify-center items-center mt-10 flex-col">
      <div className="">
        <div className="w-[1000px]">
          {q < Object.keys(question).length && (
            <form
              action=""
              onSubmit={onSubmitAnswer}
              className="flex flex-col gap-4"
            >
              <h1 className="text-3xl">Question: </h1>
              <div className="text-xl">{Object.keys(question)[q]}</div>
              <div className="text-3xl">Answer:</div>
              <input
                type="number"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Enter your Answer"
                className="px-10 py-5 text-xl"
              />
            </form>
          )}
        </div>
        <div className="flex justify-center">
          {q >= Object.keys(question).length &&
            Object.keys(question).length != 0 && (
              <div className="flex flex-col justify-center gap-4 text-center">
                <LuTarget size="300px" />
                <div className="text-2xl">
                  You Completed it {score}/{Object.keys(question).length}
                  <br />
                  {5 * score * multiplier}
                </div>
                <div>Time taken {time}</div>
              </div>
            )}
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        <div className="w-[50px] h-[50px] cursor-pointer" onClick={coinBoost}>
          <img src={coinBooster} alt="coin booster" />
        </div>
        <div className="w-[50px] h-[50px] cursor-pointer" onClick={insuranceF}>
          <img src={insurance} alt="insurace" />
        </div>
      </div>
    </div>
  );
};

export default Question;
