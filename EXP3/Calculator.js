import React, { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);

  const calculate = () => {
    let res;
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult("Invalid input");
      return;
    }

    switch (operator) {
      case "+":
        res = a + b;
        break;
      case "-":
        res = a - b;
        break;
      case "*":
        res = a * b;
        break;
      case "/":
        res = b !== 0 ? a / b : "Error (Divide by 0)";
        break;
      default:
        res = "Unknown op";
    }
    setResult(res);
  };

  return (
    <div style={styles.container}>
      <h2>Simple Calculator</h2>
      <div style={styles.row}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={styles.input}
        />
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={styles.select}
        >
          <option value="+">+</option>
          <option value="-">−</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={calculate} style={styles.button}>=</button>

      {result !== null && (
        <h3>
          {num1} {operator} {num2} = {result}
        </h3>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  input: {
    width: "80px",
    padding: "5px",
    fontSize: "16px",
    marginRight: "5px",
  },
  select: {
    fontSize: "16px",
    padding: "5px",
    marginRight: "5px",
  },
  button: {
    fontSize: "18px",
    padding: "5px 15px",
    cursor: "pointer",
  },
};
