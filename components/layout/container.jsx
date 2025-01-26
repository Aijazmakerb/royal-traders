export default function Container(props) {
    return (
        <button className={`border flex px-3 py-2 rounded-lg gap-2 items-center font-medium text-sm ${props.className}`}>{props.children}</button>
    )
}