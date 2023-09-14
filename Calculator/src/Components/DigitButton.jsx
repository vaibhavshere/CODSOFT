import { ACTIONS } from "../App.jsx"; //Taaki dispatch function ka type de paayein
export default function DigitButton({ dispatch, digit }) { //vo function and vo digit jo ye button bhejega to the reducer function
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })} //digit add karne vala part chalayega reduce function ka , digit sath mein bhejna padega so that the reducer function can modify the state proplery knowing konsa digit add karna hai
    >
      {digit}
    </button>
  );
}
//The type property is a string that indicates the type of action being dispatched. Actions in Redux are plain JavaScript objects with a type property that describes the action to be performed. In this case, ACTIONS.ADD_DIGIT is used as the action type. This action type usually corresponds to a specific reducer function in Redux.
//The payload property is an optional property used to carry data or additional information with the action. In this case, it appears to be an object containing a digit property
