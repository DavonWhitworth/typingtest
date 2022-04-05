/*import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react/cjs/react.production.min';

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const Capitalize = (str) => {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}



function TermAPI(props) {

    const getDefinition = (props) => {
        axios.get(baseURL + props.term)
            .then(response => {
                var definition = Capitalize(JSON.stringify(response.data[0].meanings[0].definitions[0].definition));
                return Capitalize(definition);
            })
    }
    props.setDef(getDefinition());
    //props.setDef(getDefinition(props.term))

    return (
        <>
            <h1>api return block</h1>
        </>
    )


}


export default TermAPI;*/