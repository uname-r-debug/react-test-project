interface ComponentProps {
    children: React.ReactNode,

}
export default function InfoCard(_: ComponentProps){
    return (
        <div className="flex flex-col justify-evenly">
            {_.children}
        </div>
    )
}