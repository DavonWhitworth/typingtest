import React, { useState } from 'react';
import axios from "axios";

const info = axios.create({
    baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
})

const Capitalize = (str) => {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

const [def, setDef] = useState("Plese wait a moment");

const getDefinition = (word) => {
    axios.get(info.baseURL + word)
        .then(response => {
            var definition = response.data[0].meanings[0].definitions[0].definition;
            return Capitalize(definition);
        })
}

const TermAPI = (props) => {
    setDef(getDefinition(props.term))
    props.setTermDef({ def })


}


export default TermAPI;