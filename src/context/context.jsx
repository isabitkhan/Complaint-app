import { createContext ,useContext } from "react";

export const countContext = createContext({
    todoCount: 0
})

export const countProvider = countContext.Provider

 export default function useCount(){
return useContext(countContext)
}
