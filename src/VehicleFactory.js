export default class Vehicle {
  constructor(lvl = 1) {
    this.level = lvl;
    this.id = Date.now().toString(36);
    const vconf = Vehicle.config.get(Math.ceil(Math.random() * lvl))[
      Math.floor(Math.random() * 2)
    ];
    this.name = vconf.name;
    this.price = Math.random() * (vconf.price[1] - vconf.price[0]) + vconf.price[0];
    this.parking = vconf.energy[0];
    this.storage = vconf.energy[1];
    this.garage = vconf.energy[2];
    this.stage = -1;
    this.time = 0;
    this.parts = [
      {
        price: 0,
        name: "Battery",
        time: vconf.time[1],
        ratio: vconf.ratio[5]
      },
      {
        price: 0,
        name: "Fluids",
        time: vconf.time[0],
        ratio: vconf.ratio[0]
      },
      {
        price: 0,
        name: "Electronics",
        time: vconf.time[6],
        ratio: vconf.ratio[2]
      },
      {
        price: 0,
        name: "Rims",
        time: vconf.time[2],
        ratio: vconf.ratio[3]
      },
      {
        price: 0,
        name: "Brakes",
        time: vconf.time[3],
        ratio: vconf.ratio[1]
      },
      {
        price: 0,
        name: "Windows",
        time: vconf.time[4],
        ratio: vconf.ratio[4]
      },
      {
        price: 0,
        name: "Engine",
        time: vconf.time[9],
        ratio: vconf.ratio[9]
      },
      {
        price: 0,
        name: "Transmission",
        time: vconf.time[8],
        ratio: vconf.ratio[8]
      },
      {
        price: 0,
        name: "Drivetrain",
        time: vconf.time[7],
        ratio: vconf.ratio[7]
      },
      {
        price: 0,
        name: "Scrap",
        time: vconf.time[5],
        ratio: vconf.ratio[6]
      }
    ];
  }

  static config = new Map([
    [
      1,
      [
        {
          name: "Vehicle1-1",
          // minPrice, maxPrice
          // mean price 100
          price: [50, 150],
          // parkingEnergy, storageEnergy, garageEnergy
          // total energy 20
          energy: [5, 6, 9],
          // fluidsTime, batteryTime, rimsTime, brakesTime, windowsTime, scrapTime, electronicsTime, drivetrainTime, transmissionTime, engineTime
          // total time 60
          time: [1000, 2000, 3000, 3000, 4000, 5000, 6000, 6000, 15000, 15000],
          // fluidsRatio, brakesRatio, electronicsRatio, rimsRatio, windowsRatio, batteryRatio, scrapRatio, drivetrainRatio, transmissionRatio, engineRatio
          // total ratio 1 always
          ratio: [0.01, 0.03, 0.03, 0.05, 0.09, 0.1, 0.14, 0.17, 0.17, 0.21]
        },
        {
          name: "Vehicle1-2",
          // mean price 100
          price: [75, 125],
          // total energy 30
          energy: [6, 10, 14],
          // total time 90
          time: [1000, 4000, 7000, 8000, 9000, 9000, 10000, 12000, 13000, 17000],
          ratio: [0.01, 0.01, 0.02, 0.05, 0.07, 0.1, 0.1, 0.14, 0.15, 0.35]
        }
      ]
    ],
    [
      2,
      [
        {
          name: "Vehicle2-1",
          // mean price 200
          price: [100, 300],
          // total energy 40
          energy: [6, 11, 23],
          // total time 120
          time: [1000, 1000, 4000, 4000, 10000, 13000, 16000, 18000, 20000, 33000],
          ratio: [0.01, 0.04, 0.05, 0.06, 0.06, 0.11, 0.13, 0.15, 0.16, 0.23]
        },
        {
          name: "Vehicle2-2",
          // mean price 200
          price: [150, 250],
          // total energy 50
          energy: [6, 16, 28],
          // total time 150
          time: [2000, 2000, 3000, 6000, 10000, 12000, 18000, 24000, 36000, 37000],
          ratio: [0.01, 0.01, 0.02, 0.02, 0.02, 0.06, 0.1, 0.24, 0.24, 0.28]
        }
      ]
    ],
    [
      3,
      [
        {
          name: "Vehicle3-1",
          // mean price 300
          price: [150, 450],
          // total energy 60
          energy: [8, 20, 32],
          // total time 180
          time: [3000, 4000, 4000, 11000, 14000, 23000, 25000, 28000, 29000, 39000],
          ratio: [0.01, 0.01, 0.02, 0.08, 0.08, 0.11, 0.12, 0.13, 0.17, 0.27]
        },
        {
          name: "Vehicle3-2",
          // mean price 300
          price: [200, 400],
          // total energy 75
          energy: [8, 27, 40],
          // total time 210
          time: [2000, 8000, 11000, 14000, 18000, 20000, 23000, 24000, 41000, 49000],
          ratio: [0.02, 0.02, 0.04, 0.04, 0.07, 0.08, 0.09, 0.15, 0.21, 0.28]
        }
      ]
    ]
  ]);
}
