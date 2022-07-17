export interface FormProps{
    children: React.ReactElement[] | React.ReactElement,
    onSubmit: any,
    classname?: string,
}

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
    label: string,
    onClick? : any,
    disabled?: any,
    classname: string
    classname_enabled: string,
    classname_disabled: string,
}

export interface ImageUploadProps{
    id: string,
    onInput?: any,

}


