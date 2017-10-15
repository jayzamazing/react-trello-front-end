/*
* Schema representing Boards
*/
import { normalize, schema, arrayOf } from 'normalizr';

//define schema items
const boardsSchema = new schema.Entity('boards', {}, { idAttribute: '_id' });
const cardsListSchema = new schema.Entity('cardslist', {}, { idAttribute: '_id' });
const cardsSchema = new schema.Entity('cards', {}, { idAttribute: '_id' });

//A board has an array of card list
boardsSchema.define({
  cardsList: [cardsListSchema]
});
//Each cardslist has an array of cards
cardsListSchema.define({
  cards: [cardsSchema]
});
const boardArray = [boardsSchema];
const cardslistArray = [cardsListSchema];
const cardsArray = [cardsSchema];

export {boardArray, boardsSchema, cardslistArray, cardsListSchema, cardsSchema, cardsArray};
