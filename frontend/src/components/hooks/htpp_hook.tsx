import { useCallback, useEffect, useRef, useState, } from 'react'



const useHttpRequest = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const activeHttpRequests: any = useRef([]);


    const sendRequest = useCallback( async (url: string, method: string = 'GET', body: any = null, headers: {} = {}) => {

        setIsLoading(true);
        const httpAbort = new AbortController();
        activeHttpRequests.current.push(httpAbort);

        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body,
                signal: httpAbort.signal //FIX FOR CROSS REQUEST SENDING
              });
  
            const responseData = await response.json();
            
            activeHttpRequests.current = activeHttpRequests.current.filter((requests: any) => requests !== httpAbort);
            if (!response.ok){
                throw new Error("Error fetch failed !");
            }

            setIsLoading(false);
            return responseData;
        } catch (err: any) {
            console.log(err.message)
            setError(err.message);
            setIsLoading(false);
            throw err;
        };
        
    }, [])

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortRequest: any) => abortRequest.abort()) //ABORT CURRENT REQUEST 
        };
    }, []);

    return { isLoading, error, sendRequest, clearError }
}

export default useHttpRequest