const VehicleConfig = [
	{
		level: 1,

		name: 'Vehicle 1',
		imgsrc: 'res/Vehicle1.png',

		moveEnergy: 5,
		workEnergy: 15,
		storeEnergy: 7,

		minPrice: 45.55,// 50
		maxPrice: 121.37,// 150

		fluidsTime: 5,// 0
		batteryTime: 5,// 1
		rimsTime: 5,// 2
		brakesTime: 5,// 3
		windowsTime: 10,// 4
		electronicsTime: 10,// 5
		drivetrainTime: 10,// 6
		transmissionTime: 10,// 7
		scrapTime: 15,// 8
		engineTime: 15,// 9

		transmissionRatio: 0.18,// 0
		engineRatio: 0.17,// 1
		drivetrainRatio: 0.16,// 2
		scrapRatio: 0.14,// 3
		batteryRatio: 0.12,// 4
		windowsRatio: 0.11,// 5
		rimsRatio: 0.06,// 6
		electronicsRatio: 0.03,// 7
		brakesRatio: 0.02,// 8
		fluidsRatio: 0.01,// 9

	},
	{
		level: 1,

		name: 'Vehicle 2',
		imgsrc: 'res/Vehicle2.png',

		moveEnergy: 6,
		workEnergy: 18,
		storeEnergy: 8,

		minPrice: 68.25,
		maxPrice: 185.71,

		fluidsTime: 5,
		batteryTime: 5,
		rimsTime: 5,
		brakesTime: 5,
		windowsTime: 5,
		electronicsTime: 10,
		drivetrainTime: 10,
		transmissionTime: 10,
		scrapTime: 15,
		engineTime: 20,

		engineRatio: 0.19,
		transmissionRatio: 0.17,
		drivetrainRatio: 0.17,
		scrapRatio: 0.16,
		windowsRatio: 0.11,
		rimsRatio: 0.09,
		batteryRatio: 0.03,
		electronicsRatio: 0.03,
		brakesRatio: 0.03,
		fluidsRatio: 0.02,

	},
	{
		level: 2,

		name: 'Vehicle 3',
		imgsrc: 'res/Vehicle3.png',

		moveEnergy: 8,
		workEnergy: 24,
		storeEnergy: 12,

		minPrice: 85.76,// 100
		maxPrice: 164.38,// 200

		fluidsTime: 5,
		batteryTime: 5,
		rimsTime: 5,
		brakesTime: 5,
		windowsTime: 10,
		electronicsTime: 10,
		drivetrainTime: 15,
		transmissionTime: 20,
		scrapTime: 20,
		engineTime: 25,

		engineRatio: 0.17,
		transmissionRatio: 0.16,
		drivetrainRatio: 0.14,
		scrapRatio: 0.13,
		windowsRatio: 0.11,
		rimsRatio: 0.1,
		batteryRatio: 0.08,
		electronicsRatio: 0.06,
		brakesRatio: 0.04,
		fluidsRatio: 0.01,

	},
	{
		level: 2,

		name: 'Vehicle 4',
		imgsrc: 'res/Vehicle4.png',

		moveEnergy: 9,
		workEnergy: 27,
		storeEnergy: 13,

		minPrice: 121.17,
		maxPrice: 240.85,

		fluidsTime: 5,
		batteryTime: 5,
		rimsTime: 5,
		brakesTime: 5,
		windowsTime: 10,
		electronicsTime: 10,
		drivetrainTime: 15,
		transmissionTime: 15,
		scrapTime: 20,
		engineTime: 30,

		engineRatio: 0.17,
		transmissionRatio: 0.16,
		drivetrainRatio: 0.14,
		scrapRatio: 0.13,
		windowsRatio: 0.11,
		rimsRatio: 0.1,
		batteryRatio: 0.08,
		electronicsRatio: 0.06,
		brakesRatio: 0.04,
		fluidsRatio: 0.01,

	},
	{
		level: 3,

		name: 'Vehicle 5',
		imgsrc: 'res/Vehicle5.png',

		moveEnergy: 11,
		workEnergy: 33,
		storeEnergy: 17,

		minPrice: 138.95,// 150
		maxPrice: 226.51,// 250

		fluidsTime: 5,
		batteryTime: 5,
		rimsTime: 10,
		brakesTime: 10,
		windowsTime: 10,
		electronicsTime: 15,
		drivetrainTime: 20,
		transmissionTime: 20,
		scrapTime: 20,
		engineTime: 35,

		engineRatio: 0.18,
		transmissionRatio: 0.17,
		drivetrainRatio: 0.13,
		scrapRatio: 0.12,
		windowsRatio: 0.11,
		rimsRatio: 0.08,
		batteryRatio: 0.07,
		electronicsRatio: 0.06,
		brakesRatio: 0.05,
		fluidsRatio: 0.03,

	},
	{
		level: 3,

		name: 'Vehicle 6',
		imgsrc: 'res/Vehicle6.png',

		moveEnergy: 12,
		workEnergy: 36,
		storeEnergy: 18,

		minPrice: 164.52,
		maxPrice: 175.19,

		fluidsTime: 5,
		batteryTime: 5,
		rimsTime: 5,
		brakesTime: 10,
		windowsTime: 10,
		electronicsTime: 10,
		drivetrainTime: 15,
		transmissionTime: 20,
		scrapTime: 30,
		engineTime: 40,

		engineRatio: 0.18,
		transmissionRatio: 0.17,
		drivetrainRatio: 0.13,
		scrapRatio: 0.12,
		windowsRatio: 0.11,
		rimsRatio: 0.08,
		batteryRatio: 0.07,
		electronicsRatio: 0.06,
		brakesRatio: 0.05,
		fluidsRatio: 0.03,

	},
	{
		level: 4,

		name: 'Vehicle 7',
		imgsrc: 'res/Vehicle7.png',

		moveEnergy: 14,
		workEnergy: 42,
		storeEnergy: 22,

		minPrice: 185.87,// 200
		maxPrice: 271.21,// 300

		fluidsTime: 5,
		batteryTime: 5,
		rimsTime: 5,
		brakesTime: 10,
		windowsTime: 15,
		electronicsTime: 20,
		drivetrainTime: 20,
		transmissionTime: 25,
		scrapTime: 30,
		engineTime: 45,

		engineRatio: 0.19,
		transmissionRatio: 0.17,
		drivetrainRatio: 0.17,
		scrapRatio: 0.15,
		windowsRatio: 0.1,
		rimsRatio: 0.08,
		batteryRatio: 0.07,
		electronicsRatio: 0.04,
		brakesRatio: 0.02,
		fluidsRatio: 0.01,

	},
	{
		level: 4,

		name: 'Vehicle 8',
		imgsrc: 'res/Vehicle8.png',

		moveEnergy: 15,
		workEnergy: 45,
		storeEnergy: 23,

		minPrice: 215.46,
		maxPrice: 330.78,

		fluidsTime: 5,
		batteryTime: 10,
		rimsTime: 10,
		brakesTime: 10,
		windowsTime: 10,
		electronicsTime: 15,
		drivetrainTime: 20,
		transmissionTime: 25,
		scrapTime: 25,
		engineTime: 50,

		engineRatio: 0.19,
		transmissionRatio: 0.17,
		drivetrainRatio: 0.17,
		scrapRatio: 0.15,
		windowsRatio: 0.1,
		rimsRatio: 0.08,
		batteryRatio: 0.07,
		electronicsRatio: 0.04,
		brakesRatio: 0.02,
		fluidsRatio: 0.01,

	},
	{
		level: 5,

		name: 'Vehicle 9',
		imgsrc: 'res/Vehicle9.png',

		moveEnergy: 17,
		workEnergy: 51,
		storeEnergy: 27,

		minPrice: 130.72,// 250
		maxPrice: 315.01,// 350

		fluidsTime: 10,
		batteryTime: 10,
		rimsTime: 15,
		brakesTime: 15,
		windowsTime: 15,
		electronicsTime: 20,
		drivetrainTime: 30,
		transmissionTime: 35,
		scrapTime: 35,
		engineTime: 55,

		engineRatio: 0.19,
		transmissionRatio: 0.16,
		drivetrainRatio: 0.14,
		scrapRatio: 0.12,
		windowsRatio: 0.11,
		rimsRatio: 0.09,
		batteryRatio: 0.07,
		electronicsRatio: 0.06,
		brakesRatio: 0.03,
		fluidsRatio: 0.03,

	},
	{
		level: 5,

		name: 'Vehicle 10',
		imgsrc: 'res/Vehicle10.png',

		moveEnergy: 18,
		workEnergy: 56,
		storeEnergy: 28,

		minPrice: 272.05,
		maxPrice: 185.96,

		fluidsTime: 10,
		batteryTime: 10,
		rimsTime: 10,
		brakesTime: 10,
		windowsTime: 15,
		electronicsTime: 15,
		drivetrainTime: 30,
		transmissionTime: 35,
		scrapTime: 45,
		engineTime: 60,

		engineRatio: 0.19,
		transmissionRatio: 0.16,
		drivetrainRatio: 0.14,
		scrapRatio: 0.12,
		windowsRatio: 0.11,
		rimsRatio: 0.09,
		batteryRatio: 0.07,
		electronicsRatio: 0.06,
		brakesRatio: 0.03,
		fluidsRatio: 0.03,

	},
];

export default class Vehicle {
	constructor(level) {
		const choices = VehicleConfig.filter(config => config.level <= level);
		const selected = Math.floor(Math.random() * choices.length);
		this.id = Date.now().toString(36);
		this.img = choices[selected].imgsrc;
		this.name = choices[selected].name;
		this.level = choices[selected].level;
		this.move = choices[selected].moveEnergy;
		this.work = choices[selected].workEnergy;
		this.store = choices[selected].storeEnergy;
		this.price = Math.random() * (choices[selected].maxPrice - choices[selected].minPrice) + choices[selected].minPrice;
		this.workTimer = 0;
		this.stage = -1;
		this.parts = [
			{
				ratio: choices[selected].batteryRatio,
				maxTime: choices[selected].batteryTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].engineRatio,
				maxTime: choices[selected].engineTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].windowsRatio,
				maxTime: choices[selected].windowsTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].rimsRatio,
				maxTime: choices[selected].rimsTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].brakesRatio,
				maxTime: choices[selected].brakesTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].drivetrainRatio,
				maxTime: choices[selected].drivetrainTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].transmissionRatio,
				maxTime: choices[selected].transmissionTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].electronicsRatio,
				maxTime: choices[selected].electronicsTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].fluidsRatio,
				maxTime: choices[selected].fluidsTime,
				time: 0,
				price: 0,
				sold: false
			},
			{
				ratio: choices[selected].scrapRatio,
				maxTime: choices[selected].scrapTime,
				time: 0,
				price: 0,
				sold: false
			}
		];
	}
	startWork(cb) {
		this.stage++;
		this.workTimer = setInterval(() => {
			if (this.parts[this.stage].time === this.parts[this.stage].maxTime) {
				this.stage++;
				if (this.stage === 10) {
					clearInterval(this.workTimer);
					cb();
				}
			} else {
				this.parts[this.stage].time++;
			}
		}, 1e3);
	}
}


/*
function getRatio(limit) {
	let total = 100;
	let upto = total / limit * 2;
	let ans = [];
	while (ans.length < limit - 1) {
		const num = Math.floor(Math.random() * upto);
		if (num == 0 || total - num < 1) continue;
		else {
			total -= num;
			ans.push(num/100);
		}
	}
	ans.push(total/100);
	ans.sort((a,b)=>(a-b));
	return ans;
}
Array(10) [ 0.01, 0.02, 0.05, 0.05, 0.1, 0.11, 0.12, 0.16, 0.19, 0.19 ]
*/

/*
1-90 = Array(10) [ 5, 5, 5, 5, 5, 10, 10, 10, 15, 20 ]

2-120 = Array(10) [ 5, 5, 5, 5, 10, 10, 20, 20, 20, 20 ]
3-150 = Array(10) [ 5, 5, 10, 15, 15, 15, 20, 20, 20, 25 ]
4-180 = Array(10) [ 5, 5, 5, 10, 15, 20, 30, 30, 30, 30 ]
5-240 = Array(10) [ 5, 15, 20, 20, 25, 25, 30, 30, 35, 35 ]
6-300 = Array(10) [ 5, 5, 5, 25, 40, 40, 45, 45, 45, 45 ]
7-360 = Array(10) [ 5, 15, 15, 25, 40, 40, 50, 50, 55, 65 ]
8-420 = Array(10) [ 5, 10, 10, 30, 50, 55, 60, 60, 70, 70 ]
9-480 = Array(10) [ 5, 20, 20, 25, 50, 60, 70, 70, 80, 80 ]
10-540 = Array(10) [ 5, 15, 25, 25, 35, 70, 85, 90, 95, 95 ]
function getTime(sec) {
	const ans = [];
	const step = 5;
	let pit = 256;
	let total = sec / step;
	const upto = total / step;
	while (ans.length < 9) {
		const num = Math.floor(Math.random() * upto);
		if (num == 0 || total - num < 1) {
			pit--;
			if (pit == 0) break;
			else continue;
		} else {
			total -= num;
			ans.push(num * step);
		}
	}
	ans.push(total * step);
	ans.sort((a,b)=>(a-b));
	return ans;
}
*/