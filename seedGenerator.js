const fs = require('fs');
const wordArray = fs.readFileSync('./wordBank.txt').toString().split('\n');

// amount of strings generated in json
const seedCount = 10;
const seedLength = 4;

let seedArray = [];

for (var i = seedCount; i >= 1; i--) {
  let newSeed = [];
  let completedSeed = addComponents(newSeed);

  seedArray.push(completedSeed.join('-'));
}

const citizenSeeds = {
  citizenCap: seedCount,
  seeds: seedArray,
};

fs.writeFile('./citizenSeeds.json', JSON.stringify(citizenSeeds), (err) => {
  if (err) {
    console.log(err)
    return;
  }

  console.log('Citizen seeds created');
})

function getRandomWord() {
  return wordArray[Math.floor(Math.random() * wordArray.length)]; 
}

function addComponents(seedArray) {
  if (seedArray.length === 4) {
    return seedArray;
  } else {
    const newComponent = getRandomWord();

    if (seedArray.indexOf(newComponent) === -1) {
      seedArray.push(newComponent);
    }

    return addComponents(seedArray);
  }
}