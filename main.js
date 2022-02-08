let rpt = document.getElementById("report");

const config = {
	type: "pie",
	options: {},
};

const chart = new Chart(document.getElementById("chart"), config);

rpt.addEventListener("input", (e) => {
	chart.data.datasets = [];
	chart.update();

	let outDiv = document.getElementById("output");

	while (outDiv.firstChild) {
		outDiv.removeChild(outDiv.firstChild);
	}

	let tags = rpt.value
		.match(/\[.+\]/g)
		.join()
		.match(/\w+/g)
		.map((item) => item.toUpperCase());

	let counts = {};

	for (let tag of tags) {
		counts[tag] = counts[tag] ? counts[tag] + 1 : 1;
	}

	let orgs = Object.keys(counts);

	orgs.sort((a, b) => {
		return counts[b] - counts[a];
	});

	let updaters = [];

	for (let org of orgs) {
		updaters.push(counts[org]);
		let p = document.createElement("p");
		let content = document.createTextNode(`${org}: ${counts[org]}`);
		p.appendChild(content);
		outDiv.appendChild(p);
	}

	chart.data.labels = orgs;
	chart.data.datasets = [
		{
			label: "Updater Counts",
			data: updaters,
			backgroundColor: [
				"#4285f4",
				"#ea4335",
				"#fbbc04",
				"#34a853",
				"#ff6d01",
				"#46bdc6",
			],
			hoverOffset: 4,
		},
	];
	chart.update();
	let p = document.createElement("p");
	let content = document.createTextNode(error);
	p.appendChild(content);
	outDiv.appendChild(p);
});
