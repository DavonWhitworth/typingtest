import React, { useState, useEffect } from 'react'
const axios = require('axios').default;

//class DictionaryCaller extends Typingtest()
export default function DictionaryCaller(props) {

    const Capitalize = (str) => {
        return (str.charAt(0).toUpperCase() + str.slice(1));
    }


    const words = ["quantity", "quality", "inefficacious", "abandon", "authority", "award", "aware",
        "awful", "assignment", "artistic", "artist", "behavior", "battery", "benefit", "board", "carefully",
        "ascender", "wellness", "asthenia", "gondolier", "toilsome", "briefcases", "postbellum", "margravates",
        "rocamboles", "teepee", "superventions", "cay", "orphaned", "width", "azimuths", "trails", "receivership",
        "competition", "considerable", "consistent", "defendant", "discrimination", "dramatic", "electronic",
        "everybody", "foundation", "government", "independent", "involvement", "landscape", "location", "manufacturer", "management", "maintenance",
        "moderate", "modern", "modest", "mystery", "narrative", "natural", "necessary", "neighbor", "negotiation",
        "negotiate", "nonetheless", "nothing", "nuclear", "observation", "observe", "observer", "reform",
        "occupation", "occupy", "Olympic", "organize", "participant", "participate", "partnership", "policy",
        "political", "pollution", "population", "presentation", "rank", "refugee", "relax"];

    //api docs + call link
    //https://dictionaryapi.dev/
    //https://api.dictionaryapi.dev/api/v2/entries/en/<word>

    var vocabUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    var isStart = true;
    var [currentWord, setCurrentWord] = useState(Capitalize(words[Math.trunc(Math.random() * words.length)]))
    var [define, setDefine] = useState("")
    //const [use, setUse] = useState()
    //Capitalize(words[Math.trunc(Math.random() * words.length)])



    useEffect(() => {

        if (isStart) {
            isStart = false;
            axios.get(vocabUrl + currentWord)
                .then(response => {
                    var definition = response.data[0].meanings[0].definitions[0].definition;
                    definition = Capitalize(definition);
                    setDefine(definition)

                })
        } else {
            setCurrentWord(words[Math.trunc(Math.random() * words.length)]);
            axios.get(vocabUrl + currentWord)
                .then(response => {
                    var definition = response.data[0].meanings[0].definitions[0].definition;
                    definition = Capitalize(definition);
                    setDefine(definition)

                })
        }
        currentWord = Capitalize(currentWord);
        console.log("current word = " + currentWord);
    }, [])




    props.term(currentWord)
    props.def(define)


    return (<>

    </>
    )
}