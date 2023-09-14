import { evaluate, ACTIONS } from "./App.jsx"; //Brain of the code

export default function reducer(state, { type, payload }) { //By default whenever reducer function is called through dispatch, state to automatically jayegi, bas type and payload dena hai as objects
  switch (type) { //dispatch function ka type kya hai?

    case ACTIONS.ADD_DIGIT:
      console.log(state.currentOperand === "0")
      console.log(state.currentOperand)
      if (payload.digit === "0" && state.currentOperand === "0") return state; //0 hai screen pe, and maine ek aur baar 0 daba dia
      if (state.override) { //Used to check whether the digit entered should overwrite the current digit or should it append next to it, and by default it is 1
        return { ...state, currentOperand: payload.digit, overwrite: false }; //Bs initially overwrite kar dena, after that not
      }
      if (state.currentOperand){ //Dekho huumne throughout the code null and 0 ko interchangebly use nahi kara because in a calculator 0 has a significance. So agar state.currentOperand null hua then .includes will give an error, hence pehle hi check kar lia humne
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state; //2 decimals nahi laga sakte
      }
      return { //special cases handle karliye humne saare upar, so now, since overwrite nahi karna, we shall append the digit to the current operand
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.EVALUATE:
        if (state.operation == null || state.currentOperand == null || state.previousOperand == null) return state; //inmein se koi bhi null hua then it's senseless to evaluate, are bhai karna kya h
        console.log(evaluate(state)); //Function ko dedo
        return {...state, previousOperand : null, currentOperand : evaluate(state), operation : null}; //result aagya so overwrite karna hai ya nahi depends, overwrite :true daal sakte ho, not necessary whatever is on the screen next time a button is pressed
    case ACTIONS.CHOOSE_OPERATION: //Matlab koi operation button dabaya gaya hai
        if (state.currentOperand == null && state.previousOperand == null) return state; //Operation kya hi akroge if both the operands are null
        if (state.previousOperand == null){ //Matlab 3 dabaya then plus daba dia to ek to operand ko previous banado and operation daal do taaki vo jaake previous-operand mein display ho sake
            return ({...state, operation : payload.operation, previousOperand : state.currentOperand, currentOperand : null})
        }
        if (state.currentOperand == null){
            return ({...state, operation : payload.operation})
        }
        return {...state, previousOperand : evaluate(state), operation : payload.operation, currentOperand : null}
    case ACTIONS.DELETE_DIGIT:
        if (state.overwrite){ //Overwrite krna hi hai bhai
            return{...state, overwrite : false, currentOperand : null}
        }
        if (state.currentOperand == null) return state //Pehle se hi null
        if (state.currentOperand.length === 1){
            return {...state, currentOperand : null} //1 length ka hai to remove hi krdo
        }
        return {...state, currentOperand : state.currentOperand.slice(0, -1)} //Slice karte hue ek less tak jaata hai remember?
    case ACTIONS.CLEAR:
        return {} //Puri ki puri State ko null krdo
  }
}
