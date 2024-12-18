import { useEffect, useState } from "react"
import { Alert } from "react-native"

const useAPPWrite = (fn) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await fn()

            setData(response)
        } catch (error) {
            Alert.alert("Error", error.message || "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData()

    return { data, isLoading, refetch }

}

export {
    useAPPWrite
}