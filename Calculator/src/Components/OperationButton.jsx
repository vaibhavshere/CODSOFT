import { ACTIONS } from "../App.jsx"; //Taaki dispatch function ka type de paayein
export default function OperationButton({ dispatch, operation }){//vo function and vo operation jo ye button bhejega to the reducer function
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } }) //Operation perform karo, and ye lo ye vala operation
      }
    >
      {operation}
    </button>
  );
}
//The type property is a string that indicates the type of action being dispatched. Actions in Redux are plain JavaScript objects with a type property that describes the action to be performed. In this case, ACTIONS.ADD_DIGIT is used as the action type. This action type usually corresponds to a specific reducer function in Redux.
//The payload property is an optional property used to carry data or additional information with the action. In this case, it appears to be an object containing a digit property
