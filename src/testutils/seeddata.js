'use strict';
import faker from 'faker';

export const seedBoards = function(count, title = faker.random.words(), _id = faker.random.alphaNumeric(20)) {
  if (count != 0) {
    let boards = [];
    for (var i = 0; i < count; i++) {
      boards.push({
        _id: faker.random.alphaNumeric(20),
        title: faker.random.words(),
        cardsList: seedCardslists(count)
      });
    }
    return boards;
  } else {
    return {
      title: title,
      _id: _id,
      cardsList: null
    };
  }
};
//create board items, this is after the data has been normalized
export const seedBoards2 = (count) => {
  let boards = [];
  for (var i = 0; i < count; i++) {
    var _id = faker.random.alphaNumeric(20);
    boards[_id]= {
      _id: _id,
      title: faker.random.words(),
      cardslist: []
    };
    for (var j = 0; j < count; j++) {
      var _id2 = faker.random.alphaNumeric(20);
      boards[_id].cardslist.push(_id2);
    }
  }
  return boards;
}
export const seedCardslists = function(count, title = faker.random.words()) {
  let _id = faker.random.alphaNumeric(20);
  if (count != 0) {
    let cardslist = [];
    for (var i = 0; i < count; i++) {
      cardslist.push({
        _id: faker.random.alphaNumeric(20),
        title: faker.random.words(),
        cards: seedCards(count)
      });
    }
    return cardslist;
  } else {
    return {
      title: title,
      _id: _id,
      cards: null
    };
  }
};
//create cardslist items, this is after the data has been normalized
export const seedCardslists2 = (count) => {
  let cardslist = [];
  for (var i = 0; i < count; i++) {
    var _id = faker.random.alphaNumeric(20);
    cardslist[_id]= {
      _id: _id,
      title: faker.random.words(),
      cards: []
    };
    for (var j = 0; j < count; j++) {
      var _id2 = faker.random.alphaNumeric(20);
      cardslist[_id].cards.push(_id2);
    }
  }
  return cardslist;
}
export const seedCards = function(count, text = faker.random.words()) {
  let _id = faker.random.alphaNumeric(20);
  if (count != 0) {
    let cards = [];
    for (var i = 0; i < count; i++) {
      cards.push({
        _id: faker.random.alphaNumeric(20),
        text: faker.random.words()
      });
    }
    return cards;
  } else {
    return {
      text: text,
      _id: _id
    };
  }
};
//create cards items, this is after the data has been normalized
export const seedCards2 = (data) => {
  let cards = [];
  Object.keys(data).forEach((element) => {
    data[element].cards.forEach((element2) => {
      cards[element2] = {
        _id: element2,
        text: faker.random.words(),
        cardslistId: element
      }
    });
  });
  return cards;
}
//create a random title
export const createTitle = () => {
return {title: faker.random.words()};
};
