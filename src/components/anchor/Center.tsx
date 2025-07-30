const CenterXY: (_: {
    element: React.JSX.Element
    y: string
}) => React.JSX.Element = ({element, y}) => <div className={`flex justify-center items-center ${y}`}>{element}</div>
export default CenterXY;