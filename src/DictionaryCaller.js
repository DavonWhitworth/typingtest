import React, { useState, useEffect } from 'react'
const axios = require('axios').default;


export default function DictionaryCaller() {

    const words = ["misadjusting", "bucket", "spiritist", "inefficacious", "creakinesses",
        "ampoule", "gaes", "nyalas", "linearizations", "sainfoins", "allotropy", "cartilages", "seasonality",
        "cores", "funnier", "unbends", "untwisting", "sexiness", "sphery", "temperamentally", "hassel",
        "airfreighted", "ascender", "wellness", "asthenia", "specifications", "gondolier", "toilsome",
        "briefcases", "ridgels", "entoil", "asphodel", "postbellum", "centai", "margravates", "chautauqua",
        "spillovers", "cataphyll", "rocamboles", "teepee", "superventions", "cay", "doobie", "nervule", "orphaned",
        "width", "azimuths", "trails", "receivership", "mopinesses"];

    //api docs + call link
    //https://dictionaryapi.dev/
    //https://api.dictionaryapi.dev/api/v2/entries/en/<word>


    var vocabUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    var currentWord

    const [define, setDefine] = useState("")
    //const [use, setUse] = useState(null)


    useEffect(() => {

        currentWord = words[Math.random(0, 49)];
        //currentWord = "asthenia";
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
        [
        {currentWord},

        {define}
        ]
    </>
    )
}
//what am i doing
/*
get right json data, set to define, return word, break, define
*/