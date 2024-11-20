import { useEffect, useState } from "react"
import { getAllPosts } from "./appwrite"

const useAPPWrite = (fn) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const response = await getAllPosts()

                setData(response)
            } catch (error) {
                Alert.alert("Error", error.message || "An error occurred")
            } finally {
                setIsLoading(false)
            }
        }

        // fetchData()
    }, [])

    return { data }

}