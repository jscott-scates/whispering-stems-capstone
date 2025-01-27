import { useParams } from "react-router-dom"

export const FlowerDetails = () => {
    const {flowerId} = useParams

    return <>Flower Details for #{flowerId}</>
}