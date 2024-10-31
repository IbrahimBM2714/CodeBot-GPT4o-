import React, { useEffect } from 'react'
import actual_logo from "./actual_logo.png"

const LLMResponse = ({ responseToShow }) => {

    useEffect(() => {
        console.log(responseToShow)
    }, [])



    return (
        <div
            style={{
                width: "40%",
                // backgroundColor: 'red',
                padding: "10px",
                display: "flex"
            }}
        >
            <div
                style={{
                    flexGrow: 1,
                    display: 'flex'
                }}
            >
                <div
                    className="llm-chat"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "15px"
                    }}
                >
                    <h2>CodeBot:</h2>
                    <div id="chat-messages">

                    </div>
                    <div
                        className="llm-input"
                        style={{
                            // backgroundColor: "red",
                            flexGrow: 1,
                            height: "calc(100vh - 210px)"
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "white",
                                flexGrow: 1,
                                borderRadius: "15px",
                                padding: "10px",
                                overflow: "auto",
                                whiteSpace: 'pre-line' 
                                // backgroundColor: "red"
                            }}
                        >
                            {responseToShow?.map((m) => (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#d8efd3",
                                        padding: "10px",
                                        gap: "10px",
                                        marginBottom: "10px",
                                        borderRadius: "15px"
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%"
                                        }}
                                        src={actual_logo} />
                                    <p
                                        style={{
                                            color: "black",
                                            wordBreak: "break-word",
                                            overflow: "hidden",
                                            flexGrow: 1,
                                            whiteSpace: 'pre-line'
                                        }}
                                    >{m}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LLMResponse
