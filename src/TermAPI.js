import axios from "axios";


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


const info = axios.create({
    baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/" + words[Math.trunc(Math.random() * words.length)],
})

export default info;