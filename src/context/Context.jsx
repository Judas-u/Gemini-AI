import { createContext } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const onSent = async(prompt) => {
        await runChat(prompt)
    }

    onSent("What is React.js ?"); // ❌ This should probably be onSet

    const contextValue = {
        // Add your shared state and functions here
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
