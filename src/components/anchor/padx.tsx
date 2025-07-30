export default function Pad(_: {
    children:React.ReactNode,
    classList: string
}){
    return <div className={_.classList}>{_.children}</div>
}