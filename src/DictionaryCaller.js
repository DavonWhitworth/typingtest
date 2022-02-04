import React, { useState, useEffect } from 'react'
const axios = require('axios').default;


export default function DictionaryCaller() {

    const words = ["quantity", "bucket", "quality", "inefficacious", "success",
        "ampoule", "abandon", "authority", "avoid", "award", "aware", "awful", "assignment",
        "artistic", "artist", "balance", "behavior", "battery", "benefit", "board", "brilliant",
        "carefully", "ascender", "wellness", "asthenia", "specifications", "gondolier", "toilsome",
        "briefcases", "ridgels", "entoil", "asphodel", "postbellum", "centai", "margravates", "chautauqua",
        "spillovers", "cataphyll", "rocamboles", "teepee", "superventions", "cay", "doobie", "nervule", "orphaned",
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
    var currentWord

    const [define, setDefine] = useState("")
    //const [use, setUse] = useState(null)


    useEffect(() => {

        currentWord = words[Math.trunc(Math.random() * words.length)];
        console.log("current word = " + currentWord);
        axios.get(vocabUrl + currentWord)
            .then(response => {
                var definition = response.data[0].meanings[0].definitions[0].definition;
                Capitalize(definition);
                setDefine(definition)

            })

        //console.log("current word = " + currentWord + "    definition is = " + define)

    }, [])




    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (<>

        {currentWord}
        <br />
        {define}

    </>
    )
}