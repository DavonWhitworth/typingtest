import React, { useState, useEffect } from 'react'
const axios = require('axios').default;

//class DictionaryCaller extends Typingtest()
export default function DictionaryCaller() {

    const Capitalize = (str) => {
        return (str.charAt(0).toUpperCase() + str.slice(1));
    }


    const words = ["quantity", "bucket", "quality", "inefficacious", "success",
        "ampoule", "abandon", "authority", "avoid", "award", "aware", "awful", "assignment",
        "artistic", "artist", "balance", "behavior", "battery", "benefit", "board", "brilliant",
        "carefully", "ascender", "wellness", "asthenia", "gondolier", "toilsome",
        "briefcases", "ridgels", "entoil", "postbellum", "centai", "margravates", "chautauqua",
        "rocamboles", "teepee", "superventions", "cay", "orphaned",
        "width", "azimuths", "trails", "receivership", "mopinesses", "cluster", "competition", "considerable", "consistent", "defendant",
        "discrimination", "dramatic", "electronic", "everybody", "foundation", "government", "headquarters", "independence",
        "independent", "involvement", "landscape", "location", "manufacturer", "management", "maintenance", "moderate",
        "modern", "modest", "musician", "mystery", "narrative", "natural", "necessary", "neighborhood", "neighbor",
        "negotiation", "negotiate", "nonetheless", "nothing", "nuclear", "observation", "observe", "observer", "occupation",
        "occupy", "Olympic", "opportunity", "organize", "participant", "participate", "partnership", "policy", "political",
        "pollution", "population", "presentation", "psychological", "rank", "refugee", "reform", "relax"];

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







    return (<>

        {currentWord}
        <br />
        {define}
    </>
    )
}