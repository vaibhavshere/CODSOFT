import { useReducer } from "react";
import "./App.css";
import reducer from "./reducer.jsx";
import OperationButton from "./Components/OperationButton.jsx";
import DigitButton from "./Components/DigitButton.jsx";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

export function evaluate(state) {
  const prev = parseFloat(state.previousOperand);
  const current = parseFloat(state.currentOperand);
  let computation = "";
  switch (state.operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    case "%":
      computation = prev % current;
      break;
  }
  return computation.toString();
}

// const INTEGER_FORMATTER = new Intl.NumberFormat("en-IN", { //Built In JS function that helps to format numbers, takes two arguments : 1. Locale - Provided as Indian English, numbers will be formatted wrt this language, second argument implies that the numbers should be rounded to the nearest integers, since we are using floating points, instead of 9/3 = 3.0, we want to see 3 only. Hence this function is being used.
//   maximumFractionDigits: 0,
// });

// function formatOperand(operand) {
//   if (operand == null) return; //If string is null, display nothing
//   const [integer, decimal] = operand.split("."); //split wrt decimal
//   if (decimal == null) return INTEGER_FORMATTER.format(integer); //agar decimal kebaad kuch hai hi nahi, that means number is integer, so format it like an integer. 
//   return `${INTEGER_FORMATTER.format(integer)}.${decimal}`; //Else, integer part ko integer ki tarah display karo, then . lagake decimal vala likh do
// } 

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer( //The first argument is basically the state object, and it has been initialized with {}. Dispatch function, having different types, will be used to call the reducer function, that in turn will modify the state
    reducer,
    {}
  );
  return (
    <>
      <div className="block">
        <div className="output">
          <div className="previous-operand">
            {(previousOperand)} {operation} {/*Jaise hum 4+ dikhana chahenge on the upper part in light grey*/}
          </div>
          <div className="current-operand">
            {(currentOperand) || 0}{" "}
            {/*In the above two palces, vaise formatOperand(previousOperand) likha hua tha, but that is not necessary so removed*/}
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}> {/*buttons when clicked will call some part of the reducer function specified by the type of the dispatch function, and change the state*/}
            DEL
          </button>
          <OperationButton operation="%" dispatch={dispatch} />{" "}
          {/*first of all the arguments are being passed as keyword arguments, dispatch function is being passed as the dispatch function of this code*/}
          <OperationButton operation="÷" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="x" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <button
            className="span-two" //Grid mein thoda bada dikhana hai ye wala
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })} 
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
// if you're importing a default function, write reducer, else {reducer}
//dispatch is a function typically used in Redux to send an action to the Redux store. It's a way to trigger changes in the application's state.
//we first pass in the states, then the dispatch keyword which will be used to call the function reducer, which will change the state of the state object, initialized by {}

//Explanation also written for better understanding