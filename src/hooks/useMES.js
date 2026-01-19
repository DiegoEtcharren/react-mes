import { useContext } from 'react'
import MESContext from '../context/MESProvider'

const useMES = () => {
    return (
        useContext(MESContext)
    )
}

export default useMES