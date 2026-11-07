class FetchService {
    static API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

    static async fetchCard(name){
        
            const response = await fetch(`${this.API_URL}?name=${encodeURIComponent(name)}`);
            
            if(!response.ok){
                throw new Error(`Could not fetch card (HTTP ${response.status})`);
            }
            
            const data = await response.json();
            const cardURL = data.data[0].card_images[0].image_url;
            const cardName = data.data[0].name;
            const typeLine = data.data[0].typeline;
            const cardDescription = data.data[0].desc;
            const atk = data.data[0].atk;
            const def = data.data[0].def;

            return { cardURL, cardName, typeLine, cardDescription, atk, def };
    }

}

export default FetchService;

