import React, { useState } from "react";
import useFetch from "./useFetch";

const Quiz = () => {
  let url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=200&page=1&sparkline=false";

  const { loading, isError, data } = useFetch(url);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  if (loading) {
    return <h1 className="loading-message">Loading...</h1>;
  } else if (isError) {
    return <h1 className="loading-message">Ooops...Something went wrong</h1>;
  } else {
    let coin = data[Math.floor(Math.random() * data.length)];
    let correctChoice = coin.name.toUpperCase() || coin.symbol.toUpperCase();

    let newData = data.filter((item) => item !== coin); // To avoid display the same name twice

    //We multiply by (data.length - 1) because in the previous step we removed an element from the array!!!
    let secondChoice =
      newData[Math.floor(Math.random() * newData.length)].name.toUpperCase() ||
      "-";
    newData = newData.filter((item) => item.name !== secondChoice.name); // To avoid displaying the same name twice
    let thirdChoice =
      newData[Math.floor(Math.random() * newData.length)].name.toUpperCase() ||
      "-";

    let choices = [correctChoice, secondChoice, thirdChoice];
    shuffle(choices);

    //CREATING FUNCTION TO SHUFFLE THE CHOICES ARRAY
    function shuffle(array) {
      let currentIndex = array.length;

      while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * array.length);
        currentIndex -= 1;

        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
      }
    }

    //FUNCTION FOR COUNTING WINS AND LOSSES
    const answer = (e) => {
      if (e.target.innerHTML === correctChoice) {
        e.target.style.backgroundColor = "green";
        setTimeout(
          () => (e.target.style.backgroundColor = "rgba(2, 19, 39, 0.6)"),
          500
        );

        setWins(wins + 1);
      } else {
        e.target.style.backgroundColor = "red";
        setTimeout(
          () => (e.target.style.backgroundColor = "rgba(2, 19, 39, 0.6)"),
          500
        );

        setLosses(losses + 1);
      }
    };
    if (wins === 5) {
      window.alert("You won!");
      setWins(0);
      setLosses(0);
    }
    if (losses === 3) {
      window.alert("You lost! Try again.");
      setLosses(0);
      setWins(0);
    }

    return (
      <section id="quiz">
        <h1>Quiz</h1>
        <p>
          <span>Rules:</span>
          <span>
            Choose the correct name of the crypto that is displayed.For every
            correct answer you get one point. If you collect 5 points you win.
            If you are wrong 3 times, you are out of the game. Enjoy!
          </span>
        </p>
        <div className="container">
          <img src={coin.image} alt="none" />
          <ul>
            <button onClick={answer}>{choices[0]}</button>
            <button onClick={answer}>{choices[1]}</button>
            <button onClick={answer}>{choices[2]}</button>
          </ul>
          <div className="points">
            <h2 className="wins">
              <span className="material-icons">done</span> {wins}
            </h2>
            <h2 className="loses">
              <span className="material-icons">clear</span> {losses}
            </h2>
          </div>
        </div>
      </section>
    );
  }
};

export default Quiz;
