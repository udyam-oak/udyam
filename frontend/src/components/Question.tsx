import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LuTarget } from "react-icons/lu";
import { useLocalStorage } from "@uidotdev/usehooks";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [diff, setDiff] = useState();
  const [input, setInput] = useState("");
  const [showDiff, setShowDiff] = useState(true);
  const [score, setScore] = useState(0);
  const [q, setQ] = useState(0);

  const [time, setTime] = useState(0);
  const [isRunning, setRuning] = useState(false);
  const [user, setUser] = useLocalStorage("username", "");

  const getData = () => {
    axios
      .get("http://127.0.0.1:5000/getQuestions", {
        params: {
          challenge_id: id,
          difficulty: diff,
        },
      })
      .then((res) => {
        setQuestion(res.data);
      });
  };

  // Step 2: Implement the onChange event handler
  const handleSelectChange = (event) => {
    // Step 3: Update the state when the selection changes
    setDiff(event.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
    setShowDiff(false);
    setRuning(true);
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
        points: 5 * score,
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
  return (
    <div className="flex w-screen justify-center items-center mt-10 flex-col">
      <div className="">
        {showDiff && (
          <form action="" className="flex flex-col gap-4" onSubmit={onSubmit}>
            <select
              id="selectInput"
              value={diff}
              onChange={handleSelectChange}
              className="px-10 py-5"
            >
              <option value="">Select...</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button className="px-10 py-5 bg-[#EBEBEB]">Submit</button>
          </form>
        )}
        <div className="w-[1000px]">
          {!showDiff && q < Object.keys(question).length && (
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
                </div>
                <div>Time taken {time}</div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Question;
