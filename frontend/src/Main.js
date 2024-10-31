import React, { useState, useEffect } from 'react'
import LLMResponse from './LLMResponse'
import Editor from "@monaco-editor/react";
import axios from "axios"

const Main = () => {

    const [language, setLanguage] = useState("python");
    const [challenge, setChallenge] = useState()
    const [llmResponse, setLlmResponse] = useState([])
    const [code, setCode] = useState("")
    const [hintCount, setHintCount] = useState(0)

    useEffect(() => {

        const fetchChallenge = async () => {
            try {
                await axios.get("http://127.0.0.1:8000/generate-challenge").then((response) => {
                    console.log(response.data)
                    setChallenge(response.data)
                    console.log()
                })
            }
            catch (error) {
                console.log("Error in fetching the challenge: ", error)
            }
        }

        fetchChallenge()


    }, [])

    const handleCodeChange = (value) => {
        console.log(value)
        setCode(value)
    }

    const handleSendCode = async () => {
        try {
            axios.post("http://127.0.0.1:8000/check-code", {
                code: code,
                idea: challenge.story_intro,
                story: challenge.challenge_details,
                test_cases: challenge.test_cases
            }).then((response) => {
                console.log(response.data)

                let choice = response.data[0]
                setLlmResponse((prevResponses) => [...prevResponses, response.data[1]]);

                if (choice === "Wrong") {
                    setHintCount(prev => prev + 1)
                    console.log(hintCount)
                    console.log(choice)
                    axios.post("http://127.0.0.1:8000/provide-hint", {
                        code: code,
                        idea: challenge.story_intro,
                        story: challenge.challenge_details,
                        test_cases: challenge.test_cases
                    }).then((response) => {
                        console.log(response.data)
                        setLlmResponse((prevResponses) => [...prevResponses, response.data]);
                    })
                } else {
                    setLlmResponse((prevResponses) => [...prevResponses, "Your story is moving on..."]);
                    axios.get("http://127.0.0.1:8000/generate-follow-up-challenge").then((response) => {
                        console.log(response.data)
                        setChallenge(response.data)
                        console.log()
                    }).finally(()=> {
                        setCode("")
                    })
                }

                if (hintCount === 2) {

                    setHintCount(0)
                    axios.post("http://127.0.0.1:8000/get-solution", {
                        idea: challenge.story_intro,
                        story: challenge.challenge_details,
                        test_cases: challenge.test_cases
                    }).then((response) => {
                        setLlmResponse((prevResponses) => [...prevResponses, "Your hints are over. Here is the solution. Your story is being reset to another one"]);
                        setLlmResponse((prevResponses) => [...prevResponses, response.data]);
                    }).finally(() => {
                        axios.get("http://127.0.0.1:8000/generate-challenge").then((response) => {
                            console.log(response.data)
                            setChallenge(response.data)
                            console.log()
                        }).finally(()=> {
                            setCode("")
                        })
                    })

                }

            })
        }
        catch (error) {
            console.log("Error in sending code ", error)
        }

    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };


    return (
        <div
            style={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-between"
            }}
        >

            <div
                style={{
                    width: "60%",
                    padding: "10px",
                    display: "flex",

                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: "column",
                        gap: "15px",
                        width: "100%"
                    }}
                >
                    <div
                        className='hide-scrollbar'
                        style={{
                            backgroundColor: "#d8efd3",
                            overflow: "auto",
                            borderRadius: "15px",
                            height: "calc(45vh - 83px)",
                            padding: "10px",
                            whiteSpace: 'pre-line'
                        }}
                    >
                        <h3>Story:</h3>
                        <p>{challenge?.story_intro}</p>

                        <h3>Challenge:</h3>
                        <p>{challenge?.challenge_details}</p>

                        <h3>Test cases:</h3>
                        <p>{challenge?.test_cases}</p>

                    </div>

                    <div
                        style={{
                            backgroundColor: "#d8efd3",
                            borderRadius: "15px",
                            padding: "10px",
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: "column"
                        }}
                    >
                        <p
                            style={{ fontWeight: "bold" }}
                        >Your Solution:</p>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            style={{
                                marginBottom: "10px",
                                padding: "5px",
                                borderRadius: "5px",
                            }}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                        </select>
                        <Editor

                            style={{
                                flexGrow: 1,
                                borderRadius: "15px"
                            }}

                            width="100%"
                            defaultLanguage="python"
                            onChange={handleCodeChange}
                            language={language}
                        />

                    </div>

                    <div className="buttons"
                        style={{
                            display: 'flex',
                            justifyContent: "space-between"
                        }}
                    >
                        <p>Hints utilized: {hintCount}</p>
                        <button
                            onClick={handleSendCode}
                            style={{
                                backgroundColor: "rgb(216 239 211)",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "25px",
                                cursor: "pointer"
                            }}
                        >Submit</button>
                    </div>
                </div>
            </div>
            <LLMResponse responseToShow={llmResponse} />

        </div>
    )
}

export default Main
