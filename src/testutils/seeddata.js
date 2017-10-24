'use strict';
import faker from 'faker';
//used to create a single board in json
export const seedBoardsSingle = (title = faker.random.words(), _id = faker.random.alphaNumeric(20)) => {
  return {
    title: title,
    _id: _id,
    cardsList: seedCardslistIds()
  };
};
//used to create random boards based on count
export const seedBoardsCount = (count) => {
  if (!count) {
    count = 1;
  }
  let boards = [];
  for (var i = 0; i < count; i++) {
    let _id = faker.random.alphaNumeric(20);
    boards.push({
      _id: _id,
      title: faker.random.words(),
      cardsList: seedCardslistIds(count)
    });
  }
  return boards;
}
//create board items based on input values, after normalization
export const seedBoardsInput = (ids, words, ids2) => {
  let boards = {};
  for (var i = 0; i < ids.length; i++) {
    var _id = ids[i];
    boards[_id] = {
      _id: _id,
      title: words[i],
      cardslist: ids2[i]
    };
  }
  return boards;
}
//used to create cardslist ids for seedboards
export const seedCardslistIds = (count) => {
  let cardslistIds = [];
  for (var i = 0; i < count; i++) {
    cardslistIds.push(faker.random.alphaNumeric(20));
  }
  return cardslistIds;
}
//used to create a single cardslist in json
export const seedCardslistSingle = (boardId = faker.random.alphaNumeric(20), title = faker.random.words(), _id = faker.random.alphaNumeric(20)) => {
  return {
    boardId: boardId,
    title: title,
    _id: _id,
    cards: seedCardsIds()
  };
}
//used to create random cardslist based on count
export const seedCardslistCount = (boardId, count) => {
  if (!count) {
    count = 1;
  }
  let cardslist = [];
  for (var i = 0; i < count; i++) {
    cardslist.push({
      boardId: boardId,
      _id: faker.random.alphaNumeric(20),
      title: faker.random.words(),
      cards: seedCardsIds(count)
    });
  }
  return cardslist;
}
//create cardslist items based on input value, after normalization
export const seedCardslistInput = function(boardId, words, ids) {
  let cardslist = {};
  for (var i = 0; i < ids.length; i++) {
    var _id = ids[i];
    cardslist[_id]= {
      boardId: boardId[i],
      _id: _id,
      title: words[i],
      cards: seedCardsIds(ids.length)
    };
  }
  return cardslist;
};
//used to create cardslist ids for seedboards
export const seedCardsIds = (count) => {
  let cardsIds = [];
  for (var i = 0; i < count; i++) {
    cardsIds.push(faker.random.alphaNumeric(20));
  }
  return cardsIds;
}
//used to create a single card in json
export const seedCardsSingle = (cardslistId = faker.random.alphaNumeric(20), text = faker.random.words(), _id = faker.random.alphaNumeric(20)) => {
  return {
    cardslistId: cardslistId,
    text: text,
    _id: _id
  };
}
//used to create random cardslist based on count
export const seedCardsCount = (cardslistId, count) => {
  if (!count) {
    count = 1;
  }
  let cards = [];
  for (var i = 0; i < count; i++) {
    cards.push({
      cardslistId: cardslistId,
      _id: faker.random.alphaNumeric(20),
      text: faker.random.words()
    });
  }
  return cards;
}
//create cards items based on input value, after normalization
export const seedCardsInput = function(cardslistId, words, ids) {
  let cards = {};
  for (var i = 0; i < ids.length; i++) {
    var _id = faker.random.alphaNumeric(20);
    cards[_id]= {
      cardslistId: cardslistId[i],
      _id: _id,
      text: faker.random.words()
    };
  }
  return cards;
};
//create a random title
export const createTitle = () => {
return {title: faker.random.words()};
};
