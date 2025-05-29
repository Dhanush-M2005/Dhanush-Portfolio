import React, { useEffect, useState, useRef } from 'react';
import './Game.css';

const LEVELS_PER_PAGE = 10000;

const generateLevelMap = (start = 1, count = LEVELS_PER_PAGE) => {
  const levels = [];
  for (let i = 0; i < count; i++) {
    const x = i * 100 + 60;
    const y = i % 2 === 0 ? 100 : 200;
    levels.push({ id: start + i, x, y });
  }
  return levels;
};

function TicTacToe() {
  const PLAYER = '📈';
  const OPPONENT = '📉';
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [mode, setMode] = useState('ai');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const currentWinner = checkWinner(board);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (board.every(Boolean)) {
      setWinner('draw');
    }
  }, [board]);

  useEffect(() => {
    if (mode === 'ai' && !isPlayerTurn && !winner) {
      const aiMove = getAIMove(board);
      if (aiMove !== -1) {
        const newBoard = [...board];
        newBoard[aiMove] = OPPONENT;
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }
    }
  }, [isPlayerTurn, board, winner, mode]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    if (mode === '2p') {
      newBoard[index] = isPlayerTurn ? PLAYER : OPPONENT;
      setBoard(newBoard);
      setIsPlayerTurn(!isPlayerTurn);
    } else {
      if (!isPlayerTurn) return;
      newBoard[index] = PLAYER;
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  };

  function getAIMove(board) {
    const emptyIndices = board.map((v, i) => (v ? null : i)).filter(v => v !== null);
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)] ?? -1;
  }

  function checkWinner(b) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  }

  function resetGame() {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setWinner(null);
  }

  return (
    <div className="tic-tac-toe">
      <h2 className="title">📈 vs 📉 - Market Match</h2>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="mode-select"
      >
        <option value="ai">Player vs AI</option>
        <option value="2p">2 Player</option>
      </select>

      <div className="board">
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)} className="ttt-cell">
            <span className="ttt-icon">{cell}</span>
          </button>
        ))}
      </div>

      <div className="ttt-status">
        {winner === 'draw'
          ? 'Draw 🤝'
          : winner
          ? `${winner} wins! 💥`
          : `Next: ${isPlayerTurn ? PLAYER : OPPONENT}`}
        <button onClick={resetGame} className="ttt-reset">🔁 Restart</button>
      </div>
    </div>
  );
}

function MemoryGame() {
  const emojis = ['💻', '📱', '🖥️', '⌨️', '🖱️', '🕹️', '📷', '🔌', '💡', '📡'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const shuffled = shuffle([...emojis, ...emojis]);
    setCards(shuffled.map((icon, idx) => ({ id: idx, icon })));
    setMatched([]);
    setFlipped([]);
  }, [resetKey]);

  const shuffle = (array) => array.sort(() => 0.5 - Math.random());

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;
      if (cards[a].icon === cards[b].icon) {
        setMatched([...matched, a, b]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const handleReset = () => setResetKey(prev => prev + 1);

  const allMatched = matched.length === cards.length;

  return (
    <div className="memory-game">
      <div className="memory-grid grid-4x5">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? card.icon : '❓'}
          </div>
        ))}
      </div>
      {allMatched && <div className="memory-win">🎉 You matched all pairs!</div>}
      <button onClick={handleReset} className="ttt-reset">🔁 Restart</button>
    </div>
  );
}

export default function Game() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [expression, setExpression] = useState('🤔');
  const [showFireworks, setShowFireworks] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelMap] = useState(generateLevelMap(1));
  const [lastQuestion, setLastQuestion] = useState('');
  const mapRef = useRef();
  const currentPos = levelMap[currentLevel % LEVELS_PER_PAGE];

  useEffect(() => {
    fetchNewQuestion();
  }, [score]);

  useEffect(() => {
    const coaster = document.querySelector(".coaster-icon");
    if (coaster && mapRef.current) {
      const { left, width } = coaster.getBoundingClientRect();
      const container = mapRef.current;
      const scrollTo = left + container.scrollLeft - container.offsetWidth / 2 + width / 2;
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [currentLevel]);

  const fetchNewQuestion = () => {
    const categories = [9, 17, 18, 19];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const url = `https://opentdb.com/api.php?amount=1&category=${randomCat}&type=multiple`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const q = data.results[0];
        const decodeHTML = str => {
          const d = document.createElement('div');
          d.innerHTML = str;
          return d.textContent || d.innerText || '';
        };
        const cleanQuestion = decodeHTML(q.question).replace(/\s+/g, ' ').trim().toLowerCase();
        if (cleanQuestion === lastQuestion) {
          fetchNewQuestion();
          return;
        }
        setLastQuestion(cleanQuestion);
        const allAnswers = shuffleArray([...q.incorrect_answers, q.correct_answer]);
        setQuestion(q);
        setAnswers(allAnswers);
        setSelected(null);
        setCorrect(q.correct_answer);
        setExpression('🤔');
        setShowFireworks(false);
      });
  };

  const shuffleArray = array => [...array].sort(() => Math.random() - 0.5);

  const handleAnswer = answer => {
    setSelected(answer);
    if (answer === correct) {
      setExpression('😄');
      setShowFireworks(true);
      setTimeout(() => {
        setScore(prev => prev + 1);
        setCurrentLevel(prev => prev + 1);
      }, 300);
    } else {
      setExpression('😟');
    }
  };

  return (
    <div className="game-wrapper">
      {showFireworks && <div className="fireworks"></div>}

      <div className="game-card full-card">
        <h1 className="main-heading">
          <span className="icon">🎮</span> <span style={{ color: "#f97316" }}>Game</span>
        </h1>

        <div className="top-games-row">
          <div className="game-box left-game">
            <div className="market-heading">📈 vs 📉 - Market Match</div>
            <TicTacToe />
          </div>
          <div className="game-box right-game">
            <div className="tech-heading">🧠 Tech Match</div>
            <MemoryGame />
          </div>
        </div>

        <div className="with-border">
          <h2 className="sub-heading">🕹️ Quiz Game</h2>

          <div className="scroll-wrapper" ref={mapRef}>
            <div className="map-container no-bg">
              <svg className="track-line" width="1000000" height="300">
                <path
                  d={levelMap
                    .map((point, i, arr) => {
                      if (i === 0) return `M${point.x + 25},${point.y + 25}`;
                      const prev = arr[i - 1];
                      const cx = (prev.x + point.x) / 2 + 25;
                      return `Q${cx},${prev.y + 25} ${point.x + 25},${point.y + 25}`;
                    })
                    .join(" ")}
                  stroke="#333"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>

              {levelMap.map((level, i) => (
                <div
                  key={level.id}
                  className={`level-marker ${i <= currentLevel ? "active" : ""}`}
                  style={{ left: `${level.x}px`, top: `${level.y}px` }}
                >
                  🎪
                  <div className="level-num">{level.id}</div>
                </div>
              ))}

              <div
                className="coaster-icon"
                style={{
                  left: `${currentPos.x + 5}px`,
                  top: `${currentPos.y - 40}px`,
                }}
              >
                <span style={{ transform: "scaleX(-1)", display: "inline-block" }}>
                  🚂
                </span>
                <span className="face sparkle">{expression}</span>
              </div>
            </div>
          </div>

          {question?.question && (
            <div className="quiz-box fade-in">
              <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
              <div className="options">
                {answers.map((a, i) => (
                  <button
                    key={i}
                    className={
                      selected === a
                        ? a === correct
                          ? "selected-correct"
                          : "selected-wrong"
                        : ""
                    }
                    onClick={() => handleAnswer(a)}
                    dangerouslySetInnerHTML={{ __html: a }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
