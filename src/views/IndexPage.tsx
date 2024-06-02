import { useAppStore } from "../store/useAppStore"

const IndexPage = () => {
    useAppStore(state => state.categories)
    return (
        <div>IndexPage</div>
    )
}

export default IndexPage