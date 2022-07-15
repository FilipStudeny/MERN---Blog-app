export interface modalProps{
    show?: boolean,
    children?: React.ReactElement | React.ReactElement[]
    onClick?: React.MouseEventHandler,
    onCancel?: React.MouseEventHandler,
    onHandleSubmit?: any,
    title?: string,

    formData?: {},
}

