
export interface InputProps{
    id: string,
    element: string,
    title?: string,
    inputType: string,
    placeHolderText: string,
    value?: string,
    numberRows? : number,
    errorText: string,
    validators: {},
    onInput?: any
}

export interface ButtonProps{
    type: any,
    onClick? : any,
    disabled: any
}


