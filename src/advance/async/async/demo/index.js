const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14,
};

function getFruitNumber(fruit) {
  return sleep(1000).then(() => fruitBasket[fruit]);
}

const fruitsToGet = ['apple', 'grape', 'pear'];

const forLoop = async () => {
  for (let i = 0; i < fruitsToGet.length; i++) {
    const fruitNumber = await getFruitNumber(fruitsToGet[i]);
    console.log('fruitNumber: ', fruitNumber);
  }
};

const forEach = async () => {
  fruitsToGet.forEach(async fruit => {
    const fruitNumber = await getFruitNumber(fruit);
    console.log('fruitNumber: ', fruitNumber);
  });
};

(async function() {
  forEach();
})();
