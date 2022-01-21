import React, { useState, useEffect } from 'react'
const axios = require('axios').default;


export default function DictionaryCaller() {

    const wordUrl = "https://random-word-api.herokuapp.com/word?number=1&swear=0"
    const vocabUrl = "https://wordsapiv1.p.mashape.com/words/" + { word }
    const [[word], setWord] = useState(null)
    const [[define, use], setDefine] = useState(null)
    // const [use, setUse] = useState(null)


    useEffect(() => {

        axios.get(wordUrl)
            .then(response => {
                setWord(response.data)
            })
        axios.get(vocabUrl)
            .then(response => {
                setDefine([response.data.definition])
            })


    }, [, wordUrl])
    console.log(" API data = " + word);

    return (

        null

    )
}
