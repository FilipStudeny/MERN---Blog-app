export interface modalProps{
    show?: boolean,
    children?: React.ReactElement[],
    onClick?: React.MouseEventHandler,
    onCancel?: React.MouseEventHandler,

    title?: string

}

