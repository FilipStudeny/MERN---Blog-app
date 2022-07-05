import { useCallback, useReducer } from 'react'

export const formReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const ID in state.inputs) {
          if (ID === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[ID].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
        case 'SET_DATA':
            return{
                inputs: action.inputs,
                isValid: action.isValid
            };

      default:
        return state;
    }
};

export const useForm = (initialInputs: any, initialFormValidity: any) => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    const inputHandler = useCallback((id: any, value: any, inputIsValid: any) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: inputIsValid,
          inputId: id,
        });
    
        console.log(formState.inputs)
      }, []);

    const setFormData = useCallback((inputData: any, formValidity: any) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            isValid: formValidity,
        });
    }, []);

    return [formState, inputHandler, setFormData];
}


