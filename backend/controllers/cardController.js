import FetchService from '../services/fetchService.js';

class CardController {
    static async getCard(req, res){
        try{
            const { name } = req.query;

            if(!name){
                return res.status(400).json({
                    message: 'Card name is required'
                });
            }

            const { cardURL, cardName, typeLine, cardDescription, atk, def } = await FetchService.fetchCard(name);

            return res.status(200).json({
                imageURL: cardURL,
                cardName: cardName,
                typeLine: typeLine,
                cardDescription: cardDescription,
                atk,
                def,
            });

        }
        catch(error){
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

export default CardController;