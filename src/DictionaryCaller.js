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

    const vocabUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/hello";
    var currentWord;


    const [define, setDefine] = useState(null)
    //const [use, setUse] = useState(null)


    useEffect(() => {

        currentWord = words[Math.random(50)];
        // + currentWord
        axios.get(vocabUrl)
            .then(response => {
                //setDefine([response.definitions])
                console.log("called axios vocab   " + JSON.stringify(response.data.word))
            })

        //console.log("current word = " + currentWord + "    definition is = " + define)

    }, [])



    return (

        null

    )
}
