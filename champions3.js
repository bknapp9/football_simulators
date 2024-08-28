const startDrawBtn = document.querySelector('#startDraw');
const fastDrawBtn = document.querySelector('#fastDraw');
let KORound = 0;
let potsTables = document.querySelectorAll('.potsTable');
const leagueTable = document.querySelector('#leagueTable');
const tabsContainer = document.querySelector('.tabs-container');
let tabLinks = document.querySelectorAll('.tabs a');
tabLinks = Array.from(tabLinks).slice(0, 7);
const leagueMatches = document.querySelector('.groupStageMatches');
const simulateMatchdayBtn = document.querySelector('#simulateMatchdayBtn');
let GSTableMatches;
const topScorers = document.querySelector('.scorers');
const topScorersList = {};
const topTenScorers = document.querySelector('.topScorers');
const qualifiedToRO16 = [];
const playOffs = [];
const continueToPlayoffs = document.querySelector('#continueToPlayoffs');
const playOffsMatches = document.querySelector('#playOffsMatches');
const simulatePlayoffsBtn = document.querySelector('#simulatePlayoffsBtn');
const simulateKOBtn = document.querySelector('#simulateKOBtn');
let groupSpacings = document.querySelectorAll('.groupSpacing');
let groupSpacing = groupSpacings[0];
let potsBalls = document.querySelectorAll('.potsBall');
const fastKODrawBtn = document.querySelector('#fastKODraw');
const continueToKOBtn = document.querySelector('#continueToKO');
const RO16Matches = document.querySelector('#RO16Matches');
const RO16MatchesTableA = document.querySelectorAll('#RO16MatchesTableA');
const RO16MatchesTableB = document.querySelectorAll('#RO16MatchesTableB');
const tabsContainerRO16 = document.querySelector('#tabsContainerRO16');
const tabLinksRO16 = tabsContainerRO16.querySelectorAll('.tabs a');
const tabPanelsRO16 = tabsContainerRO16.querySelectorAll('.tabs-panel');
const tabsContainerLeague = document.querySelector('#leagueTabsContainer');
const tabLinksLeague = tabsContainerLeague.querySelectorAll('.tabs a');
const RO16TeamNames = document.querySelectorAll('#RO16TeamName');
const RO16TeamImgs = document.querySelectorAll('#RO16TeamsImgs');
let globalScoreValue;
const potsRO16A = document.querySelector('#potsRO16A');
const potsRO16B = document.querySelector('#potsRO16B');
const potsQF = document.querySelector('#potsQF');
const tabsContainerKO = document.querySelector('#tabsContainerKO');
const tabLinksKO = tabsContainerKO.querySelectorAll('.tabs a');
let potsTeamNamesA = [];
let potsTeamNamesB = [];
const doneTeamsA = [0];
const doneTeamsB = [];
const teamNations = [];
let potsBallIdx = 0;
let RO16TeamIdx = 0;
let GSFixture;
const GSDoneTeams = [];
let r = 0;
let potIndex = 0;
let groupIdx = 0;
let groupN = 0;
let leftGroups = [];
let groupsNations = [[], [], [], [], [], [], [], []];
let RO16Nations = [[], [], [], [], [], [], [], []];
let homeTeamGD = 0;
let awayTeamGD = 0;
let done = false;
const GSMatchups = [
	[4, 2, 3, 1],
	[1, 4, 2, 3],
	[4, 3, 2, 1],
	[3, 2, 4, 1],
	[3, 4, 1, 2],
	[2, 4, 1, 3],
];
let matchday = 1;
let RO16FixtureIdx = 0;
let RO16GroupIdx = 0;
const qualifiedToQF = [];
const qualifiedToSF = [];
const qualifiedToF = [];
const QFMatchesTable = document.querySelector('.QFMatches');
const SFMatchesTable = document.querySelector('.SFMatches');
const finalMatchesTable = document.querySelector('.finalMatch');
let QFFixtureIdx = 0;
const QFTeamNames = document.querySelectorAll('#QFTeamName');
const QFTeamImgs = document.querySelectorAll('#QFTeamsImgs');
let teamToMoveYQF = -850;
const pots = document.querySelector('#potsTable');
const potsContainer = document.querySelector('#potsContainer');

function disableBalls() {
	const balls = document.querySelectorAll('.ball'); // Select all ball elements
	balls.forEach((ball) => {
		ball.style.pointerEvents = 'none'; // Disable pointer events (clicks, etc.)
		ball.style.backgroundColor = '#8b8c89'; // Change background color to indicate disabled state
	});
}

// Enable ball elements (reverses the disable function)
function enableBalls() {
	const balls = document.querySelectorAll('.ball');
	balls.forEach((ball) => {
		ball.style.pointerEvents = 'auto'; // Re-enable pointer events
		ball.style.backgroundColor = '#fff'; // Restore original background color
	});
}

// Check if the window width is considered "small"
function isWindowSmall() {
	return window.innerWidth <= 1304; // Define a breakpoint for small windows
}

function sanitizeTeamName(teamName) {
	// Elimina caracteres especiales, espacios, y números; convierte a minúsculas
	return teamName
		.replace(/[^\w\s]/gi, '') // Elimina caracteres especiales
		.replace(/\d+/g, '') // Elimina números
		.replace(/\s+/g, '') // Elimina espacios
		.toLowerCase(); // Convierte a minúsculas
}

function showTeamMatches2(teamName) {
	// Ocultar todos los contenedores de tablas

	// Mostrar el contenedor de tablas del equipo seleccionado
	const teamContainer = document.getElementById(`${sanitizeTeamName(teamName)}TablesContainer`);
	if (teamContainer) {
		teamContainer.style.display = 'block';
	}

	// Hacer visible la sección de partidos si estaba oculta
	const leagueMatchesSection = document.getElementById('leagueMatches');
	leagueMatchesSection.classList.remove('hide');
}

const teams = {
	'Manchester City': 'England',
	'Bayern Munich': 'Germany',
	'Real Madrid': 'Spain',
	PSG: 'France',
	'Liverpool FC': 'England',
	'Inter Milan': 'Italy',
	'Borussia Dortmund': 'Germany',
	'RB Leipzig': 'Germany',
	'FC Barcelona': 'Spain',
	'Bayer Leverkusen': 'Germany',
	'Atletico Madrid': 'Spain',
	Atalanta: 'Italy',
	Juventus: 'Italy',
	Benfica: 'Portugal',
	Arsenal: 'England',
	'Club Brugge': 'Belgium',
	'Shakhtar Donetsk': 'Ukraine',
	'AC Milan': 'Italy',
	Feyenoord: 'Netherlands',
	'Sporting Lisboa': 'Portugal',
	PSV: 'Netherlands',
	Salzburg: 'Austria',
	Lille: 'France',
	'Dinamo Zagreb': 'Croatia',
	Celtic: 'Scotland',
	Galatasaray: 'Turkey',
	'Bodo Glimt': 'Norway',
	Midtjylland: 'Netherlands',
	'AS Monaco': 'France',
	'Sparta Praha': 'Czech Republic',
	'Aston Villa': 'England',
	Bologna: 'Italy',
	Girona: 'Spain',
	Stuttgart: 'Germany',
	'Sturm Graz': 'Austria',
	Brest: 'France',
};

const pot1 = [
	'Manchester City',
	'Bayern Munich',
	'Real Madrid',
	'PSG',
	'Liverpool FC',
	'Inter Milan',
	'Borussia Dortmund',
	'RB Leipzig',
	'FC Barcelona',
];

const pot2 = [
	'Bayer Leverkusen',
	'Atletico Madrid',
	'Atalanta',
	'Juventus',
	'Benfica',
	'Arsenal',
	'Club Brugge',
	'Shakhtar Donetsk',
	'AC Milan',
];
const pot3 = [
	'Feyenoord',
	'Sporting Lisboa',
	'PSV',
	'Salzburg',
	'Lille',
	'Dinamo Zagreb',
	'Celtic',
	'Galatasaray',
	'Bodo Glimt',
];
const pot4 = [
	'Midtjylland',
	'AS Monaco',
	'Sparta Praha',
	'Aston Villa',
	'Bologna',
	'Girona',
	'Stuttgart',
	'Sturm Graz',
	'Brest',
];

function findPotForTeam(team) {
	if (pot1.includes(team)) {
		return pot1;
	} else if (pot2.includes(team)) {
		return pot2;
	} else if (pot3.includes(team)) {
		return pot3;
	} else if (pot4.includes(team)) {
		return pot4;
	} else {
		return 'Equipo no encontrado en ningún pot.';
	}
}

function getRandomTeam(pot, excludedTeam1 = null, excludedTeam2 = null, matches) {
	let randomTeam;
	let occurrences;
	let attempts = 0;
	let pot1Count = 0;
	let pot2Count = 0;
	let pot3Count = 0;
	let pot4Count = 0;
	let currentTeam = team;

	do {
		const filteredPot = pot.filter(
			(team) =>
				team !== excludedTeam1 &&
				team !== excludedTeam2 &&
				teams[team] !== teams[currentTeam] && // Asegurar que no es del mismo país
				countCountryOccurrences(matches[currentTeam], teams[team]) < 2 // Asegurar que no tiene más de 2 equipos del mismo país
		);

		if (filteredPot.length === 0) {
			throw new Error('No hay equipos disponibles para seleccionar.');
		}

		const randomIndex = Math.floor(Math.random() * filteredPot.length);
		randomTeam = filteredPot[randomIndex];
		occurrences = countTeamOccurrences(matches, randomTeam);

		const potTeam = findPotForTeam(team);
		// Comprobar que el equipo no tenga más de 2 equipos de cada bombo
		pot1Count = matches[randomTeam].filter((team) => pot.includes(team)).length;
		pot2Count = matches[randomTeam].filter((team) => potTeam.includes(team)).length;
		// pot3Count = matches[randomTeam].filter((team) => pot3.includes(team)).length;
		// pot4Count = matches[randomTeam].filter((team) => pot4.includes(team)).length;

		attempts++;
		if (attempts > 1000) {
			// randomTeam = filteredPot[0];
			break;
		} // Limitar a 10 intentos para evitar bucles infinitos
	} while (
		occurrences >= 7 ||
		pot1Count >= 2 ||
		pot2Count >= 2 ||
		pot3Count >= 2 ||
		pot4Count >= 2
	); // Comprobar ocurrencias y límite de equipos por bombo

	return randomTeam;
}

function countCountryOccurrences(matchArray, country) {
	return matchArray.reduce((count, opponent) => count + (teams[opponent] === country ? 1 : 0), 0);
}

function countTeamOccurrences(matches, teamName) {
	let count = 0;

	// Iterar sobre todas las propiedades del objeto matches
	for (const team in matches) {
		if (matches.hasOwnProperty(team)) {
			// Contar las ocurrencias del teamName en cada array dentro de matches
			count += matches[team].filter((opponent) => opponent === teamName).length;
		}
	}

	return count;
}

const allTeams = [...pot1, ...pot2, ...pot3, ...pot4];

// Creando el objeto matches con cada equipo como clave y un array vacío como valor
const matches = {};
allTeams.forEach((team) => {
	matches[team] = [];
});

let i = 0;
for (team in teams) {
	i++;

	// Seleccionar 2 equipos de pot1
	if (matches[team].length === 0) {
		var team1 = getRandomTeam(pot1, team, null, matches);
		matches[team].push(team1);
		matches[team1].push(team);
	} else {
		var team1 = matches[team][0];
	}

	if (matches[team].length === 1) {
		var team2 = getRandomTeam(pot1, team, team1, matches);
		matches[team].push(team2);
		matches[team2].push(team);
	}

	// Seleccionar 2 equipos de pot2
	if (matches[team].length === 2) {
		var team3 = getRandomTeam(pot2, team, null, matches);
		matches[team].push(team3);
		matches[team3].push(team);
	} else {
		var team3 = matches[team][2];
	}

	if (matches[team].length === 3) {
		var team4 = getRandomTeam(pot2, team, team3, matches);
		matches[team].push(team4);
		matches[team4].push(team);
	}

	if (matches[team].length === 4) {
		// Seleccionar 2 equipos de pot3
		var team5 = getRandomTeam(pot3, team, null, matches);
		matches[team].push(team5);
		matches[team5].push(team);
	} else {
		var team5 = matches[team][4];
	}

	if (matches[team].length === 5) {
		var team6 = getRandomTeam(pot3, team, team5, matches);
		matches[team].push(team6);
		matches[team6].push(team);
	}

	if (matches[team].length === 6) {
		// Seleccionar 2 equipos de pot4
		var team7 = getRandomTeam(pot4, team, null, matches);
		matches[team].push(team7);
		matches[team7].push(team);
	} else {
		var team7 = matches[team][6];
	}

	if (matches[team].length === 7) {
		var team8 = getRandomTeam(pot4, team, team7, matches);
		matches[team].push(team8);
		matches[team8].push(team);
	}
}

console.log(matches);

function ensureConsistency(matches) {
	for (const [team, opponents] of Object.entries(matches)) {
		opponents.forEach((opponent) => {
			if (!matches[opponent].includes(team)) {
				matches[opponent].push(team);
			}
		});
	}
}

// Llama a la función para asegurar consistencia
ensureConsistency(matches);

// 3. Verificación de condiciones y ajuste final
function checkAndAdjustMatches(matches, teams, pots) {
	const overflowTeams = [];

	for (const [team, opponents] of Object.entries(matches)) {
		// Verificar que el equipo no tenga más de 8 oponentes
		if (opponents.length > 8) {
			while (opponents.length > 8) {
				const removedTeam = opponents.pop();
				overflowTeams.push(removedTeam);
			}
		}

		// Verificar que no haya más de 2 equipos del mismo bombo
		const potCounts = pots.reduce((acc, pot) => {
			acc[pot] = opponents.filter((opponent) => pot.includes(opponent)).length;
			return acc;
		}, {});

		for (let [pot, count] of Object.entries(potCounts)) {
			if (count > 2) {
				while (count > 2) {
					const index = opponents.findIndex((opponent) => pot.includes(opponent));
					if (index !== -1) {
						const removedTeam = opponents.splice(index, 1)[0];
						overflowTeams.push(removedTeam);
						count--;
					}
				}
			}
		}

		// Verificar que no haya equipos del mismo país
		const countryCounts = {};
		opponents.forEach((opponent) => {
			const country = teams[opponent];
			if (country) {
				countryCounts[country] = (countryCounts[country] || 0) + 1;
			}
		});

		for (let [country, count] of Object.entries(countryCounts)) {
			if (count > 2) {
				while (count > 2) {
					const index = opponents.findIndex((opponent) => teams[opponent] === country);
					if (index !== -1) {
						const removedTeam = opponents.splice(index, 1)[0];
						overflowTeams.push(removedTeam);
						count--;
					}
				}
			}
		}
	}

	// Insertar equipos faltantes desde overflowTeams
	// overflowTeams.forEach((team) => {
	// 	for (const [teamInMatches, opponents] of Object.entries(matches)) {
	// 		if (opponents.length < 8) {
	// 			opponents.push(team);
	// 			matches[team].push(teamInMatches);
	// 			overflowTeams.splice(overflowTeams.indexOf(team), 1);
	// 			break;
	// 		}
	// 	}
	// });
}

// Llama a la función para verificar y ajustar los matches
// checkAndAdjustMatches(matches, teams, [pot1, pot2, pot3, pot4]);

function findDuplicates(arr) {
	const seen = new Set();
	const duplicates = new Set();

	for (const item of arr) {
		if (seen.has(item)) {
			duplicates.add(item);
		} else {
			seen.add(item);
		}
	}

	return Array.from(duplicates);
}

function findOverflowTeams(allTeams, pots) {
	const potMap = {};
	const overflowTeams = [];

	// Crear un mapa con los equipos de cada pot
	pots.forEach((pot, index) => {
		pot.forEach((team) => {
			potMap[team] = index + 1; // +1 porque los indices son 0, pero los pots empiezan en 1
		});
	});

	// Contador de equipos por pot
	const potCount = {};

	allTeams.forEach((team) => {
		const potNumber = potMap[team];
		if (potNumber) {
			if (!potCount[potNumber]) {
				potCount[potNumber] = [];
			}
			potCount[potNumber].push(team);

			// Si hay más de 2 equipos en el mismo pot, agregar a overflowTeams
			if (potCount[potNumber].length > 2) {
				overflowTeams.push(team);
			}
		}
	});

	return overflowTeams;
}

function findMissingTeams(allTeams, pots) {
	const potMap = {};
	const potCount = {};
	const neededPots = [];

	// Crear un mapa con los equipos de cada pot y un contador inicializado en 0 para cada pot
	pots.forEach((pot, index) => {
		pot.forEach((team) => {
			potMap[team] = index + 1; // +1 porque los indices son 0, pero los pots empiezan en 1
		});
		potCount[index + 1] = 0; // Inicializar contador para cada pot
	});

	// Contar cuántos equipos de cada pot están presentes
	allTeams.forEach((team) => {
		const potNumber = potMap[team];
		if (potNumber) {
			potCount[potNumber]++;
		}
	});

	// Verificar si algún pot tiene menos de 2 equipos representados
	Object.keys(potCount).forEach((potNumber) => {
		if (potCount[potNumber] < 2) {
			neededPots.push({
				potNumber: potNumber,
				missingTeams: 2 - potCount[potNumber],
			});
		}
	});

	return neededPots;
}

const leftOverTeams = [];
for (const team in matches) {
	const match = matches[team];

	if (match.length >= 9) {
		const dups = findDuplicates(match);

		if (dups > 0) {
			match.splice(match.indexOf(dups[0]), 1);
			leftOverTeams.push(dups[0]);
		} else {
			const samePotTeams = findOverflowTeams(match, [pot1, pot2, pot3, pot4]);
			match.splice(match.indexOf(samePotTeams[0], 1));
			matches[samePotTeams[0]].splice(matches[samePotTeams[0]].indexOf(team), 1);
			leftOverTeams.push(samePotTeams[0]);
		}
	}
}

for (const team in matches) {
	const match = matches[team];

	if (match.length <= 7) {
		const pots = [pot1, pot2, pot3, pot4];
		const missing = findMissingTeams(match, pots);
		for (let n = 0; n < missing.length; n++) {
			const missingPot = parseInt(missing[n].potNumber);
			const numberMissing = missing[n].missingTeams;

			for (let i = 0; i < numberMissing; i++) {
				let teamsInPot;
				if (leftOverTeams.length === 0) {
					teamsInPot = [pots[missingPot - 1][6]];
				} else {
					try {
						teamsInPot = leftOverTeams.filter((team) =>
							pots[missingPot].includes(team)
						);
					} catch {
						teamsInPot = [pots[missingPot - 1][6]];
					}
				}

				if (teamsInPot.length === 0) {
					teamsInPot = [pots[missingPot - 1][6]];
				}

				try {
					for (const potTeam of teamsInPot) {
						if (matches[potTeam].length < 8) {
							const missingTeam = findMissingTeams(matches[potTeam], pots);

							if (missingPot === missingTeam[0].potNumber) {
								matches[potTeam].push(team);
								match.push(potTeam);
								leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
							}
						} else {
							match.push(potTeam);
							leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
						}
					}
				} catch (e) {
					console.log(e);
				}
			}
		}
	}
}

for (const team in matches) {
	const match = matches[team];

	if (match.length >= 9) {
		const dups = findDuplicates(match);

		if (dups > 0) {
			match.splice(match.indexOf(dups[0]), 1);
			leftOverTeams.push(dups[0]);
		} else {
			const samePotTeams = findOverflowTeams(match, [pot1, pot2, pot3, pot4]);
			match.splice(match.indexOf(samePotTeams[0], 1));
			matches[samePotTeams[0]].splice(matches[samePotTeams[0]].indexOf(team), 1);
			leftOverTeams.push(samePotTeams[0]);
		}
	}
}

for (const team in matches) {
	const match = matches[team];

	if (match.length <= 7) {
		const pots = [pot1, pot2, pot3, pot4];
		const missing = findMissingTeams(match, pots);
		for (let n = 0; n < missing.length; n++) {
			const missingPot = parseInt(missing[n].potNumber);
			const numberMissing = missing[n].missingTeams;

			for (let i = 0; i < numberMissing; i++) {
				if (leftOverTeams.length === 0) {
					teamsInPot = [pots[missingPot - 1][6]];
				} else {
					try {
						teamsInPot = leftOverTeams.filter((team) =>
							pots[missingPot].includes(team)
						);
					} catch {
						teamsInPot = [pots[missingPot - 1][6]];
					}
				}

				if (teamsInPot.length === 0) {
					teamsInPot = [pots[missingPot - 1][6]];
				}

				for (const potTeam of teamsInPot) {
					if (matches[potTeam].length < 8) {
						const missingTeam = findMissingTeams(matches[potTeam], pots);

						if (missingPot === missingTeam[0].potNumber) {
							matches[potTeam].push(team);
							match.push(potTeam);
							leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
						} else {
							match.push(potTeam);
							leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
						}
					} else {
						match.push(potTeam);
						leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
					}
				}
			}
		}
	}
}

for (const team in matches) {
	const match = matches[team];

	if (match.length >= 9) {
		const dups = findDuplicates(match);

		if (dups > 0) {
			match.splice(match.indexOf(dups[0]), 1);
			leftOverTeams.push(dups[0]);
		} else {
			const samePotTeams = findOverflowTeams(match, [pot1, pot2, pot3, pot4]);
			match.splice(match.indexOf(samePotTeams[0], 1));
			matches[samePotTeams[0]].splice(matches[samePotTeams[0]].indexOf(team), 1);
			leftOverTeams.push(samePotTeams[0]);
		}
	}
}

for (const team in matches) {
	const match = matches[team];

	if (match.length <= 7) {
		const pots = [pot1, pot2, pot3, pot4];
		const missing = findMissingTeams(match, pots);
		for (let n = 0; n < missing.length; n++) {
			const missingPot = parseInt(missing[n].potNumber);
			const numberMissing = missing[n].missingTeams;

			for (let i = 0; i < numberMissing; i++) {
				if (leftOverTeams.length === 0) {
					teamsInPot = [pots[missingPot - 1][6]];
				} else {
					try {
						teamsInPot = leftOverTeams.filter((team) =>
							pots[missingPot].includes(team)
						);
					} catch {
						teamsInPot = [pots[missingPot - 1][6]];
					}
				}

				if (teamsInPot.length === 0) {
					teamsInPot = [pots[missingPot - 1][6]];
				}

				for (const potTeam of teamsInPot) {
					if (matches[potTeam].length < 8) {
						const missingTeam = findMissingTeams(matches[potTeam], pots);

						if (missingPot === missingTeam[0].potNumber) {
							matches[potTeam].push(team);
							match.push(potTeam);
							leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
						} else {
							match.push(potTeam);
							leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
						}
					} else {
						match.push(potTeam);
						leftOverTeams.splice(leftOverTeams.indexOf(potTeam));
					}
				}
			}
		}
	}
}

// function sortTeamsByPots(teams, pot1, pot2, pot3, pot4) {
// 	const allPots = [pot1, pot2, pot3, pot4];

// 	const getPotIndex = (team) => {
// 		for (let i = 0; i < allPots.length; i++) {
// 			if (allPots[i].includes(team)) {
// 				return i;
// 			}
// 		}
// 		return -1; // Si el equipo no está en ningún pot
// 	};

// 	const sortedTeams = {};

// 	for (const [team, opponents] of Object.entries(teams)) {
// 		sortedTeams[team] = opponents.sort((a, b) => {
// 			const potIndexA = getPotIndex(a);
// 			const potIndexB = getPotIndex(b);

// 			if (potIndexA !== potIndexB) {
// 				return potIndexA - potIndexB;
// 			}

// 			// Si están en el mismo pot, mantener el orden original
// 			return opponents.indexOf(a) - opponents.indexOf(b);
// 		});
// 	}

// 	return sortedTeams;
// }

// const teamMatches = sortTeamsByPots(matches, pot1, pot2, pot3, pot4);
// for (const team in teamMatches) {
// 	const matches = teamMatches[team];
// 	for (let i = 0; i < matches.length; i++) {
// 		const match = matches[i];
// 		if (teamMatches[match]) {
// 			const index = teamMatches[match].indexOf(team);
// 			if (index !== i) {
// 				const indexBefore = teamMatches[match][i];
// 				teamMatches[match][index] = indexBefore;
// 				teamMatches[match][i] = team;
// 			}
// 		}
// 	}
// }
// for (const team in teamMatches) {
// 	const matches = teamMatches[team];
// 	for (let i = 0; i < matches.length; i++) {
// 		const match = matches[i];
// 		if (teamMatches[match]) {
// 			const index = teamMatches[match].indexOf(team);
// 			if (index !== i) {
// 				const indexBefore = teamMatches[match][i];
// 				teamMatches[match][index] = indexBefore;
// 				teamMatches[match][i] = team;
// 			}
// 		}
// 	}
// }
// for (const team in teamMatches) {
// 	const matches = teamMatches[team];
// 	for (let i = 0; i < matches.length; i++) {
// 		const match = matches[i];
// 		if (teamMatches[match]) {
// 			const index = teamMatches[match].indexOf(team);
// 			if (index !== i) {
// 				const indexBefore = teamMatches[match][i];
// 				teamMatches[match][index] = indexBefore;
// 				teamMatches[match][i] = team;
// 			}
// 		}
// 	}
// }
// for (const team in teamMatches) {
// 	const matches = teamMatches[team];
// 	for (let i = 0; i < matches.length; i++) {
// 		const match = matches[i];
// 		if (teamMatches[match]) {
// 			const index = teamMatches[match].indexOf(team);
// 			if (index !== i) {
// 				const indexBefore = teamMatches[match][i];
// 				teamMatches[match][index] = indexBefore;
// 				teamMatches[match][i] = team;
// 			}
// 		}
// 	}
// }
// for (const team in teamMatches) {
// 	const matches = teamMatches[team];
// 	for (let i = 0; i < matches.length; i++) {
// 		const match = matches[i];
// 		if (teamMatches[match]) {
// 			const index = teamMatches[match].indexOf(team);
// 			if (index !== i) {
// 				const indexBefore = teamMatches[match][i];
// 				teamMatches[match][index] = indexBefore;
// 				teamMatches[match][i] = team;
// 			}
// 		}
// 	}
// }

[...pot1, ...pot2, ...pot3, ...pot4].forEach((team) => {
	const matchesContainer = document.getElementById(`${team}TablesContainer`);
	if (matchesContainer) {
		const tables = matchesContainer.querySelectorAll('.GSTableMatches');
		let home = true; // Inicialmente, el primer partido es de local para cada equipo

		tables.forEach((table) => {
			const rows = table.querySelectorAll('.fixtureRow');
			rows.forEach((row) => {
				// Si es el equipo de casa, no hacemos nada, y alternamos. Si no, aplicamos clase 'reverse'
				const homeTeamName = row
					.querySelector('.homeTeamName')
					.textContent.trim()
					.toLowerCase()
					.replace(/\s/g, '');
				const awayTeamName = row
					.querySelector('.awayTeamName')
					.textContent.trim()
					.toLowerCase()
					.replace(/\s/g, '');

				if (homeTeamName === team) {
					if (!home) {
						row.classList.add('reverse');
					} else {
						row.classList.remove('reverse');
					}
				} else if (awayTeamName === team) {
					if (home) {
						row.classList.add('reverse');
					} else {
						row.classList.remove('reverse');
					}
				}

				home = !home; // Alterna la localía para el siguiente partido
			});
		});
	}
});

const teamMatches = matches;
const loadTeams = async () => {
	const res = await fetch('euro_teams.json'); // Fetch JSON data
	const data = await res.json(); // Parse JSON data

	const teams = data.Teams.Team; // Extract teams array
	const OriginalGS = data.OriginalCLIGS; // Extract original group stage data

	return [teams, OriginalGS]; // Return both arrays
};

loadTeams().then((Teams) => {
	const allTeams = Teams[0]; // Teams array
	const originalGS = Teams[1]; // Original group stage data

	function movePot(potTable) {
		return new Promise((resolve) => {
			potTable.classList.remove('hide'); // Show the pot table
			potTable.style.position = 'absolute'; // Make positionable
			potTable.style.bottom = '0';
			potTable.style.right = '0';
			potTable.style.transition = 'all 1s ease-in-out'; // Add smooth transition

			potTable.style.transform = 'translate(0, 0)'; // Initial position
			setTimeout(() => {
				potTable.style.transform = 'translate(20%, 35%)'; // Final position
				resolve(); // Indicate animation is complete
			}, 100); // Delay before starting animation
		});
	}

	async function moveTeamAsync(team, x, y) {
		if (!isWindowSmall()) {
			moveTeam(team, x, y);
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	function normalizeTeamName(selectedTeam) {
		const normalizedTeam = selectedTeam.replace(/[áéíóúÁÉÍÓÚãñÑ]/g, (match) => {
			if (match.normalize) {
				return match.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			} else {
				return match.replace(/[áéíóúÁÉÍÓÚãñÑ]/g, '');
			}
		});

		return normalizedTeam;
	}

	async function moveTeam(team, x, y) {
		x++; // Adjust x coordinate

		team.style.position = 'absolute'; // Make positionable
		team.style.bottom = '0';
		team.style.right = '0';
		team.style.transition = 'all 1s ease-in-out'; // Add smooth transition

		team.style.transform = 'translate(0, 0)'; // Initial position

		// Calculate final position based on conditions
		if (x <= 4) {
			x = -2000 + x * 400;
		} else if (x > 4 && x < 9) {
			x = -2000 + (x - 4) * 400;
			y = -280;
		} else if (qualifiedToQF.length === 0) {
			// Check if in group stage
			x = x % 2 === 1 ? -1200 : -700;
		} else {
			x = x % 2 === 1 ? -1300 : -650;
		}

		setTimeout(() => {
			team.style.transform = `translate(${x}px, ${y}px)`; // Final position
			setTimeout(() => {
				team.classList.add('hide'); // Hide after moving
			}, 1000); // Delay before hiding
		}, 100); // Delay before starting animation

		return 'done'; // Indicate animation is complete
	}

	let teamToMoveY = -930;
	potsBalls.forEach((potsBall) => {
		potsBall.addEventListener('click', () => {
			if (KORound === 0) {
				let selectedTeam = potsBall.innerText.trim();
				const teamToMove = Array.from(potTeams).find(
					(team) => team.innerText.trim() === selectedTeam
				);

				let teamInfo = allTeams.find((team) => team.Team === selectedTeam);
				let teamNation = teamInfo.TeamCountry;

				potsBall.classList.add('hide');
				disableBalls();
				let y = -550;

				moveTeamAsync(teamToMove, groupIdx, y).then(() => {
					const selectedTeam = teamToMove.innerText;
					const normalizedTeam = normalizeTeamName(selectedTeam);

					groupStageTeams[potIndex + groupIdx * 4].innerText = selectedTeam;
					groupStageImgs[potIndex + groupIdx * 4].src = `images/${normalizedTeam.replace(
						/\s+/g,
						''
					)}.png`;
					r++;
					groupsNations[groupIdx].push(teamNation);
					enableBalls();

					if (r > 8 && groupIdx < 8) {
						const activePotsBalls = document.querySelectorAll(
							'.potsBalls .potsBall:not(.hide)'
						);
						let sameNationCount = 0;
						for (const ball of activePotsBalls) {
							let potTeamName = ball.innerText.trim();

							let teamInfo = allTeams.find((team) => team.Team === potTeamName);
							let teamNation = teamInfo.TeamCountry;

							if (groupsNations[groupIdx + 1].includes(teamNation)) {
								sameNationCount++;
								ball.style.pointerEvents = 'none';
								ball.style.backgroundColor = '#8b8c89';
							}

							if (sameNationCount === activePotsBalls.length) {
								// Si todas las bolas restantes son del mismo país que el ya seleccionado, activar todas las bolas
								enableBalls();
							} else {
								if (groupsNations[groupIdx + 1].includes(teamNation)) {
									ball.style.pointerEvents = 'none';
									ball.style.backgroundColor = '#8b8c89';
								}
							}
						}
					}
					groupIdx++;
					GSDoneTeams.push(selectedTeam.trim());

					if (r === 8 || r === 16 || r === 24) {
						potIndex += 1;
						groupIdx = 0;
						startDrawBtn.classList.add('hide');
						fastDrawBtn.classList.add('hide');
						continueFromOriginalBtn.classList.add('hide');
						potTable.classList.add('hide');
						continueDrawBtn.classList.remove('hide');
						done = false;
					} else if (r === 32) {
						generateFixturesBtn.classList.remove('hide');
						hideTablesExcept(false, potsTables);
						r = 0;
						RO16TeamIdx = 0;
					}
				});
			} else if (KORound === 1) {
				document.querySelector('.potsBalls').style.margin = '-70px 100px';

				potsTables = document.querySelectorAll('.potsTable');
				let potTeams = potsTables[4 + (i % 2)].querySelectorAll('.potsTeam');
				let selectedTeam = potsBall.innerText.trim();
				const teamToMove = Array.from(potTeams).find(
					(team) => team.innerText.trim() === selectedTeam
				);

				potsBall.classList.add('hide');
				disableBalls();

				if (RO16FixtureIdx % 2 === 0) {
					teamToMoveY += 200;
				}

				moveTeamAsync(teamToMove, 1200 + RO16FixtureIdx, teamToMoveY).then(() => {
					selectedTeam = teamToMove.innerText.trim();
					const normalizedTeam = normalizeTeamName(selectedTeam);

					if (RO16FixtureIdx % 2 === 0) {
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].innerText =
							selectedTeam;
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)].innerText =
							selectedTeam;
						RO16TeamImgs[
							potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)
						].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						RO16TeamImgs[
							potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)
						].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					} else {
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)].innerText =
							selectedTeam;
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].innerText =
							selectedTeam;
						RO16TeamImgs[
							potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)
						].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						RO16TeamImgs[
							potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)
						].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					}

					const potsRO16AClasses = potsRO16A.classList;
					const potsRO16AClassList = Array.from(potsRO16AClasses);
					const potsRO16BClasses = potsRO16B.classList;
					const potsRO16BClassList = Array.from(potsRO16BClasses);
					RO16FixtureIdx++;
					r++;
					i++;
					if (r === 8) {
						teamToMoveY = -930;
						showTables(RO16MatchesTableB);
						potsContainer.classList.remove('hide');
						hideTablesExcept(false, RO16MatchesTableA);
					} else if (r === 16) {
						tabsContainerRO16.classList.remove('hide');
						hideTablesExcept(false, RO16MatchesTableB);
						showTables(RO16MatchesTableA);
						pots.classList.add('hide');
						simulateKOBtn.classList.remove('hide');
						r = 0;
					}
					enableBalls();

					if (potsRO16BClassList.includes('hide')) {
						i = 5;
						teamNames = extractTeamNames(i);
						potsRO16A.classList.add('hide');
						generateBalls(8, teamNames, potsRO16B, doneTeamsB, i).then(() => {
							if (doneTeamsA.length === 1) {
								doneTeamsA.push(selectedTeam);
							} else {
								doneTeamsA.push(selectedTeam);
							}
							potsBalls = document.querySelectorAll('.potsBall');
						});
					} else if (potsRO16AClassList.includes('hide')) {
						i = 4;
						potsRO16B.classList.add('hide');
						teamNames = extractTeamNames(i);
						generateBalls(8, teamNames, potsRO16A, doneTeamsA, i).then(() => {
							doneTeamsB.push(selectedTeam);
							potsBalls = document.querySelectorAll('.potsBall');
							enableBalls();
						});
					}
				});
			}
		});
	});

	// Function to animate moving a team element
	async function moveTeam(team, x, y) {
		x++; // Adjust x coordinate

		team.style.position = 'absolute'; // Make positionable
		team.style.bottom = '0';
		team.style.right = '0';
		team.style.transition = 'all 1s ease-in-out'; // Add smooth transition

		team.style.transform = 'translate(0, 0)'; // Initial position

		// Calculate final position based on conditions
		if (x <= 4) {
			x = -2000 + x * 400;
		} else if (x > 4 && x < 9) {
			x = -2000 + (x - 4) * 400;
			y = -280;
		} else if (qualifiedToQF.length === 0) {
			// Check if in group stage
			x = x % 2 === 1 ? -1200 : -700;
		} else {
			x = x % 2 === 1 ? -1300 : -650;
		}

		setTimeout(() => {
			team.style.transform = `translate(${x}px, ${y}px)`; // Final position
			setTimeout(() => {
				team.classList.add('hide'); // Hide after moving
			}, 1000); // Delay before hiding
		}, 100); // Delay before starting animation

		return 'done'; // Indicate animation is complete
	}

	async function generateBalls(maxNum, teamNames, potTable, doneTeams = false, i = false) {
		enableBalls();
		hideTablesExcept(potTable);

		if (isWindowSmall()) {
			for (let ball of potsBalls) {
				ball.classList.add('ball');
				ball.classList.add('white');
				ball.classList.remove('hide');
				chooseRandomTeam(maxNum, teamNames, ball, doneTeams);
				maxNum--;
			}
		} else {
			await movePot(potTable);
			potsBallIdx = 0;
			RO16TeamIdx++;

			let allSameNation = true;

			for (let ball of potsBalls) {
				potsBallIdx++;
				ball.classList.add('ball', 'white');
				ball.classList.remove('hide');
				chooseRandomTeam(maxNum--, teamNames, ball, doneTeams);

				if (
					RO16TeamIdx % 2 === 0 &&
					doneTeams &&
					!doneTeams.includes(ball.innerText.trim()) &&
					KORound === 0
				) {
					let teamInfo = allTeams.find((team) => team.Team === ball.innerText.trim());
					if (teamInfo.TeamCountry !== teamNations[0]) {
						allSameNation = false;
					} else {
						ball.style.pointerEvents = 'none';
						ball.style.backgroundColor = '#8b8c89';
					}
				}
			}

			if (allSameNation) {
				enableBalls();
			}

			// If the number of active balls and teams don't match, regenerate
			let activePotsBalls = document.querySelectorAll('.potsBall:not(.hide)').length;
			let activePotsTeams = potTable.querySelectorAll('.potsTeam:not(.hide)').length;
			if (activePotsBalls !== activePotsTeams) {
				teamNames = extractTeamNames(i);
				generateBalls(8, teamNames, potTable, doneTeams, i);
			}
		}
	}

	function hideTablesExcept(tableToShow = false, tables = potsTables) {
		for (let table of tables) {
			if (table !== tableToShow) {
				table.classList.add('hide');
			}
		}
	}

	function showTables(tables) {
		for (let table of tables) {
			if (!table.classList.contains('done')) {
				table.classList.remove('hide');
			}
		}
	}

	function chooseRandomTeam(maxNum, potTeams, ball, doneTeams = false) {
		let i = Math.floor(Math.random() * maxNum);
		let team = potTeams[i];
		let counter = 0;
		while (doneTeams && doneTeams.includes(team.trim()) && counter < 8) {
			i = Math.floor(Math.random() * maxNum);
			team = potTeams[i];
			counter++;
		}

		if (counter === 8) {
			ball.classList.add('hide');
			return false;
		}

		ball.style.fontSize = 0;
		ball.innerText = team;
		potTeams.splice(i, 1);
	}

	function extractTeamNames(i) {
		potTable = potsTables[i];
		potTeams = potTable.querySelectorAll('.potsTeam');
		potTeams = shuffleTeams(potTeams);

		let teamNames = [];
		potTeams.forEach((team) => {
			teamNames.push(team.innerText);
		});
		return teamNames;
	}

	function shuffleTeams(nodeList) {
		const array = Array.from(nodeList);
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	let potTable, potTeams, teamNames;
	startDrawBtn.addEventListener('click', (e) => {
		e.preventDefault();

		startDrawBtn.classList.add('hide');

		if (KORound === 0) {
			hideTablesExcept(false);
			leagueTable.classList.remove('hide');
			function sanitizeTeamName(teamName) {
				// Elimina caracteres especiales y espacios, convierte a minúsculas
				return teamName
					.replace(/[^\w\s]/gi, '')
					.replace(/\s+/g, '')
					.toLowerCase();
			}

			function generateMatchTables() {
				const leagueMatchesSection = document.getElementById('leagueMatches');

				for (const [team, opponents] of Object.entries(teamMatches)) {
					// Crear una sección para cada equipo

					const teamSection = document.createElement('section');
					teamSection.className = 'groupStageMatches';
					teamSection.id = `${sanitizeTeamName(team)}Section`;

					// Crear un div contenedor para las tablas del equipo
					const teamTablesContainer = document.createElement('div');
					teamTablesContainer.className = 'team-tables-container';
					teamTablesContainer.id = `${sanitizeTeamName(team)}TablesContainer`;

					// Dividimos los oponentes en grupos de 2
					for (let i = 0; i < opponents.length; i += 2) {
						const table = document.createElement('table');
						table.className = 'GSTableMatches';
						table.id = `${sanitizeTeamName(team)}Matches${i / 2 + 1}`;

						const tbody = document.createElement('tbody');
						tbody.className = 'groupMatches';

						// Creamos 2 filas por tabla
						for (let j = 0; j < 2 && i + j < opponents.length; j++) {
							const opponent = opponents[i + j];

							const isHome = (i + j) % 2 === 0;

							const homeTeam = isHome ? team : opponent;
							const awayTeam = isHome ? opponent : team;

							const tr = document.createElement('tr');
							tr.classList.add('expandableRow');
							tr.innerHTML = `
                                <td class="fixtureRow">
                                    <div class="homeTeam">
                                        <div class="homeTeamLogo">
                                            <img src="images/${sanitizeTeamName(
												homeTeam
											)}.png" alt="${homeTeam}" class="teamsImgs" onerror="this.src='images/default.png';">
                                        </div>
                                        <div class="homeTeamName">${homeTeam}</div>
                                        <div class="homeTeamScore"></div>
                                    </div>
                                    <div class="fixtureVS">VS</div>
                                    <div class="awayTeam">
                                        <div class="awayTeamScore"></div>
                                        <div class="awayTeamName">${awayTeam}</div>
                                        <div class="awayTeamLogo">
                                            <img src="images/${sanitizeTeamName(
												awayTeam
											)}.png" alt="${awayTeam}" class="teamsImgs" onerror="this.src='images/default.png';">
                                        </div>
                                    </div>
                                </td>
                            `;
							tbody.appendChild(tr);
						}

						table.appendChild(tbody);
						teamTablesContainer.appendChild(table);
					}

					// Agregar el contenedor de tablas a la sección del equipo
					teamSection.appendChild(teamTablesContainer);

					// Agregar la sección del equipo al contenedor principal
					leagueMatchesSection.appendChild(teamSection);
				}
			}

			function addTeamClickListeners() {
				const teamRows = document.querySelectorAll('.stats');
				teamRows.forEach((row) => {
					row.style.cursor = 'pointer';
					row.addEventListener('click', function () {
						const teamName = this.querySelector('.GSTeamName').textContent;
						showTeamMatches(teamName);
						leagueTable.classList.add('hide');
						const activeTabs = document.querySelectorAll('#leagueTabs li');
						activeTabs[0].classList.remove('active');
						activeTabs[1].classList.add('active');
					});
				});
			}

			function showTeamMatches(teamName) {
				// Ocultar todos los contenedores de tablas
				document.querySelectorAll('.team-tables-container').forEach((container) => {
					container.style.display = 'none';
				});

				// Mostrar el contenedor de tablas del equipo seleccionado
				const teamContainer = document.getElementById(
					`${sanitizeTeamName(teamName)}TablesContainer`
				);
				if (teamContainer) {
					teamContainer.style.display = 'block';
				}

				// Hacer visible la sección de partidos si estaba oculta
				const leagueMatchesSection = document.getElementById('leagueMatches');
				leagueMatchesSection.classList.remove('hide');
			}

			function hideTeamMatches(teamName) {
				// Ocultar el contenedor de tablas del equipo seleccionado
				const teamContainer = document.getElementById(
					`${sanitizeTeamName(teamName)}TablesContainer`
				);
				if (teamContainer) {
					teamContainer.style.display = 'none';
				}

				// Opcionalmente, podrías ocultar la sección de partidos si no se muestran otros equipos
				const leagueMatchesSection = document.getElementById('leagueMatches');
				if (
					leagueMatchesSection &&
					!leagueMatchesSection.querySelector(
						'.team-tables-container:not([style*="display: none"])'
					)
				) {
					leagueMatchesSection.classList.add('hide');
				}
			}

			generateMatchTables();
			addTeamClickListeners();

			tabsContainer.classList.remove('hide');
			simulateMatchdayBtn.classList.remove('hide');
			GSTableMatches = document.querySelectorAll('.GSTableMatches');

			// for (const [team, opponents] of Object.entries(teamMatches)) {
			// 	let y = 0;
			// 	const home = [];
			// 	const away = [];
			// 	if (team === 'Aston Villa') {
			// 		console.log('a');
			// 	}
			// 	showTeamMatches(team);

			// 	for (const opponent of opponents) {
			// 		y++;
			// 		showTeamMatches2(opponent);

			// 		let fixtures;
			// 		try {
			// 			fixtures = searchFixture(team, opponent);

			// 			if (
			// 				fixtures[0].querySelector('.homeTeamName') !== team ||
			// 				fixtures[0].querySelector('.awayTeamName') !== team
			// 			) {
			// 				let fixture = fixtures.pop();
			// 				fixtures.push(fixture);
			// 			}

			// 			if (fixtures)
			// 				if (home.length > away.length) {
			// 					fixtures[1].classList.remove('reverse');
			// 					fixtures[0].classList.add('reverse');
			// 					away.push(team);
			// 				} else {
			// 					home.push(team);
			// 					fixtures[0].classList.remove('reverse');
			// 					fixtures[1].classList.add('reverse');
			// 				}
			// 		} catch (e) {
			// 			console.log(e);
			// 			if (home.length < away.length) {
			// 				fixtures[0].classList.add('reverse');
			// 				home.push(team);
			// 			} else {
			// 				away.push(team);
			// 				fixtures[0].classList.remove('reverse');
			// 			}
			// 		}
			// 		hideTeamMatches(opponent);
			// 	}
			// }

			for (let el of tabLinksLeague) {
				el.addEventListener('click', (e) => {
					e.preventDefault();

					leagueTable.classList.add('hide');
					leagueMatches.classList.add('hide');

					let active = document.querySelector('.tabs li.active');
					if (active) {
						active.classList.remove('active');
					}

					const parentListItem = el.parentElement;
					parentListItem.classList.add('active');
					const dataIndex = parentListItem.getAttribute('data-index');

					if (dataIndex === '0') {
						leagueTable.classList.remove('hide');
					} else if (dataIndex === '1') {
						leagueMatches.classList.remove('hide');
					} else {
						topScorers.classList.remove('hide');
					}
				});
			}
		} else if (KORound === 1) {
			i = 4;
			potIndex = 0;
			potsRO16B.classList.add('hide');
			const teamNames = extractTeamNames(i);
			generateBalls(8, teamNames, potsRO16A, doneTeamsA);
		} else if (KORound === 2) {
			i = 6;
			potIndex = 0;
			movePot(potsQF);
			const teamNames = extractTeamNames(i);
			generateBalls(8, teamNames, potsQF);
		}

		continueDrawBtn.addEventListener('click', (e) => {
			e.preventDefault();
			continueDrawBtn.classList.add('hide');

			potTable = potsTables[potIndex];
			potTeams = potTable.querySelectorAll('.potsTeam');
			potTeams = shuffleTeams(potTeams);
			teamNames = extractTeamNames(potIndex);
			let maxNum = 8;
			showTables(potsTables);
			generateBalls(maxNum, teamNames, potTable).then(() => {
				for (ball of potsBalls) {
					let potTeamName = ball.innerText.trim();
					let teamInfo = allTeams.find((team) => team.Team === potTeamName);
					let teamNation = teamInfo.TeamCountry;

					if (groupsNations[groupIdx].includes(teamNation)) {
						ball.style.pointerEvents = 'none';
						ball.style.backgroundColor = '#8b8c89';
					}
				}
			});
		});

		function fillRoundOf16() {
			potsTables = document.querySelectorAll('.potsTable');
			hideTablesExcept(false, potsTables);
			potIndex = 0;
			RO16FixtureIdx = 0;

			for (const potTable of potsTables) {
				let potTeams = potsTables[4 + (RO16FixtureIdx % 2)].querySelectorAll('.potsTeam');

				let i = 0;
				while (i < potTeams.length) {
					const potTeamName = potTeams[i];
					const selectedTeam = potTeamName.innerText.trim();
					const teamInfo = allTeams.find((team) => team.Team === selectedTeam);
					const teamNation = teamInfo.TeamCountry;

					const normalizedTeam = normalizeTeamName(selectedTeam);

					if (!RO16Nations[RO16GroupIdx].includes(teamNation) || RO16GroupIdx === 7) {
						if (r < 8) {
							RO16TeamNames[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)
							].innerText = selectedTeam;
							RO16TeamNames[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)
							].innerText = selectedTeam;
							RO16TeamImgs[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)
							].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
							RO16TeamImgs[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)
							].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						} else {
							RO16TeamNames[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)
							].innerText = selectedTeam;
							RO16TeamNames[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)
							].innerText = selectedTeam;
							RO16TeamImgs[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)
							].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
							RO16TeamImgs[
								potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)
							].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						}
						RO16Nations[RO16GroupIdx].push(teamNation);
						RO16GroupIdx++;
						i++;
					} else {
						potTeams = Array.from(potTeams);
						potTeams.splice(i, 1);
						potTeams.push(potTeamName);
					}

					RO16FixtureIdx += 2;
					r++;
				}

				RO16FixtureIdx = 1;
				RO16GroupIdx = 0;

				if (r === 16) {
					tabsContainerRO16.classList.remove('hide');
					hideTablesExcept(false, RO16MatchesTableB);
					showTables(RO16MatchesTableA);
					potsRO16A.classList.add('hide');
					pots.classList.add('hide');
					simulateKOBtn.classList.remove('hide');
					break;
				}
			}
		}

		function fillQuarterFinals() {
			potsTables = document.querySelectorAll('.potsTable');
			hideTablesExcept(false, potsTables);

			potIndex = 0;
			QFFixtureIdx = 0;

			let potTeams = potsTables[6].querySelectorAll('.potsTeam');

			let i = 0;
			while (i < potTeams.length) {
				const potTeamName = potTeams[i];
				const selectedTeam = potTeamName.innerText.trim();
				const teamInfo = allTeams.find((team) => team.Team === selectedTeam);
				const teamNation = teamInfo.TeamCountry;

				const normalizedTeam = normalizeTeamName(selectedTeam);

				if (QFFixtureIdx % 2 === 0) {
					QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx + 1)].innerText =
						selectedTeam;
					QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx + 2)].innerText =
						selectedTeam;
					QFTeamImgs[
						potIndex + QFFixtureIdx + (QFFixtureIdx + 1)
					].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					QFTeamImgs[
						potIndex + QFFixtureIdx + (QFFixtureIdx + 2)
					].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
				} else {
					QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx - 2)].innerText =
						selectedTeam;
					QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx + 1)].innerText =
						selectedTeam;
					QFTeamImgs[
						potIndex + QFFixtureIdx + (QFFixtureIdx - 2)
					].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					QFTeamImgs[
						potIndex + QFFixtureIdx + (QFFixtureIdx + 1)
					].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
				}

				i++;

				QFFixtureIdx += 1;
				r++;
			}

			if (r === 24) {
				potsRO16A.classList.add('hide');
				simulateKOBtn.classList.remove('hide');
				tabsContainerKO.classList.remove('hide');
			}
		}

		function placeTeamInGroup(teamName, groupIdx, teamInfo) {
			const normalizedTeam = normalizeTeamName(teamName);
			groupStageTeams[potIndex + groupIdx * 4].innerText = teamName;
			groupStageImgs[potIndex + groupIdx * 4].src = `images/${normalizedTeam.replace(
				/\s+/g,
				''
			)}.png`;
			groupsNations[groupIdx].push(teamInfo.TeamCountry);
		}

		fastDrawBtn.addEventListener('click', (e) => {
			e.preventDefault();
			[startDrawBtn, fastDrawBtn].forEach((btn) => btn.classList.add('hide'));

			if (KORound === 0) {
				fillGroupStage();
				generateFixturesBtn.classList.remove('hide');
			} else if (KORound === 1) {
				fillRoundOf16();
			} else if (KORound === 2) {
				fillQuarterFinals();
			}
		});

		async function moveTeamAsync(team, x, y) {
			if (!isWindowSmall()) {
				moveTeam(team, x, y);
			}

			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		function generateRandomNumber(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function generateEvenNumber(min, max) {
			let evenNumber;
			do {
				evenNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			} while (evenNumber % 2 !== 0);
			return evenNumber;
		}

		function generateNumbersGoals(result) {
			let random = Math.random();

			let range1_3 = 0.8;
			let range4_8 = 0.2;

			if (result === 'Draw') {
				return generateEvenNumber(0, 10);
			}
			if (random < range1_3) {
				return generateRandomNumber(1, 3);
			} else if (random < range4_8) {
				return generateRandomNumber(4, 8);
			} else {
				return generateRandomNumber(9, 10);
			}
		}

		function generateGoalDifference(ratingDifference, gNumber) {
			if (ratingDifference <= 20) {
				if (gNumber % 2 === 0) {
					return generateRandomNumber(2, 2);
				} else {
					return generateRandomNumber(1, 1);
				}
			} else if (ratingDifference > 20 && ratingDifference <= 40 && gNumber >= 2) {
				if (gNumber % 2 === 0) {
					return generateRandomNumber(2, 2);
				} else {
					return generateRandomNumber(3, 3);
				}
			} else if (ratingDifference >= 40 && gNumber >= 3) {
				if (gNumber % 2 === 0) {
					return generateRandomNumber(4, 4);
				} else {
					return generateRandomNumber(3, 3);
				}
			} else {
				if (gNumber % 2 === 0) {
					return generateRandomNumber(2, 2);
				} else if (gNumber === 0) {
					return 0;
				} else {
					return generateRandomNumber(1, 1);
				}
			}
		}

		function determineResult(homeTeamWinChance, teamRatingDifference) {
			let drawProbability = teamRatingDifference < 10 ? 0.2 : 0.1;

			let random = Math.random();

			if (random < drawProbability) {
				return 'Draw';
			} else {
				let randomOutcome = Math.random();
				if (randomOutcome < homeTeamWinChance) {
					return 'Home Team';
				} else {
					return 'Away Team';
				}
			}
		}

		function determineGoalScorers(team, gNumber, ET = false) {
			if (gNumber === 0) {
				return null;
			}

			const players = team.Players;
			const penaltyTaker = players.find((player) => player.PenaltyTaker === true);
			let goalScorers = [];
			let goalMinutes = [];

			let random = Math.random() * 100;
			let penaltyChance = Math.random() * 100;

			let goalN = 0;
			for (player of players) {
				if (penaltyChance <= 20) {
					goalScorers.push({ player: penaltyTaker, isPenalty: true });
					let goalMinute = generateGoalMinute(ET);
					goalMinutes.push(goalMinute);
					goalN++;
					penaltyChance = Math.random() * 100;
				}
				if (random < player.ScoringChance && goalN < gNumber) {
					goalScorers.push({ player: player, isPenalty: false });
					let goalMinute = generateGoalMinute(ET);
					goalMinutes.push(goalMinute);
					goalN++;

					if (goalN >= gNumber) {
						for (let goalScorer of goalScorers) {
							try {
								fullName =
									goalScorer.player.FirstName + ' ' + goalScorer.player.LastName;
							} catch (e) {
								console.log(e);
							}
							if (topScorersList[fullName]) {
								topScorersList[fullName]++;
							} else {
								topScorersList[fullName] = 1;
							}
						}
						return { goalScorers: goalScorers, goalMinutes: goalMinutes };
					}
				}
				random -= player.ScoringChance;
			}

			return goalScorers;
		}

		function updateGoalScorers(topScorersList) {
			const topTenScorersList = getTopScorers(topScorersList, 10);

			const topScorersRanks = Array.from(topTenScorers.querySelectorAll('tr'));

			let index = 0;
			for (const [playerName, goals] of Object.entries(topTenScorersList)) {
				if (index >= topScorersRanks.length) {
					break;
				}
				const playerRow = topScorersRanks[index++];
				let topScorerName = playerRow.querySelector('.topScorerName');
				let topScorerTeam = playerRow.querySelector('.topScorerTeam');
				let topScorerGoals = playerRow.querySelector('.topScorerGoals');

				topScorerName.textContent = playerName;
				topScorerTeam.textContent = findTeamByPlayerName(Teams, playerName);
				topScorerGoals.textContent = goals;
			}
		}

		function sortTable(table) {
			let tbody = table.querySelector('tbody');
			let rows = Array.from(tbody.querySelectorAll('tr'));

			rows.sort(function (a, b) {
				let pointsA = parseInt(a.querySelector('.totalPts').textContent) || 0;
				let pointsB = parseInt(b.querySelector('.totalPts').textContent) || 0;
				let goalDiffA = parseInt(a.querySelector('.goalDifference').textContent) || 0;
				let goalDiffB = parseInt(b.querySelector('.goalDifference').textContent) || 0;

				if (pointsA !== pointsB) {
					return pointsB - pointsA;
				} else {
					return goalDiffB - goalDiffA;
				}
			});

			rows.forEach(function (row) {
				tbody.appendChild(row);
			});
		}

		function sortObj(obj) {
			if (Array.isArray(obj)) {
				return obj.sort((a, b) => parseInt(a) - parseInt(b));
			} else {
				obj.goalMinutes.sort((a, b) => parseInt(a) - parseInt(b));
				obj.goalScorers.sort((a, b) => {
					const indexA = obj.goalMinutes.indexOf(a);
					const indexB = obj.goalMinutes.indexOf(b);
					return indexA - indexB;
				});

				return obj;
			}
		}
		function searchTeam(teamName) {
			let section = document.getElementById('leagueTable');
			let tables = section.querySelectorAll('table');
			for (let i = 0; i < tables.length; i++) {
				let rows = tables[i].querySelectorAll('tbody tr');

				for (let j = 0; j < rows.length; j++) {
					let rowTeamName = rows[j].querySelector('.GSTeamName').textContent;
					if (rowTeamName.trim() === teamName.trim()) {
						return rows[j];
					}
				}
			}
			return null;
		}

		function searchFixture(homeTeamName, awayTeamName) {
			let matchingFixtures = [];
			homeTeamName = sanitizeTeamName(homeTeamName);
			awayTeamName = sanitizeTeamName(awayTeamName);

			for (let GSTable of GSTableMatches) {
				let homeTeams = GSTable.querySelectorAll('.homeTeam');
				let awayTeams = GSTable.querySelectorAll('.awayTeam');
				let fixtureRow = null;

				for (let i = 0; i < homeTeams.length; i++) {
					const homeTeam = sanitizeTeamName(
						homeTeams[i].textContent.trim().replace(/\d+/g, '')
					);
					const awayTeam = sanitizeTeamName(
						awayTeams[i].textContent.trim().replace(/\d+/g, '')
					);
					if (
						(homeTeam === homeTeamName && awayTeam === awayTeamName) ||
						(homeTeam === awayTeamName && awayTeam === homeTeamName)
					) {
						if (homeTeam === homeTeamName || homeTeam === awayTeamName) {
							fixtureRow = GSTable.querySelector('.fixtureRow');
							const hteam = sanitizeTeamName(
								fixtureRow.querySelector('.homeTeamName').textContent.trim()
							);
							const ateam = sanitizeTeamName(
								fixtureRow.querySelector('.awayTeamName').textContent.trim()
							);

							if (
								(hteam !== homeTeamName && hteam !== awayTeamName) ||
								(ateam !== awayTeamName && ateam !== homeTeamName)
							) {
								fixtureRow = GSTable.querySelectorAll('.fixtureRow')[1];
							}
						} else if (awayTeam === awayTeamName || awayTeam === homeTeamName) {
							fixtureRow = GSTable.querySelectorAll('.fixtureRow')[1];
						}
						matchingFixtures.push(fixtureRow);
					}
				}
			}

			return matchingFixtures;
		}

		function updateScores(teamRow, id, numToUpdate) {
			try {
				const currentNum = parseInt(teamRow.querySelector(id).textContent);
				const newNum = currentNum + numToUpdate;
				teamRow.querySelector(id).textContent = newNum.toString();
			} catch (e) {
				console.log(e);
			}
		}

		function normalizeTeamName(selectedTeam) {
			const normalizedTeam = selectedTeam.replace(/[áéíóúÁÉÍÓÚãñÑ]/g, (match) => {
				if (match.normalize) {
					return match.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				} else {
					return match.replace(/[áéíóúÁÉÍÓÚãñÑ]/g, '');
				}
			});

			return normalizedTeam;
		}

		function generateGoalMinute(extraTime = false) {
			const probability = Math.random();

			if (extraTime) {
				const minute = `${Math.floor(Math.random() * 31) + 90}`;
				return minute;
			} else if (probability <= 0.05) {
				let half = Math.random();
				if (half <= 0.5) {
					var halfAddedTime = 45;
				} else {
					var halfAddedTime = 90;
				}
				const addedTime = `${halfAddedTime} + ${Math.floor(Math.random() * 10) + 1}`;
				return addedTime;
			} else {
				const minute = `${Math.floor(Math.random() * 90) + 1}`;
				return minute;
			}
		}

		function getTopScorers(obj, limit = 10) {
			// Convertir el objeto en un array de pares clave-valor
			const entries = Object.entries(obj);

			// Ordenar el array en orden descendente basado en los valores (cantidad de goles)
			const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

			// Tomar los primeros 'limit' elementos del array (los 10 primeros por defecto)
			const topEntries = sortedEntries.slice(0, limit);

			// Crear un nuevo objeto a partir de los 10 primeros elementos del array
			const topScorers = Object.fromEntries(topEntries);

			return topScorers;
		}

		function penalties() {
			const results = [
				{ score: '4-3', probability: 0.235 },
				{ score: '3-2', probability: 0.206 },
				{ score: '5-4', probability: 0.163 },
				{ score: '4-2', probability: 0.134 },
				{ score: '3-1', probability: 0.122 },
				{ score: '5-3', probability: 0.113 },
				{ score: '4-1', probability: 0.101 },
				{ score: '2-2', probability: 0.067 },
				{ score: '2-1', probability: 0.059 },
				{ score: '1-1', probability: 0.046 },
			];

			const chooseResult = () => {
				const random = Math.random();
				let cumulativeProbability = 0;

				for (const result of results) {
					cumulativeProbability += result.probability;
					if (random <= cumulativeProbability) {
						return result.score;
					}
				}
			};

			return chooseResult();
		}

		function extraTime() {
			const result = Math.random();

			let winner;
			let winMethod;

			if (result < 0.5) {
				winner = 'Home Team';
			} else {
				winner = 'Away Team';
			}

			if (result < 0.5) {
				winMethod = 'Penalties';
			} else {
				winMethod = 'Extra Time';
			}

			return { winner, winMethod };
		}

		function findTeamByPlayerName(playersData, playerName) {
			for (const team of Object.values(playersData[0])) {
				const player = team.Players.find((player) => {
					const fullName = player.FirstName + ' ' + player.LastName;
					return fullName.trim() === playerName.trim();
				});
				if (player) {
					return team.Team;
				}
			}
			return null; // Retorna null si no se encuentra el jugador en ningún equipo
		}

		function sumObjects(obj1, obj2) {
			try {
				if (!obj2) {
					return { ...obj1 };
				} else if (!obj1.goalScorers) {
					obj1 = {
						goalScorers: obj1,
					};
				} else {
					const goalScorers = [...obj1.goalScorers, ...obj2.goalScorers];

					const goalMinutes = [...obj1.goalMinutes, ...obj2.goalMinutes];

					return { goalScorers, goalMinutes };
				}
			} catch (e) {
				console.log(e);
			}
		}

		function qualifyTeam(team) {
			if (qualifiedToQF.length < 8) {
				qualifiedToQF.push(team);
			} else if (qualifiedToSF.length < 4) {
				qualifiedToSF.push(team);
			} else {
				qualifiedToF.push(team);
			}
		}

		let clickCount = 0;
		simulateMatchdayBtn.addEventListener('click', async (e) => {
			e.preventDefault();

			clickCount++;

			// if (KORound !== 1 && clickCount === 2) {
			// 	clickCount = 0;
			// }
			const fixtureIdx = [];
			// if (clickCount === 1) {
			// 	for (let i = 0; i <= 143; i += 4) {
			// 		fixtureIdx.push(i);
			// 	}
			// 	fixtureIdx.push(143);
			// } else if (clickCount === 2) {
			// 	for (let i = 1; i <= 143; i += 4) {
			// 		fixtureIdx.push(i);
			// 	}
			// 	fixtureIdx.push(143);
			// } else if (clickCount === 3)
			// if (KORound === 4) {
			//     simulateKOBtn.innerText = 'Simulate 2nd Leg';
			// } else {
			//     simulateKOBtn.innerText = 'Simulate 2nd Leg';
			// }

			// simulateKOBtn.innerText = 'Simulate 2nd Leg';

			for (let i = 0; i <= 143; i++) {
				fixtureIdx.push(i);
			}

			const homeTeams = fixtureIdx.flatMap((index) => {
				const elements = GSTableMatches[index].querySelectorAll('.homeTeamName');
				return [elements[0].textContent, elements[1].textContent];
			});

			const awayTeams = fixtureIdx.flatMap((index) => {
				const elements = GSTableMatches[index].querySelectorAll('.awayTeamName');
				return [elements[0].textContent, elements[1].textContent];
			});

			const doneTeams = [];

			let x = 0;
			for (let i = 0; i < homeTeams.length; i++) {
				try {
					if (x % 2 === 0) {
						x++;
					}
					let winMethod;
					const homeTeam = homeTeams[i];
					const awayTeam = awayTeams[i];

					const containsPair = doneTeams.some(
						(pair) =>
							(pair[0] === homeTeam && pair[1] === awayTeam) ||
							(pair[0] === awayTeam && pair[1] === homeTeam)
					);
					doneTeams.push([homeTeam, awayTeam]);

					if (!containsPair) {
						const homeTeamInfo = allTeams.find((team) => team.Team === homeTeam);
						const awayTeamInfo = allTeams.find((team) => team.Team === awayTeam);
						const homeTeamRating = homeTeamInfo.TeamRating;
						const awayTeamRating = awayTeamInfo.TeamRating;
						if (homeTeamRating > awayTeamRating) {
							var homeTeamWinChance = (55 + (homeTeamRating - awayTeamRating)) / 100;
							var awayTeamWinChance = (45 - (homeTeamRating - awayTeamRating)) / 100;
							ratingDifference = homeTeamRating - awayTeamRating;
						} else {
							var homeTeamWinChance = (55 - (awayTeamRating - homeTeamRating)) / 100;
							var awayTeamWinChance = (45 + (awayTeamRating - homeTeamRating)) / 100;
							ratingDifference = awayTeamRating - homeTeamRating;
						}

						homeTeamWinChance = homeTeamWinChance;
						awayTeamWinChance = awayTeamWinChance;

						let result = determineResult(homeTeamWinChance, ratingDifference);
						// console.log(result)
						let nGoals = generateNumbersGoals(result);
						let gDifference = generateGoalDifference(ratingDifference, nGoals);

						let homeTeamGoals = 0;
						let awayTeamGoals = 0;
						let homeTeamRow = searchTeam(homeTeam);
						let awayTeamRow = searchTeam(awayTeam);

						if (result === 'Home Team') {
							homeTeamGoals = 0;
							awayTeamGoals = 0 - gDifference;
							for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
								awayTeamGoals++;
								homeTeamGoals++;
							}
							updateScores(homeTeamRow, '#gamesWon', 1);
							updateScores(awayTeamRow, '#gamesLost', 1);
							updateScores(homeTeamRow, '#goalDifference', gDifference);
							updateScores(awayTeamRow, '#goalDifference', -gDifference);
							updateScores(homeTeamRow, '#totalPts', 3);
						} else if (result === 'Away Team') {
							homeTeamGoals = 0 - gDifference;
							awayTeamGoals = 0;
							for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
								awayTeamGoals++;
								homeTeamGoals++;
							}
							updateScores(awayTeamRow, '#gamesWon', 1);
							updateScores(homeTeamRow, '#gamesLost', 1);
							updateScores(awayTeamRow, '#goalDifference', gDifference);
							updateScores(homeTeamRow, '#goalDifference', -gDifference);
							updateScores(awayTeamRow, '#totalPts', 3);
						} else {
							homeTeamGoals = nGoals / 2;
							awayTeamGoals = nGoals / 2;
							updateScores(homeTeamRow, '#gamesDrawn', 1);
							updateScores(awayTeamRow, '#gamesDrawn', 1);
							updateScores(homeTeamRow, '#goalDifference', gDifference);
							updateScores(awayTeamRow, '#goalDifference', gDifference);
							updateScores(homeTeamRow, '#totalPts', 1);
							updateScores(awayTeamRow, '#totalPts', 1);
						}

						// firstLegHTScore =
						// 	parseInt(
						// 		GSTableMatches[fixtureIdx[i]].querySelector('.homeTeamScore').innerText
						// 	) || 0;

						// let globalHTScore = firstLegHTScore + awayTeamGoals;

						// let firstLegATScore = parseInt(
						// 	GSTableMatches[fixtureIdx[i]].querySelector('.awayTeamScore').innerText
						// );
						// let globalATScore = firstLegATScore + homeTeamGoals;

						// if (qualifiedToF.length > 1) {
						// 	globalHTScore = awayTeamGoals;
						// 	globalATScore = homeTeamGoals;
						// 	clickCount = 2;
						// }

						// let secondLegHTGoals = 0;
						// let secondLegATGoals = 0;
						// let penaltiesResult;
						// if (globalHTScore === globalATScore) {
						// 	const ET = extraTime(homeTeamGoals, awayTeamGoals);
						// 	result = ET.winner;
						// 	winMethod = ET.winMethod;

						// 	if (winMethod === 'Penalties') {
						// 		penaltiesResult = penalties();
						// 	} else {
						// 		nGoals = generateRandomNumber(1, 2);
						// 		gDifference = nGoals;

						// 		if (result === 'Home Team') {
						// 			secondLegHTGoals += nGoals;
						// 		} else {
						// 			secondLegATGoals += nGoals;
						// 		}
						// 		globalHTScore += secondLegHTGoals;
						// 		globalATScore += secondLegATGoals;
						// 	}
						// }

						let detailsElement = document.createElement('div');

						detailsElement.classList.add('details');

						const stadiumName = homeTeamInfo.Stadium[0].Name;
						const attendancePercentage = homeTeamInfo.Stadium[0].FilledPercentageGS;
						const capacity = homeTeamInfo.Stadium[0].Capacity;
						const attendance =
							Math.round((attendancePercentage * capacity) / 100) +
							Math.floor(Math.random() * 1000) +
							1;

						let homeTeamScores;
						let awayTeamScores;
						try {
							const fixtures = searchFixture(homeTeam, awayTeam);

							if (!fixtures) {
								searchFixture(awayTeam, homeTeam);
							}
							homeTeamScores = fixtures[0].querySelectorAll(
								'.homeTeamScore:not(.done)'
							);
							awayTeamScores = fixtures[0].querySelectorAll(
								'.awayTeamScore:not(.done)'
							);

							homeTeamScores[0].innerText = homeTeamGoals;
							awayTeamScores[0].innerText = awayTeamGoals;
							homeTeamScores[0].classList.add('done');
							awayTeamScores[0].classList.add('done');
							if (fixtures[1]) {
								homeTeamScores = fixtures[1].querySelectorAll(
									'.homeTeamScore:not(.done)'
								);
								awayTeamScores = fixtures[1].querySelectorAll(
									'.awayTeamScore:not(.done)'
								);

								homeTeamScores[0].innerText = homeTeamGoals;
								awayTeamScores[0].innerText = awayTeamGoals;
								homeTeamScores[0].classList.add('done');
								awayTeamScores[0].classList.add('done');
							}
						} catch (e) {
							let a = searchFixture(homeTeam, awayTeam);
							a = searchFixture(awayTeam, homeTeam);
							console.log(e);
						}

						homeTeamScores[0].classList.add('done');
						awayTeamScores[0].classList.add('done');
						detailsElement.innerHTML = `<p class="stadium">${stadiumName}</p>
                                    <p class="attendance">${attendance}</p>`;

						let homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
						let awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);

						// if (clickCount === 2) {
						// // 	console.log(homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, winMethod);
						// // 	console.log(
						// // 		firstLegHTScore,
						// // 		awayTeamGoals,
						// // 		firstLegATScore,
						// // 		homeTeamGoals,
						// // 		globalHTScore,
						// // 		globalATScore
						// // 	);
						// // }

						// if (winMethod === 'Extra Time') {
						// 	if (result === 'Home Team') {
						// 		let ETGoalScorers = determineGoalScorers(homeTeamInfo, nGoals, (ET = true));
						// 		while (!ETGoalScorers.goalMinutes) {
						// 			ETGoalScorers = determineGoalScorers(homeTeamInfo, nGoals, (ET = true));
						// 		}
						// 		while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
						// 			homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
						// 		}
						// 		homeTeamGoal = sumObjects(ETGoalScorers, homeTeamGoal);
						// 	} else {
						// 		let ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, (ET = true));
						// 		while (!ETGoalScorers.goalMinutes) {
						// 			ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, (ET = true));
						// 		}
						// 		while (awayTeamGoal && !awayTeamGoal.goalMinutes) {
						// 			awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
						// 		}
						// 		awayTeamGoal = sumObjects(ETGoalScorers, awayTeamGoal);
						// 	}
						// }

						if (homeTeamGoals !== 0) {
							while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
								homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
							}
							let homeTeamGoalScorers = homeTeamGoal.goalScorers;
							let homeTeamGoalMinutes = sortObj(homeTeamGoal.goalMinutes);

							for (let i = 0; i < homeTeamGoalScorers.length; i++) {
								let goalScorer =
									homeTeamGoalScorers[i].player.LastName !== ''
										? homeTeamGoalScorers[i].player.LastName
										: homeTeamGoalScorers[i].player.FirstName;
								let goalMinute = homeTeamGoalMinutes[i];
								let html = `<p class="home"><span class="goalMinute">${goalMinute}' </span>  ${goalScorer}`;
								if (homeTeamGoalScorers[i].isPenalty) {
									html += ' (p)';
								}
								html += '</p>';
								detailsElement.innerHTML += html;
							}
						}
						if (awayTeamGoals !== 0) {
							while (awayTeamGoal && !awayTeamGoal.goalMinutes) {
								awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
							}
							let awayTeamGoalScorers = awayTeamGoal.goalScorers;
							let awayTeamGoalMinutes = sortObj(awayTeamGoal.goalMinutes);

							for (let i = 0; i < awayTeamGoalScorers.length; i++) {
								let goalScorer =
									awayTeamGoalScorers[i].player.LastName !== ''
										? awayTeamGoalScorers[i].player.LastName
										: awayTeamGoalScorers[i].player.FirstName;
								let goalMinute = awayTeamGoalMinutes[i];
								let html = `<p class="away"><span class="goalMinute">${goalMinute}'  </span> ${goalScorer}`;
								if (awayTeamGoalScorers[i].isPenalty) {
									html += ' (p)';
								}
								html += '</p>';
								detailsElement.innerHTML += html;
							}
						}

						// console.log(homeTeamGoalScorers)
						// console.log(awayTeamGoalScorers)
						// console.log(`Result: ${result}, Number of Goals: ${nGoals}, Goal Difference: ${gDifference}, ${homeTeam}: ${homeTeamGoals}, ${awayTeam}: ${awayTeamGoals}`)

						updateScores(homeTeamRow, '#matchesPlayed', 1);
						updateScores(awayTeamRow, '#matchesPlayed', 1);

						let currentRows = searchFixture(homeTeam, awayTeam);

						for (let currentRow of currentRows) {
							// Crea un nuevo elemento detailsElement para cada iteración
							const newDetailsElement = detailsElement.cloneNode(true);

							const detailsElementDiv =
								currentRow.parentNode.querySelector('.details');
							if (!detailsElementDiv) {
								currentRow.parentNode.insertBefore(
									newDetailsElement,
									currentRow.nextSibling
								);
							}

							newDetailsElement.classList.toggle('hide');
							currentRow.classList.add('done');
						}

						sortTable(leagueTable);
						updateGoalScorers(topScorersList);
					}
				} catch (e) {
					console.log(e);
				}
				// if (clickCount === 2) {
				// 	simulateKOBtn.classList.add('hide');
				// 	continueToKOBtn.classList.remove('hide');
				// 	if (KORound === 1) {
				// 		continueToKOBtn.innerText = 'Continue to Quarter Finals';
				// 	} else if (KORound === 2) {
				// 		continueToKOBtn.innerText = 'Continue to Semi Finals';
				// 	} else {
				// 		continueToKOBtn.innerText = 'Continue to Final';
				// 	}

				// 	simulateKOBtn.innerText = 'Simulate 1st Leg';

				// 	if (qualifiedToF.length > 0) {
				// 		simulateKOBtn.innerText = 'Simulate Final';
				// 	}
				// 	GSTableMatches[fixtureIdx[i]]
				// 		.querySelector('.globalScore')
				// 		.classList.remove('hide');
				// 	globalScoreValue =
				// 		GSTableMatches[fixtureIdx[i]].querySelector('.globalScoreValue');

				// 	if (globalHTScore > globalATScore) {
				// 		qualifyTeam(awayTeam);
				// 	} else if (globalATScore > globalHTScore) {
				// 		qualifyTeam(homeTeam);
				// 	} else {
				// 		if (result === 'Home Team') {
				// 			qualifyTeam(homeTeam);
				// 		} else {
				// 			qualifyTeam(awayTeam);
				// 		}
				// 	}

				// if (winMethod === 'Penalties') {
				// 	penaltiesResults = penaltiesResult.split('-');

				// 	if (result === 'Home Team') {
				// 		penaltiesScoreOne = parseInt(penaltiesResults[0]);
				// 		penaltiesScoreTwo = parseInt(penaltiesResults[1]);
				// 	} else {
				// 		penaltiesScoreOne = parseInt(penaltiesResults[1]);
				// 		penaltiesScoreTwo = parseInt(penaltiesResults[0]);
				// 	}

				// 	globalScoreValue.innerText = `${homeTeam} ${globalATScore} (${penaltiesScoreOne}) - (${penaltiesScoreTwo}) ${globalHTScore} ${awayTeam}`;
				// } else {
				// 	globalScoreValue.innerText = `${homeTeam} ${globalATScore} - ${globalHTScore} ${awayTeam}`;
				// }
				// }
				continueToPlayoffs.classList.remove('hide');
				simulateMatchdayBtn.classList.add('hide');
			}

			const fixtureRows = document.querySelectorAll('.fixtureRow');

			fixtureRows.forEach((row) => {
				row.addEventListener('click', () => {
					const currentRow = row;

					// Seleccionar el elemento que contiene los detalles adicionales (estadio, capacidad, goles)
					const detailsElement = currentRow.parentNode.querySelector('.details');

					// Verificar si el elemento de detalles existe
					if (detailsElement) {
						// Toggle la clase 'show' para expandir o contraer el elemento de detalles
						// detailsElement.classList.toggle('hide');
						detailsElement.classList.toggle('show');
						detailsElement.classList.toggle('hide');
					}
				});
			});

			const teamRows = document.querySelectorAll('.groupStageTable .stats');

			// Itera sobre cada fila y clasifica a los equipos
			let index = 0;
			teamRows.forEach((row) => {
				index++;
				const teamNameElement = row.querySelector('.GSTeamName');

				// Verifica que el elemento del nombre del equipo exista antes de acceder a textContent
				if (teamNameElement) {
					const teamName = teamNameElement.textContent.trim(); // Obtiene el nombre del equipo

					if (index <= 8) {
						// Los primeros 8 equipos van al array qualifiedToRO16
						qualifiedToRO16.push(teamName);
					} else if (index >= 8 && index < 25) {
						// Los equipos del 9 al 16 van al array nextGroup
						playOffs.push(teamName);
					}
				} else {
					index--;
				}
			});

			// e.preventDefault();
			// clickCount++;
			// let homeTeamsIndex = [];
			// for (let i = 0; i <= 143; i += 4) {
			// 	homeTeamsIndex.push(i);
			// }
			// homeTeamsIndex.push(143);
			// homeTeamsIndex = homeTeamsIndex.map((x) => x + clickCount - (1 % 6));
			// simulateMatchdayBtn.textContent = `Simulate Matchday ${clickCount + 1}`;
			// if (clickCount === 6) {
			// 	simulateMatchdayBtn.classList.add('hide');
			// 	continueToKOBtn.classList.remove('hide');
			// 	groupStageTables.forEach((table) => {
			// 		const [team1, team2] = [...table.querySelectorAll('.GSTeamName')].map(
			// 			(el) => el.textContent
			// 		);
			// 		qualifiedToRO16.push(team1, team2);
			// 	});
			// }
			// const teams = homeTeamsIndex.flatMap((index) => {
			// 	const match = GSTableMatches[index];
			// 	return [...match.querySelectorAll('.homeTeamName, .awayTeamName')].map((el) =>
			// 		el.textContent.trim()
			// 	);
			// });
			// const homeTeams = teams.filter((_, i) => i % 2 === 0);
			// const awayTeams = teams.filter((_, i) => i % 2 === 1);
			// const extendedHomeTeamsIndex = homeTeamsIndex.flatMap((index) => [index, index]);
			// for (let i = 0; i < homeTeams.length; i++) {
			// 	const homeTeam = homeTeams[i].trim();
			// 	const awayTeam = awayTeams[i].trim();
			// 	const homeTeamInfo = allTeams.find((team) => team.Team === homeTeam);
			// 	const awayTeamInfo = allTeams.find((team) => team.Team === awayTeam);
			// 	console.log(homeTeam);
			// 	console.log(awayTeam);
			// 	const homeTeamRating = homeTeamInfo.TeamRating;
			// 	const awayTeamRating = awayTeamInfo.TeamRating;
			// 	if (homeTeamRating > awayTeamRating) {
			// 		var homeTeamWinChance = (55 + (homeTeamRating - awayTeamRating)) / 100;
			// 		var awayTeamWinChance = (45 - (homeTeamRating - awayTeamRating)) / 100;
			// 		ratingDifference = homeTeamRating - awayTeamRating;
			// 	} else {
			// 		var homeTeamWinChance = (55 - (awayTeamRating - homeTeamRating)) / 100;
			// 		var awayTeamWinChance = (45 + (awayTeamRating - homeTeamRating)) / 100;
			// 		ratingDifference = awayTeamRating - homeTeamRating;
			// 	}
			// 	homeTeamWinChance = homeTeamWinChance;
			// 	awayTeamWinChance = awayTeamWinChance;
			// 	let result = determineResult(homeTeamWinChance, ratingDifference);
			// 	// console.log(result)
			// 	let nGoals = generateNumbersGoals(result);
			// 	let gDifference = generateGoalDifference(ratingDifference, nGoals);
			// 	let homeTeamGoals = 0;
			// 	let awayTeamGoals = 0;
			// 	let homeTeamRow = searchTeam(homeTeam);
			// 	let awayTeamRow = searchTeam(awayTeam);
			// 	if (result === 'Home Team') {
			// 		homeTeamGoals = 0;
			// 		awayTeamGoals = 0 - gDifference;
			// 		for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
			// 			awayTeamGoals++;
			// 			homeTeamGoals++;
			// 		}
			// 		updateScores(homeTeamRow, '#gamesWon', 1);
			// 		updateScores(awayTeamRow, '#gamesLost', 1);
			// 		updateScores(homeTeamRow, '#goalDifference', gDifference);
			// 		updateScores(awayTeamRow, '#goalDifference', -gDifference);
			// 		updateScores(homeTeamRow, '#totalPts', 3);
			// 	} else if (result === 'Away Team') {
			// 		homeTeamGoals = 0 - gDifference;
			// 		awayTeamGoals = 0;
			// 		for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
			// 			awayTeamGoals++;
			// 			homeTeamGoals++;
			// 		}
			// 		updateScores(awayTeamRow, '#gamesWon', 1);
			// 		updateScores(homeTeamRow, '#gamesLost', 1);
			// 		updateScores(awayTeamRow, '#goalDifference', gDifference);
			// 		updateScores(homeTeamRow, '#goalDifference', -gDifference);
			// 		updateScores(awayTeamRow, '#totalPts', 3);
			// 	} else {
			// 		homeTeamGoals = nGoals / 2;
			// 		awayTeamGoals = nGoals / 2;
			// 		updateScores(homeTeamRow, '#gamesDrawn', 1);
			// 		updateScores(awayTeamRow, '#gamesDrawn', 1);
			// 		updateScores(homeTeamRow, '#goalDifference', gDifference);
			// 		updateScores(awayTeamRow, '#goalDifference', gDifference);
			// 		updateScores(homeTeamRow, '#totalPts', 1);
			// 		updateScores(awayTeamRow, '#totalPts', 1);
			// 	}
			// 	let detailsElement = document.createElement('div');
			// 	detailsElement.classList.add('details');
			// 	const stadiumName = homeTeamInfo.Stadium[0].Name;
			// 	const attendancePercentage = homeTeamInfo.Stadium[0].FilledPercentageGS;
			// 	const capacity = homeTeamInfo.Stadium[0].Capacity;
			// 	const attendance =
			// 		Math.round((attendancePercentage * capacity) / 100) +
			// 		Math.floor(Math.random() * 1000) +
			// 		1;
			// 	let homeTeamScores = GSTableMatches[extendedHomeTeamsIndex[i]].querySelectorAll(
			// 		'.homeTeamScore:not(.done)'
			// 	);
			// 	let awayTeamScores = GSTableMatches[extendedHomeTeamsIndex[i]].querySelectorAll(
			// 		'.awayTeamScore:not(.done)'
			// 	);
			// 	homeTeamScores[0].innerText = homeTeamGoals;
			// 	awayTeamScores[0].innerText = awayTeamGoals;
			// 	homeTeamScores[0].classList.add('done');
			// 	awayTeamScores[0].classList.add('done');
			// 	detailsElement.innerHTML = `<p class="stadium">${stadiumName}</p>
			//                 <p class="attendance">${attendance}</p>`;
			// 	let homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
			// 	let awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
			// 	if (homeTeamGoals !== 0) {
			// 		while (!homeTeamGoal.goalMinutes || !homeTeamGoal.goalScorers) {
			// 			homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
			// 		}
			// 		let homeTeamGoalScorers = homeTeamGoal.goalScorers;
			// 		let homeTeamGoalMinutes = sortObj(homeTeamGoal.goalMinutes);
			// 		for (let i = 0; i < homeTeamGoalScorers.length; i++) {
			// 			let goalScorer =
			// 				homeTeamGoalScorers[i].player.LastName !== ''
			// 					? homeTeamGoalScorers[i].player.LastName
			// 					: homeTeamGoalScorers[i].player.FirstName;
			// 			let goalMinute = homeTeamGoalMinutes[i];
			// 			let html = `<p class="home"><span class="goalMinute">${goalMinute}' </span>  ${goalScorer}`;
			// 			if (homeTeamGoalScorers[i].isPenalty) {
			// 				html += ' (p)';
			// 			}
			// 			html += '</p>';
			// 			detailsElement.innerHTML += html;
			// 		}
			// 	}
			// 	if (awayTeamGoals !== 0) {
			// 		while (!awayTeamGoal.goalMinutes) {
			// 			awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
			// 		}
			// 		let awayTeamGoalScorers = awayTeamGoal.goalScorers;
			// 		let awayTeamGoalMinutes = sortObj(awayTeamGoal.goalMinutes);
			// 		for (let i = 0; i < awayTeamGoalScorers.length; i++) {
			// 			let goalScorer =
			// 				awayTeamGoalScorers[i].player.LastName !== ''
			// 					? awayTeamGoalScorers[i].player.LastName
			// 					: awayTeamGoalScorers[i].player.FirstName;
			// 			let goalMinute = awayTeamGoalMinutes[i];
			// 			let html = `<p class="away"><span class="goalMinute">${goalMinute}'  </span> ${goalScorer}`;
			// 			if (awayTeamGoalScorers[i].isPenalty) {
			// 				html += ' (p)';
			// 			}
			// 			html += '</p>';
			// 			detailsElement.innerHTML += html;
			// 		}
			// 	}
			// 	updateScores(homeTeamRow, '#matchesPlayed', 1);
			// 	updateScores(awayTeamRow, '#matchesPlayed', 1);
			// 	let currentRow =
			// 		GSTableMatches[extendedHomeTeamsIndex[i]].querySelectorAll(
			// 			'.fixtureRow:not(.done)'
			// 		)[0];
			// 	const detailsElementDiv = currentRow.parentNode.querySelector('.details');
			// 	if (!detailsElementDiv) {
			// 		currentRow.parentNode.insertBefore(detailsElement, currentRow.nextSibling);
			// 	}
			// 	detailsElement.classList.toggle('hide');
			// 	currentRow.classList.add('done');
			// 	sortTable(leagueTable);
			// }
			// updateGoalScorers(topScorersList);
		});

		continueToPlayoffs.addEventListener('click', (e) => {
			e.preventDefault();
			click_view.classList.add('hide');
			function shuffleArray(array) {
				return array.sort(() => 0.5 - Math.random());
			}

			// Función para llenar las tablas con los equipos
			function fillPlayoffTables() {
				// Barajar los equipos
				const shuffledTeams = shuffleArray([...playOffs]);

				const tables = document.querySelectorAll('#playOffsMatchesTable');

				tables.forEach((table, index) => {
					const fixtureRows = table.querySelectorAll('.fixtureRow');

					// Obtener dos equipos aleatorios por cada tabla
					const team1 = shuffledTeams[index * 2];
					const team2 = shuffledTeams[index * 2 + 1];

					// Primera fila: team1 como local y team2 como visitante
					const homeTeamName1 = fixtureRows[0].querySelector('.homeTeamName');
					const awayTeamName1 = fixtureRows[0].querySelector('.awayTeamName');
					const homeTeamLogo1 = fixtureRows[0].querySelector('.homeTeamLogo img');
					const awayTeamLogo1 = fixtureRows[0].querySelector('.awayTeamLogo img');

					homeTeamName1.textContent = team1;
					awayTeamName1.textContent = team2;
					homeTeamLogo1.src = `images/${team1.replace(/\s/g, '')}.png`; // Suponiendo que el nombre del archivo de la imagen coincide con el nombre del equipo
					awayTeamLogo1.src = `images/${team2.replace(/\s/g, '')}.png`;

					// Segunda fila: team2 como local y team1 como visitante
					const homeTeamName2 = fixtureRows[1].querySelector('.homeTeamName');
					const awayTeamName2 = fixtureRows[1].querySelector('.awayTeamName');
					const homeTeamLogo2 = fixtureRows[1].querySelector('.homeTeamLogo img');
					const awayTeamLogo2 = fixtureRows[1].querySelector('.awayTeamLogo img');

					homeTeamName2.textContent = team2;
					awayTeamName2.textContent = team1;
					homeTeamLogo2.src = `images/${team2.replace(/\s/g, '')}.png`;
					awayTeamLogo2.src = `images/${team1.replace(/\s/g, '')}.png`;
				});
			}
			fillPlayoffTables();
			leagueTable.classList.add('hide');
			playOffsMatches.classList.remove('hide');
			tabsContainer.classList.add('hide');
			simulatePlayoffsBtn.classList.remove('hide');
			continueToPlayoffs.classList.add('hide');
		});

		simulatePlayoffsBtn.addEventListener('click', async (e) => {
			e.preventDefault();

			const fixtureIdx = [144, 145, 146, 147, 148, 149, 150, 151];

			clickCount++;

			// const homeTeams = [];
			// const awayTeams = [];
			// const extractTeams = (table) => {
			// 	const rows = table.querySelectorAll('tbody.groupMatches tr');
			// 	rows.forEach((row) => {
			// 		const homeTeam = row.querySelector('.homeTeam .homeTeamName');
			// 		const awayTeam = row.querySelector('.awayTeam .awayTeamName');
			// 		if (homeTeam && awayTeam) {
			// 			homeTeams.push(homeTeam.textContent.trim());
			// 			awayTeams.push(awayTeam.textContent.trim());
			// 		}
			// 	});
			// };

			// uniqueFixtureIdx.forEach(
			// 	(index) => GSTableMatches[index] && extractTeams(GSTableMatches[index])
			// );

			const homeTeams = fixtureIdx.map(
				(index) => GSTableMatches[index].querySelectorAll('.homeTeamName')[1].textContent
			);
			const awayTeams = fixtureIdx.map(
				(index) => GSTableMatches[index].querySelectorAll('.awayTeamName')[1].textContent
			);

			let homeTeamWinChance;
			let awayTeamWinChance;
			let ratingDifference;

			for (let i = 0; i < homeTeams.length; i++) {
				let winMethod;
				const homeTeam = homeTeams[i];
				const awayTeam = awayTeams[i];

				const homeTeamInfo = allTeams.find((team) => team.Team === homeTeam);
				const awayTeamInfo = allTeams.find((team) => team.Team === awayTeam);
				const homeTeamRating = homeTeamInfo.TeamRating;
				const awayTeamRating = awayTeamInfo.TeamRating;
				if (homeTeamRating > awayTeamRating) {
					homeTeamWinChance = (50 + (homeTeamRating - awayTeamRating)) / 100;
					awayTeamWinChance = (50 - (homeTeamRating - awayTeamRating)) / 100;
					ratingDifference = homeTeamRating - awayTeamRating;
				} else {
					homeTeamWinChance = (50 - (awayTeamRating - homeTeamRating)) / 100;
					awayTeamWinChance = (50 + (awayTeamRating - homeTeamRating)) / 100;
					ratingDifference = awayTeamRating - homeTeamRating;
				}

				homeTeamWinChance = homeTeamWinChance;
				awayTeamWinChance = awayTeamWinChance;

				let result = determineResult(homeTeamWinChance, ratingDifference);
				// console.log(result)
				let nGoals = generateNumbersGoals(result);
				let gDifference = generateGoalDifference(ratingDifference, nGoals);

				let homeTeamGoals = 0;
				let awayTeamGoals = 0;
				let homeTeamRow = searchTeam(homeTeam);
				let awayTeamRow = searchTeam(awayTeam);

				if (result === 'Home Team') {
					homeTeamGoals = 0;
					awayTeamGoals = 0 - gDifference;
					for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
						awayTeamGoals++;
						homeTeamGoals++;
					}
				} else if (result === 'Away Team') {
					homeTeamGoals = 0 - gDifference;
					awayTeamGoals = 0;
					for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
						awayTeamGoals++;
						homeTeamGoals++;
					}
				} else {
					homeTeamGoals = nGoals / 2;
					awayTeamGoals = nGoals / 2;
				}

				firstLegHTScore =
					parseInt(
						GSTableMatches[fixtureIdx[i]].querySelector('.homeTeamScore').innerText
					) || 0;

				let globalHTScore = firstLegHTScore + awayTeamGoals;

				let firstLegATScore = parseInt(
					GSTableMatches[fixtureIdx[i]].querySelector('.awayTeamScore').innerText
				);
				let globalATScore = firstLegATScore + homeTeamGoals;

				let secondLegHTGoals = 0;
				let secondLegATGoals = 0;
				let penaltiesResult;
				if (globalHTScore === globalATScore) {
					const ET = extraTime(homeTeamGoals, awayTeamGoals);
					result = ET.winner;
					winMethod = ET.winMethod;

					if (winMethod === 'Penalties') {
						penaltiesResult = penalties();
					} else {
						nGoals = generateRandomNumber(1, 2);
						gDifference = nGoals;

						if (result === 'Home Team') {
							secondLegHTGoals += nGoals;
						} else {
							secondLegATGoals += nGoals;
						}
						globalHTScore += secondLegHTGoals;
						globalATScore += secondLegATGoals;
					}
				}

				let detailsElement = document.createElement('div');

				detailsElement.classList.add('details');

				const stadiumName = homeTeamInfo.Stadium[0].Name;
				const attendancePercentage = homeTeamInfo.Stadium[0].FilledPercentageGS;
				const capacity = homeTeamInfo.Stadium[0].Capacity;
				const attendance =
					Math.round((attendancePercentage * capacity) / 100) +
					Math.floor(Math.random() * 1000) +
					1;

				let homeTeamScores = GSTableMatches[fixtureIdx[i]].querySelectorAll(
					'.homeTeamScore:not(.done)'
				);
				let awayTeamScores = GSTableMatches[fixtureIdx[i]].querySelectorAll(
					'.awayTeamScore:not(.done)'
				);
				homeTeamScores[0].innerText = homeTeamGoals + secondLegHTGoals;
				awayTeamScores[0].innerText = awayTeamGoals + secondLegATGoals;
				homeTeamScores[0].classList.add('done');
				awayTeamScores[0].classList.add('done');
				detailsElement.innerHTML = `<p class="stadium">${stadiumName}</p>
                                    <p class="attendance">${attendance}</p>`;

				let homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
				let awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);

				if (clickCount === 3) {
					console.log(homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, winMethod);
					console.log(
						firstLegHTScore,
						awayTeamGoals,
						firstLegATScore,
						homeTeamGoals,
						globalHTScore,
						globalATScore
					);
				}

				if (winMethod === 'Extra Time') {
					if (result === 'Home Team') {
						let ETGoalScorers = determineGoalScorers(homeTeamInfo, nGoals, (ET = true));
						while (!ETGoalScorers.goalMinutes) {
							ETGoalScorers = determineGoalScorers(homeTeamInfo, nGoals, (ET = true));
						}
						while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
							homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
						}
						homeTeamGoal = sumObjects(ETGoalScorers, homeTeamGoal);
					} else {
						let ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, (ET = true));
						while (!ETGoalScorers.goalMinutes) {
							ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, (ET = true));
						}
						while (awayTeamGoal && !awayTeamGoal.goalMinutes) {
							awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
						}
						awayTeamGoal = sumObjects(ETGoalScorers, awayTeamGoal);
					}
				}

				if (homeTeamGoals !== 0) {
					while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
						homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
					}
					let homeTeamGoalScorers = homeTeamGoal.goalScorers;
					let homeTeamGoalMinutes = sortObj(homeTeamGoal.goalMinutes);

					for (let i = 0; i < homeTeamGoalScorers.length; i++) {
						let goalScorer =
							homeTeamGoalScorers[i].player.LastName !== ''
								? homeTeamGoalScorers[i].player.LastName
								: homeTeamGoalScorers[i].player.FirstName;
						let goalMinute = homeTeamGoalMinutes[i];
						let html = `<p class="home"><span class="goalMinute">${goalMinute}' </span>  ${goalScorer}`;
						if (homeTeamGoalScorers[i].isPenalty) {
							html += ' (p)';
						}
						html += '</p>';
						detailsElement.innerHTML += html;
					}
				}
				if (awayTeamGoals !== 0) {
					while (awayTeamGoal && !awayTeamGoal.goalMinutes) {
						awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
					}
					let awayTeamGoalScorers = awayTeamGoal.goalScorers;
					let awayTeamGoalMinutes = sortObj(awayTeamGoal.goalMinutes);

					for (let i = 0; i < awayTeamGoalScorers.length; i++) {
						let goalScorer;
						try {
							goalScorer =
								awayTeamGoalScorers[i].player.LastName !== ''
									? awayTeamGoalScorers[i].player.LastName
									: awayTeamGoalScorers[i].player.FirstName;
						} catch {}
						let goalMinute = awayTeamGoalMinutes[i];
						let html = `<p class="away"><span class="goalMinute">${goalMinute}'  </span> ${goalScorer}`;
						if (awayTeamGoalScorers[i].isPenalty) {
							html += ' (p)';
						}
						html += '</p>';
						detailsElement.innerHTML += html;
					}
				}

				// console.log(homeTeamGoalScorers)
				// console.log(awayTeamGoalScorers)
				// console.log(`Result: ${result}, Number of Goals: ${nGoals}, Goal Difference: ${gDifference}, ${homeTeam}: ${homeTeamGoals}, ${awayTeam}: ${awayTeamGoals}`)

				let currentRow =
					GSTableMatches[fixtureIdx[i]].querySelectorAll('.fixtureRow:not(.done)')[0];
				const detailsElementDiv = currentRow.parentNode.querySelector('.details');
				if (!detailsElementDiv) {
					currentRow.parentNode.insertBefore(detailsElement, currentRow.nextSibling);
				}

				detailsElement.classList.toggle('hide');
				currentRow.classList.add('done');

				updateGoalScorers(topScorersList);

				if (clickCount === 3) {
					simulatePlayoffsBtn.classList.add('hide');
					continueToKOBtn.classList.remove('hide');
					GSTableMatches[fixtureIdx[i]]
						.querySelector('.globalScore')
						.classList.remove('hide');
					globalScoreValue =
						GSTableMatches[fixtureIdx[i]].querySelector('.globalScoreValue');

					if (globalHTScore > globalATScore) {
						qualifiedToRO16.push(awayTeam);
					} else if (globalATScore > globalHTScore) {
						qualifiedToRO16.push(homeTeam);
					} else {
						if (result === 'Home Team') {
							qualifiedToRO16.push(homeTeam);
						} else {
							qualifiedToRO16.push(awayTeam);
						}
					}

					if (winMethod === 'Penalties') {
						penaltiesResults = penaltiesResult.split('-');

						if (result === 'Home Team') {
							penaltiesScoreOne = parseInt(penaltiesResults[0]);
							penaltiesScoreTwo = parseInt(penaltiesResults[1]);
						} else {
							penaltiesScoreOne = parseInt(penaltiesResults[1]);
							penaltiesScoreTwo = parseInt(penaltiesResults[0]);
						}

						globalScoreValue.innerText = `${homeTeam} ${globalATScore} (${penaltiesScoreOne}) - (${penaltiesScoreTwo}) ${globalHTScore} ${awayTeam}`;
					} else {
						globalScoreValue.innerText = `${homeTeam} ${globalATScore} - ${globalHTScore} ${awayTeam}`;
					}
				}

				// let currentRows = searchFixture(homeTeam, awayTeam);

				// for (let currentRow of currentRows) {
				// 	// Crea un nuevo elemento detailsElement para cada iteración
				// 	const newDetailsElement = detailsElement.cloneNode(true);

				// 	currentRow.parentNode.insertBefore(newDetailsElement, currentRow.nextSibling);

				// 	newDetailsElement.classList.toggle('hide');
				// 	currentRow.classList.add('done');
				// }

				homeTeamScores[0].classList.add('done');
				awayTeamScores[0].classList.add('done');
			}
		});
		continueToKOBtn.addEventListener('click', (e) => {
			e.preventDefault();

			if (KORound === 0) {
				KORound++;

				let potsATable = potsTables[0];
				let potsBTable = potsTables[1];

				startDrawBtn.classList.remove('hide');
				fastDrawBtn.classList.remove('hide');
				topScorers.classList.add('hide');

				potsTeamNamesA = potsRO16A.querySelectorAll('.potsTeamName');
				potsTeamNamesB = potsRO16B.querySelectorAll('.potsTeamName');
				const potsTeamImgsA = potsRO16A.querySelectorAll('.teamsImgs');
				const potsTeamImgsB = potsRO16B.querySelectorAll('.teamsImgs');
				potsRO16A.classList.remove('hide');
				potsRO16B.classList.remove('hide');
				let qRO16 = 0;
				for (let i = 0; i < potsTeamNamesA.length; i++) {
					if (qRO16 === 1) {
						qRO16++;
					}

					const potsTeamNameA = potsTeamNamesA[i];
					const potsTeamNameB = potsTeamNamesB[i];

					const potsTeamImgA = potsTeamImgsA[i];
					const potsTeamImgB = potsTeamImgsB[i];

					const normalizedTeamA = normalizeTeamName(qualifiedToRO16[qRO16]);
					const normalizedTeamB = normalizeTeamName(qualifiedToRO16[qRO16 + 1]);

					potsTeamNameA.textContent = qualifiedToRO16[qRO16];
					potsTeamNameB.textContent = qualifiedToRO16[qRO16 + 1];
					potsTeamImgA.src = `images/${normalizedTeamA.replace(/\s+/g, '')}.png`;
					potsTeamImgB.src = `images/${normalizedTeamB.replace(/\s+/g, '')}.png`;
					qRO16 += 2;
				}

				tabsContainer.classList.add('hide');
				continueToKOBtn.classList.add('hide');
				hideTablesExcept(false, GSTableMatches);
				groupSpacing.classList.add('hide');
				potsRO16A.classList.remove('hide');
				potsRO16B.classList.remove('hide');

				for (let el of tabLinksRO16) {
					RO16Matches.classList.remove('hide');
					showTables(RO16MatchesTableA);
					el.addEventListener('click', (e) => {
						e.preventDefault();
						let active = document.querySelector('#tabsRO16 li.active');
						if (active) {
							active.classList.remove('active');
						}

						hideTablesExcept(false, RO16MatchesTableA);
						hideTablesExcept(false, RO16MatchesTableB);
						topScorers.classList.add('hide');
						const parentListItem = el.parentElement;
						parentListItem.classList.add('active');
						const dataIndex = parentListItem.getAttribute('data-index');
						RO16Matches.classList.remove('hide');
						if (dataIndex === '0') {
							showTables(RO16MatchesTableA);
						} else if (dataIndex === '1') {
							showTables(RO16MatchesTableB);
						} else if (dataIndex === '2') {
							topScorers.classList.remove('hide');
						}
					});
				}

				let clickCount = 0;
				let fixtureIdx = [];
				simulateKOBtn.addEventListener('click', async (e) => {
					e.preventDefault();

					if (KORound !== 1 && clickCount === 2) {
						clickCount = 0;
					}
					const fixtureIdx =
						KORound === 1
							? [152, 153, 154, 155, 156, 157, 158, 159]
							: KORound === 2
							? [160, 161, 162, 163]
							: KORound === 3
							? [164, 165]
							: [166];

					clickCount++;

					// if (KORound === 4) {
					//     simulateKOBtn.innerText = 'Simulate 2nd Leg';
					// } else {
					//     simulateKOBtn.innerText = 'Simulate 2nd Leg';
					// }

					simulateKOBtn.innerText = 'Simulate 2nd Leg';

					const homeTeams = fixtureIdx.map(
						(index) =>
							GSTableMatches[index].querySelectorAll('.homeTeamName')[clickCount - 1]
								.textContent
					);
					const awayTeams = fixtureIdx.map(
						(index) =>
							GSTableMatches[index].querySelectorAll('.awayTeamName')[clickCount - 1]
								.textContent
					);

					for (let i = 0; i < homeTeams.length; i++) {
						let winMethod;
						const homeTeam = homeTeams[i];
						const awayTeam = awayTeams[i];

						const homeTeamInfo = allTeams.find((team) => team.Team === homeTeam);
						const awayTeamInfo = allTeams.find((team) => team.Team === awayTeam);
						const homeTeamRating = homeTeamInfo.TeamRating;
						const awayTeamRating = awayTeamInfo.TeamRating;
						if (homeTeamRating > awayTeamRating) {
							var homeTeamWinChance = (55 + (homeTeamRating - awayTeamRating)) / 100;
							var awayTeamWinChance = (45 - (homeTeamRating - awayTeamRating)) / 100;
							ratingDifference = homeTeamRating - awayTeamRating;
						} else {
							var homeTeamWinChance = (55 - (awayTeamRating - homeTeamRating)) / 100;
							var awayTeamWinChance = (45 + (awayTeamRating - homeTeamRating)) / 100;
							ratingDifference = awayTeamRating - homeTeamRating;
						}

						homeTeamWinChance = homeTeamWinChance;
						awayTeamWinChance = awayTeamWinChance;

						let result = determineResult(homeTeamWinChance, ratingDifference);
						// console.log(result)
						let nGoals = generateNumbersGoals(result);
						let gDifference = generateGoalDifference(ratingDifference, nGoals);

						let homeTeamGoals = 0;
						let awayTeamGoals = 0;
						let homeTeamRow = searchTeam(homeTeam);
						let awayTeamRow = searchTeam(awayTeam);

						if (result === 'Home Team') {
							homeTeamGoals = 0;
							awayTeamGoals = 0 - gDifference;
							for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
								awayTeamGoals++;
								homeTeamGoals++;
							}
						} else if (result === 'Away Team') {
							homeTeamGoals = 0 - gDifference;
							awayTeamGoals = 0;
							for (let n = 0; homeTeamGoals + awayTeamGoals < nGoals; n++) {
								awayTeamGoals++;
								homeTeamGoals++;
							}
						} else {
							homeTeamGoals = nGoals / 2;
							awayTeamGoals = nGoals / 2;
						}

						firstLegHTScore =
							parseInt(
								GSTableMatches[fixtureIdx[i]].querySelector('.homeTeamScore')
									.innerText
							) || 0;

						let globalHTScore = firstLegHTScore + awayTeamGoals;

						let firstLegATScore = parseInt(
							GSTableMatches[fixtureIdx[i]].querySelector('.awayTeamScore').innerText
						);
						let globalATScore = firstLegATScore + homeTeamGoals;

						if (qualifiedToF.length > 1) {
							globalHTScore = awayTeamGoals;
							globalATScore = homeTeamGoals;
							clickCount = 2;
						}

						let secondLegHTGoals = 0;
						let secondLegATGoals = 0;
						let penaltiesResult;
						if (globalHTScore === globalATScore) {
							const ET = extraTime(homeTeamGoals, awayTeamGoals);
							result = ET.winner;
							winMethod = ET.winMethod;

							if (winMethod === 'Penalties') {
								penaltiesResult = penalties();
							} else {
								nGoals = generateRandomNumber(1, 2);
								gDifference = nGoals;

								if (result === 'Home Team') {
									secondLegHTGoals += nGoals;
								} else {
									secondLegATGoals += nGoals;
								}
								globalHTScore += secondLegHTGoals;
								globalATScore += secondLegATGoals;
							}
						}

						let detailsElement = document.createElement('div');

						detailsElement.classList.add('details');

						const stadiumName = homeTeamInfo.Stadium[0].Name;
						const attendancePercentage = homeTeamInfo.Stadium[0].FilledPercentageGS;
						const capacity = homeTeamInfo.Stadium[0].Capacity;
						const attendance =
							Math.round((attendancePercentage * capacity) / 100) +
							Math.floor(Math.random() * 1000) +
							1;

						let homeTeamScores = GSTableMatches[fixtureIdx[i]].querySelectorAll(
							'.homeTeamScore:not(.done)'
						);
						let awayTeamScores = GSTableMatches[fixtureIdx[i]].querySelectorAll(
							'.awayTeamScore:not(.done)'
						);
						homeTeamScores[0].innerText = homeTeamGoals + secondLegHTGoals;
						awayTeamScores[0].innerText = awayTeamGoals + secondLegATGoals;
						homeTeamScores[0].classList.add('done');
						awayTeamScores[0].classList.add('done');
						detailsElement.innerHTML = `<p class="stadium">${stadiumName}</p>
										<p class="attendance">${attendance}</p>`;

						let homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
						let awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);

						if (clickCount === 2) {
							console.log(
								homeTeam,
								homeTeamGoals,
								awayTeam,
								awayTeamGoals,
								winMethod
							);
							console.log(
								firstLegHTScore,
								awayTeamGoals,
								firstLegATScore,
								homeTeamGoals,
								globalHTScore,
								globalATScore
							);
						}

						if (winMethod === 'Extra Time') {
							if (result === 'Home Team') {
								let ETGoalScorers = determineGoalScorers(
									homeTeamInfo,
									nGoals,
									(ET = true)
								);
								while (!ETGoalScorers.goalMinutes) {
									ETGoalScorers = determineGoalScorers(
										homeTeamInfo,
										nGoals,
										(ET = true)
									);
								}
								while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
									homeTeamGoal = determineGoalScorers(
										homeTeamInfo,
										homeTeamGoals
									);
								}
								homeTeamGoal = sumObjects(ETGoalScorers, homeTeamGoal);
							} else {
								let ETGoalScorers = determineGoalScorers(
									awayTeamInfo,
									nGoals,
									(ET = true)
								);
								while (!ETGoalScorers.goalMinutes) {
									ETGoalScorers = determineGoalScorers(
										awayTeamInfo,
										nGoals,
										(ET = true)
									);
								}
								while (awayTeamGoal && !awayTeamGoal.goalMinutes) {
									awayTeamGoal = determineGoalScorers(
										awayTeamInfo,
										awayTeamGoals
									);
								}
								awayTeamGoal = sumObjects(ETGoalScorers, awayTeamGoal);
							}
						}

						if (homeTeamGoals !== 0) {
							while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
								homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
							}
							let homeTeamGoalScorers = homeTeamGoal.goalScorers;
							let homeTeamGoalMinutes = sortObj(homeTeamGoal.goalMinutes);

							for (let i = 0; i < homeTeamGoalScorers.length; i++) {
								let goalScorer =
									homeTeamGoalScorers[i].player.LastName !== ''
										? homeTeamGoalScorers[i].player.LastName
										: homeTeamGoalScorers[i].player.FirstName;
								let goalMinute = homeTeamGoalMinutes[i];
								let html = `<p class="home"><span class="goalMinute">${goalMinute}' </span>  ${goalScorer}`;
								if (homeTeamGoalScorers[i].isPenalty) {
									html += ' (p)';
								}
								html += '</p>';
								detailsElement.innerHTML += html;
							}
						}
						if (awayTeamGoals !== 0) {
							while (awayTeamGoal && !awayTeamGoal.goalMinutes) {
								awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
							}
							let awayTeamGoalScorers = awayTeamGoal.goalScorers;
							let awayTeamGoalMinutes = sortObj(awayTeamGoal.goalMinutes);

							for (let i = 0; i < awayTeamGoalScorers.length; i++) {
								let goalScorer =
									awayTeamGoalScorers[i].player.LastName !== ''
										? awayTeamGoalScorers[i].player.LastName
										: awayTeamGoalScorers[i].player.FirstName;
								let goalMinute = awayTeamGoalMinutes[i];
								let html = `<p class="away"><span class="goalMinute">${goalMinute}'  </span> ${goalScorer}`;
								if (awayTeamGoalScorers[i].isPenalty) {
									html += ' (p)';
								}
								html += '</p>';
								detailsElement.innerHTML += html;
							}
						}

						// console.log(homeTeamGoalScorers)
						// console.log(awayTeamGoalScorers)
						// console.log(`Result: ${result}, Number of Goals: ${nGoals}, Goal Difference: ${gDifference}, ${homeTeam}: ${homeTeamGoals}, ${awayTeam}: ${awayTeamGoals}`)

						let currentRow =
							GSTableMatches[fixtureIdx[i]].querySelectorAll(
								'.fixtureRow:not(.done)'
							)[0];
						const detailsElementDiv = currentRow.parentNode.querySelector('.details');
						if (!detailsElementDiv) {
							currentRow.parentNode.insertBefore(
								detailsElement,
								currentRow.nextSibling
							);
						}

						detailsElement.classList.toggle('hide');
						currentRow.classList.add('done');

						updateGoalScorers(topScorersList);

						if (clickCount === 2) {
							simulateKOBtn.classList.add('hide');
							continueToKOBtn.classList.remove('hide');
							if (KORound === 1) {
								continueToKOBtn.innerText = 'Continue to Quarter Finals';
							} else if (KORound === 2) {
								continueToKOBtn.innerText = 'Continue to Semi Finals';
							} else {
								continueToKOBtn.innerText = 'Continue to Final';
							}

							simulateKOBtn.innerText = 'Simulate 1st Leg';

							if (qualifiedToF.length > 0) {
								simulateKOBtn.innerText = 'Simulate Final';
							}
							GSTableMatches[fixtureIdx[i]]
								.querySelector('.globalScore')
								.classList.remove('hide');
							globalScoreValue =
								GSTableMatches[fixtureIdx[i]].querySelector('.globalScoreValue');

							if (globalHTScore > globalATScore) {
								qualifyTeam(awayTeam);
							} else if (globalATScore > globalHTScore) {
								qualifyTeam(homeTeam);
							} else {
								if (result === 'Home Team') {
									qualifyTeam(homeTeam);
								} else {
									qualifyTeam(awayTeam);
								}
							}

							if (winMethod === 'Penalties') {
								penaltiesResults = penaltiesResult.split('-');

								if (result === 'Home Team') {
									penaltiesScoreOne = parseInt(penaltiesResults[0]);
									penaltiesScoreTwo = parseInt(penaltiesResults[1]);
								} else {
									penaltiesScoreOne = parseInt(penaltiesResults[1]);
									penaltiesScoreTwo = parseInt(penaltiesResults[0]);
								}

								globalScoreValue.innerText = `${homeTeam} ${globalATScore} (${penaltiesScoreOne}) - (${penaltiesScoreTwo}) ${globalHTScore} ${awayTeam}`;
							} else {
								globalScoreValue.innerText = `${homeTeam} ${globalATScore} - ${globalHTScore} ${awayTeam}`;
							}
						}
					}
				});
			} else if (KORound > 0) {
				tabLinksKO.forEach((el) => {
					el.addEventListener('click', (e) => {
						e.preventDefault();

						document.querySelector('#tabsKO li.active')?.classList.remove('active');
						el.parentElement.classList.add('active');

						const dataIndex = el.parentElement.getAttribute('data-index');
						const matchesTable = document.querySelector('.activeTable');
						matchesTable.classList.toggle('hide', dataIndex !== '0');
						topScorers.classList.toggle('hide', dataIndex !== '1');
					});
				});

				continueToKOBtn.classList.add('hide');
				hideTablesExcept(false, GSTableMatches);
				groupSpacing.classList.add('hide');
				tabsContainerRO16.classList.add('hide');

				GSTableMatches.forEach((match, index) => {
					if (index >= 56 && index <= 59) {
						match.classList.remove('hide');
					}
				});

				potIndex = 0;

				if (KORound === 1) {
					const QFTeamNames = document.querySelectorAll('#QFTeamName');
					const QFTeamImgs = document.querySelectorAll('#QFTeamsImgs');
					QFMatchesTable.querySelectorAll('.GSTableMatches')[0].classList.remove('hide');
					QFMatchesTable.querySelectorAll('.GSTableMatches')[1].classList.remove('hide');
					QFMatchesTable.querySelectorAll('.GSTableMatches')[2].classList.remove('hide');
					QFMatchesTable.querySelectorAll('.GSTableMatches')[3].classList.remove('hide');

					populateKnockoutStage(QFTeamNames, QFTeamImgs, qualifiedToQF, 2);
				} else if (KORound === 2) {
					QFMatchesTable.classList.remove('activeTable');
					SFMatchesTable.classList.add('activeTable');

					continueToKOBtn.classList.add('hide');
					hideTablesExcept(false, GSTableMatches);
					groupSpacing.classList.add('hide');

					GSTableMatches[60].classList.remove('hide');
					GSTableMatches[61].classList.remove('hide');

					const SFTeamNames = document.querySelectorAll('#SFTeamName');
					const SFTeamImgs = document.querySelectorAll('#SFTeamsImgs');

					populateKnockoutStage(SFTeamNames, SFTeamImgs, qualifiedToSF, 2);

					SFMatchesTable.querySelectorAll('.GSTableMatches')[0].classList.remove('hide');
					SFMatchesTable.querySelectorAll('.GSTableMatches')[1].classList.remove('hide');
				} else if (KORound === 3) {
					SFMatchesTable.classList.remove('activeTable');
					finalMatchesTable.classList.add('activeTable');

					continueToKOBtn.classList.add('hide');
					simulateKOBtn.classList.remove('hide');

					hideTablesExcept(false, GSTableMatches);
					groupSpacing.classList.add('hide');

					GSTableMatches[62].classList.remove('hide');

					const finalTeamNames = document.querySelectorAll('#finalTeamName');
					const finalTeamImgs = document.querySelectorAll('#finalTeamsImgs');

					const homeTeamName = qualifiedToF[0];
					const awayTeamName = qualifiedToF[1];

					const normalizedHomeTeam = normalizeTeamName(homeTeamName);
					const normalizedAwayTeam = normalizeTeamName(awayTeamName);

					finalTeamNames[0].innerText = homeTeamName;
					finalTeamNames[1].innerText = awayTeamName;

					finalTeamImgs[0].src = `images/${normalizedHomeTeam.replace(/\s+/g, '')}.png`;
					finalTeamImgs[1].src = `images/${normalizedAwayTeam.replace(/\s+/g, '')}.png`;

					finalMatchesTable
						.querySelectorAll('.GSTableMatches')[0]
						.classList.remove('hide');

					if (r === 24) {
						continueToKOBtn.classList.add('hide');
					}
					KORound++;
				}
			}
			function populateKnockoutStage(
				teamNamesElements,
				teamImgsElements,
				qualifiedTeams,
				increment
			) {
				let potIndex = 0;
				let fixtureIdx = 0;

				for (let i = 0; i < qualifiedTeams.length; i++) {
					const teamName = qualifiedTeams[i];
					const normalizedTeam = normalizeTeamName(teamName);

					// Determine the index for filling team names and images
					let nameIndex1 =
						fixtureIdx % 2 === 0
							? potIndex + fixtureIdx + (fixtureIdx + 1)
							: potIndex + fixtureIdx + (fixtureIdx - 2);
					let nameIndex2 = fixtureIdx % 2 === 0 ? nameIndex1 + 1 : nameIndex1 + 3;
					let imgIndex1 = nameIndex1;
					let imgIndex2 = nameIndex2;

					teamNamesElements[nameIndex1].innerText = teamName;
					teamNamesElements[nameIndex2].innerText = teamName;
					teamImgsElements[imgIndex1].src = `images/${normalizedTeam.replace(
						/\s+/g,
						''
					)}.png`;
					teamImgsElements[imgIndex2].src = `images/${normalizedTeam.replace(
						/\s+/g,
						''
					)}.png`;

					fixtureIdx++;
				}

				simulateKOBtn.classList.remove('hide');
				tabsContainerKO.classList.remove('hide');
				KORound++;
			}
		});
	});
});
