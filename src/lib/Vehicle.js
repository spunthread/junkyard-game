export default class Vehicle {
  constructor(lvl = 1) {
    this.id = Date.now().toString(36);
    this.level = Math.floor(Math.random() * lvl) + 1;
    const configs = Vehicle.config[this.level - 1];
    this.sub = Math.floor(Math.random() * configs.length);
    const config = configs[this.sub];
    this.name = config.name;
    const minPrice = 50 * this.level;
    const maxPrice = minPrice * (this.sub + 2);
    this.price = Math.random() * (maxPrice - minPrice) + minPrice;
    const [parking, storage, garage] = Vehicle.generateRandomIntegers(config.energy, 3);
    this.parkingenergy = parking;
    this.storageenergy = storage;
    this.garageenergy = garage;
    this.garagestage = -1;
    this.garagetime = 0;
    const time = Vehicle.generateRandomIntegers(config.time);
    const ratio = Vehicle.generateRandomIntegers(100).map((n) => n / 100);
    this.parts = Vehicle.parts.map((name) => ({ name, sellprice: 0, time: 0, ratio: 0 }));
    this.parts[0].time = time[1];
    this.parts[1].time = time[0];
    this.parts[2].time = time[6];
    this.parts[3].time = time[2];
    this.parts[4].time = time[3];
    this.parts[5].time = time[4];
    this.parts[6].time = time[9];
    this.parts[7].time = time[8];
    this.parts[8].time = time[7];
    this.parts[9].time = time[5];
    this.parts[0].ratio = ratio[5];
    this.parts[1].ratio = ratio[0];
    this.parts[2].ratio = ratio[2];
    this.parts[3].ratio = ratio[3];
    this.parts[4].ratio = ratio[1];
    this.parts[5].ratio = ratio[4];
    this.parts[6].ratio = ratio[9];
    this.parts[7].ratio = ratio[8];
    this.parts[8].ratio = ratio[7];
    this.parts[9].ratio = ratio[6];
  }

  static generateRandomIntegers(targetSum, numIntegers = 10) {
    const integers = [];
    let sum = 0;

    for (let i = 0; i < numIntegers - 1; i++) {
      const remainingIntegers = numIntegers - i - 1;
      const maxInt = Math.floor((targetSum - sum) / remainingIntegers);
      const randomInt =
        Math.floor(
          Math.random() * Math.max(1, Math.min(maxInt, targetSum - sum - remainingIntegers))
        ) + 1;
      integers.push(randomInt);
      sum += randomInt;
    }

    integers.push(targetSum - sum);

    return integers.sort((a, b) => a - b);
  }

  static parts = [
    "Battery",
    "Fluids",
    "Electronics",
    "Rims",
    "Brakes",
    "Windows",
    "Engine",
    "Transmission",
    "Drivetrain",
    "Scrap"
  ];

  static config = [
    [
      { name: "Nova Chariot", energy: 20, time: 30 },
      { name: "Spectral Glide", energy: 25, time: 40 }
    ],
    [
      { name: "Astral Cruiser", energy: 40, time: 60 },
      { name: "Quantum Streaker", energy: 50, time: 80 }
    ],
    [
      { name: "Nebula Racer", energy: 60, time: 90 },
      { name: "Thunderstrike", energy: 75, time: 120 }
    ],
    [
      { name: "Celestial Blazer", energy: 80, time: 120 },
      { name: "Quantum Streaker", energy: 100, time: 160 }
    ]
  ];

  // Celestial Blazer
  // Solar Cyclone
  // Warp Runner
  // Infinity Drifter
  // Stormbringer
  // Hyperion Vanguard
  // Phoenix Jetstream
  // Zenith Hauler
  // Mirage Navigator
  // Luminary Express
  // Aero Phantom
  // Solstice Voyager
  // Titan's Fury
  // Chronos Explorer
}
