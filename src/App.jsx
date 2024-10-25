import { useState, useEffect } from 'react';

export default function App() {
  const [input, setInput] = useState("");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(registration => {
        console.log("sw registered");
        // console.log(registration);
    }).catch(error => {
        console.log("sw registeration failed")
        // console.log(error)
    })
}

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculate = () => {
    if (input.trim() === "") return; 
    try {
      const answer = eval(input).toString();
      setInput(answer); 
    } catch {
      
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (/[0-9]/.test(key) || ["+", "-", "*", "/"].includes(key)) {
      setInput((prev) => prev + key);
    } else if (key === "") {
      event.preventDefault();
      calculate(); 
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      clearInput();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-80">
        <input
          type="text"
          className="w-full h-16 text-right mb-4 p-4 text-2xl font-semibold border rounded-lg bg-gray-100"
          value={input}
          readOnly
        />
        <div className="grid grid-cols-4 gap-3">
          {['7', '8', '9', '/'].map((item) => (
            <button key={item} onClick={() => handleClick(item)} className="btn">{item}</button>
          ))}
          {['4', '5', '6', '*'].map((item) => (
            <button key={item} onClick={() => handleClick(item)} className="btn">{item}</button>
          ))}
          {['1', '2', '3', '-'].map((item) => (
            <button key={item} onClick={() => handleClick(item)} className="btn">{item}</button>
          ))}
          {['0', '.', '=', '+'].map((item) => (
            <button
              key={item}
              onClick={item === '=' ? calculate : () => handleClick(item)}
              className="btn"
            >
              {item}
            </button>
          ))}
          <button onClick={clearInput} className="btn col-span-2 bg-red-500 hover:bg-red-600">Clear</button>
        </div>
      </div>
    </div>
  );
}
