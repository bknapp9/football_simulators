const startDrawBtn = document.querySelector('#startDraw');
const fastDrawBtn = document.querySelector('#fastDraw');
const continueDrawBtn = document.querySelector('#continueDrawBtn');
const pots = document.querySelector('#potsTable');
const potsContainer = document.querySelector('#potsContainer');
let groupStageTable = document.querySelector('.groupStageTable');
let groupStageTables = document.querySelectorAll('.groupStageTable');
const hr = document.querySelector('.hr');
let potsTables = document.querySelectorAll('.potsTable');
let potsBalls = document.querySelectorAll('.potsBall');
const groupStageTeams = document.querySelectorAll('.GSTeamName');
const groupStageImgs = document.querySelectorAll('#groupStageImgs');
const generateFixturesBtn = document.querySelector('#generateFixturesBtn');
const tabsContainer = document.querySelector('.tabs-container');
let tabLinks = document.querySelectorAll('.tabs a');
tabLinks = Array.from(tabLinks).slice(0, 9);
const tabPanels = document.querySelectorAll('.tabs-panel');
const GSFixtures = document.querySelectorAll('.groupStageMatches');
const simulateMatchdayBtn = document.querySelector('#simulateMatchdayBtn');
const simulateKOBtn = document.querySelector('#simulateKOBtn');
const drawingGif = document.querySelector('#gifContainer');
const topScorers = document.querySelector('.scorers');
let groupSpacings = document.querySelectorAll('.groupSpacing');
const topTenScorers = document.querySelector('.topScorers');
let groupSpacing = groupSpacings[0];
const fastKODrawBtn = document.querySelector('#fastKODraw');
const continueToKOBtn = document.querySelector('#continueToKO');
const RO16Matches = document.querySelector('#RO16Matches');
const RO16MatchesSect = document.querySelectorAll('#RO16Match');
const RO16MatchesTableA = document.querySelectorAll('#RO16MatchesTableA');
const RO16Matchups = [
	[1, 3],
	[4, 13],
	[6, 11],
	[8, 15],
	[2, 12],
	[0, 5],
	[10, 14],
	[7, 9],
];
const RO16MatchesTableB = document.querySelectorAll('#RO16MatchesTableB');
const tabsContainerRO16 = document.querySelector('#tabsContainerRO16');
const tabLinksRO16 = tabsContainerRO16.querySelectorAll('.tabs a');
const GSTableMatches = document.querySelectorAll('.GSTableMatches');
const tabPanelsRO16 = tabsContainerRO16.querySelectorAll('.tabs-panel');
const RO16TeamNames = document.querySelectorAll('#RO16TeamName');
const RO16TeamImgs = document.querySelectorAll('#RO16TeamsImgs');
let globalScoreValue;
const topScorersList = {};
const qualifiedToRO16 = [];
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
let KORound = 0;

// Fetch teams and original group stage data from JSON file
const loadTeams = async () => {
	const res = await fetch('clubs_world_cup.json'); // Fetch JSON data
	const data = await res.json(); // Parse JSON data

	const teams = data.Teams.Team; // Extract teams array
	const OriginalGS = data.OriginalCLIGS; // Extract original group stage data

	return [teams, OriginalGS]; // Return both arrays
};

// Disable ball elements
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

// Load teams data and perform actions once data is available
loadTeams().then((Teams) => {
	const allTeams = Teams[0]; // Teams array
	const originalGS = Teams[1]; // Original group stage data

	// Function to animate moving a pot element
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

				if (RO16TeamIdx % 2 === 0 && doneTeams && !doneTeams.includes(ball.innerText.trim()) && KORound === 0) {
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

	let i = 0;

	let potTable, potTeams, teamNames;
	startDrawBtn.addEventListener('click', (e) => {
		e.preventDefault();

		startDrawBtn.classList.add('hide');
		fastDrawBtn.classList.add('hide');

		if (KORound === 0) {
			potTable = potsTables[i];
			teamNames = extractTeamNames(i);
			let maxNum = 8;
			generateBalls(maxNum, teamNames, potTable);
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
	});

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
				let teamConfederation = teamInfo.TeamConfederation;

				const uefaCount = groupsNations[groupIdx].filter((conf) => conf === 'UEFA').length;

				if ((teamConfederation !== 'UEFA' && groupsNations[groupIdx].includes(teamConfederation)) || (teamConfederation === 'UEFA' && uefaCount >= 2)) {
					ball.style.pointerEvents = 'none';
					ball.style.backgroundColor = '#8b8c89';
				}
			}
		});
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

		// Ajuste de probabilidades
		let range1_3 = 0.98; // 80% para 1-3 goles
		let range4_8 = 0.01; // 15% para 4-8 goles
		let range9_10 = 0.01; // 5% para 9-10 goles

		// Validación de probabilidades
		let totalProbability = range1_3 + range4_8 + range9_10;
		if (Math.abs(totalProbability - 1) > 0.001) {
			throw new Error('Probabilidades no suman 1.');
		}

		if (result === 'Draw') {
			return generateEvenNumber(0, 10); // Generar solo números pares
		}

		if (random < range1_3) {
			return generateRandomNumber(1, 3);
		} else if (random < range1_3 + range4_8) {
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
						fullName = goalScorer.player.FirstName + ' ' + goalScorer.player.LastName;
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
		let section = document.getElementById('GSTables');
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

	function updateScores(teamRow, id, numToUpdate) {
		const currentNum = parseInt(teamRow.querySelector(id).textContent);
		const newNum = currentNum + numToUpdate;
		teamRow.querySelector(id).textContent = newNum.toString();
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

	let teamToMoveY = -930;
	potsBalls.forEach((potsBall) => {
		potsBall.addEventListener('click', () => {
			if (KORound === 0) {
				let selectedTeam = potsBall.innerText.trim();
				const teamToMove = Array.from(potTeams).find((team) => team.innerText.trim() === selectedTeam);

				let teamInfo = allTeams.find((team) => team.Team === selectedTeam);
				let teamNation = teamInfo.TeamCountry;
				let teamConfederation = teamInfo.TeamConfederation;

				potsBall.classList.add('hide');
				disableBalls();
				let y = -550;

				moveTeamAsync(teamToMove, groupIdx, y).then(() => {
					const selectedTeam = teamToMove.innerText;
					const normalizedTeam = normalizeTeamName(selectedTeam);

					groupStageTeams[potIndex + groupIdx * 4].innerText = selectedTeam;
					groupStageImgs[potIndex + groupIdx * 4].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					r++;
					groupsNations[groupIdx].push(teamConfederation);
					enableBalls();

					if (r > 8 && groupIdx < 8) {
						const activePotsBalls = document.querySelectorAll('.potsBalls .potsBall:not(.hide)');
						let sameNationCount = 0;
						for (const ball of activePotsBalls) {
							let potTeamName = ball.innerText.trim();

							let teamInfo = allTeams.find((team) => team.Team === potTeamName);
							let teamNation = teamInfo.TeamCountry;
							let teamConfederation = teamInfo.TeamConfederation;

							const uefaCount = groupsNations[groupIdx + 1].filter((conf) => conf === 'UEFA').length;

							if ((teamConfederation !== 'UEFA' && groupsNations[groupIdx + 1].includes(teamConfederation)) || (teamConfederation === 'UEFA' && uefaCount >= 2)) {
								sameNationCount++;
								ball.style.pointerEvents = 'none';
								ball.style.backgroundColor = '#8b8c89';
							}

							// if (sameNationCount === activePotsBalls.length) {
							// 	// Si todas las bolas restantes son del mismo país que el ya seleccionado, activar todas las bolas
							// 	enableBalls();
							// } else {
							// 	if (groupsNations[groupIdx + 1].includes(teamConfederation)) {
							// 		ball.style.pointerEvents = 'none';
							// 		ball.style.backgroundColor = '#8b8c89';
							// 	}
							// }
						}
					}
					groupIdx++;
					GSDoneTeams.push(selectedTeam.trim());

					if (r === 8 || r === 16 || r === 24) {
						potIndex += 1;
						groupIdx = 0;
						startDrawBtn.classList.add('hide');
						fastDrawBtn.classList.add('hide');
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
				const teamToMove = Array.from(potTeams).find((team) => team.innerText.trim() === selectedTeam);

				potsBall.classList.add('hide');
				disableBalls();

				if (RO16FixtureIdx % 2 === 0) {
					teamToMoveY += 200;
				}

				moveTeamAsync(teamToMove, 1200 + RO16FixtureIdx, teamToMoveY).then(() => {
					selectedTeam = teamToMove.innerText.trim();
					const normalizedTeam = normalizeTeamName(selectedTeam);

					if (RO16FixtureIdx % 2 === 0) {
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].innerText = selectedTeam;
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)].innerText = selectedTeam;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					} else {
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)].innerText = selectedTeam;
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].innerText = selectedTeam;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
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

	function initializeGroups() {
		// Reinicia los grupos y estructuras relacionadas
		groupIdx = 0;
		potIndex = 0;
		groupsNations = Array.from({ length: 8 }, () => []); // Reinicia groupsNations como un array vacío para cada grupo
		groupStageTeams.forEach((team) => (team.innerText = '')); // Limpia los nombres de los equipos en el grupo
		groupStageImgs.forEach((img) => (img.src = '')); // Limpia las imágenes de los equipos
		console.log('Grupos reiniciados correctamente.');
	}

	function fillGroupStage(retryCount = 0) {
		try {
			hideTablesExcept(false, potsTables);
			for (const potTable of Array.from(potsTables).slice(0, 4)) {
				groupIdx = 0;
				let potTeamNames = potTable.querySelectorAll('.potsTeam');
				potTeamNames = shuffleTeams(potTeamNames);

				let i = 0; // Iterador sobre potTeamNames
				let attempts = 0; // Contador de intentos para prevenir bucles infinitos

				while (i < potTeamNames.length) {
					const potTeamName = potTeamNames[i];
					const selectedTeam = potTeamName.innerText.trim();
					const teamInfo = allTeams.find((team) => team.Team === selectedTeam);
					const teamConfederation = teamInfo.TeamConfederation;

					const uefaCount = groupsNations[groupIdx].filter((conf) => conf === 'UEFA').length;

					if ((teamConfederation !== 'UEFA' && groupsNations[groupIdx].includes(teamConfederation)) || (teamConfederation === 'UEFA' && uefaCount >= 2)) {
						if (groupIdx === 7) {
							placeTeamInGroup(selectedTeam, groupIdx, teamInfo);
							groupIdx++;
							i++;
							attempts = 0; // Reinicia los intentos después de un éxito
						} else {
							potTeamNames.splice(i, 1); // Eliminar el equipo de la posición actual
							potTeamNames.push(potTeamName); // Mover el equipo al final
							attempts++;

							// Si los intentos exceden el límite, lanza un error
							if (attempts > potTeamNames.length * 2) {
								throw new Error('Cannot assign a team.');
							}
						}
					} else {
						placeTeamInGroup(selectedTeam, groupIdx, teamInfo);
						groupIdx++;
						i++;
						attempts = 0; // Reinicia los intentos después de un éxito
					}
				}

				potIndex++;
			}
		} catch (error) {
			console.error(`Error en fillGroupStage: ${error.message}`);

			// Reintentar hasta 3 veces
			if (retryCount < 5) {
				console.log(`Reintentando... intento ${retryCount + 1}`);
				initializeGroups();
				fillGroupStage(retryCount + 1);
			} else {
				console.error('Máximo número de reintentos alcanzado. No se pudo completar.');
				initializeGroups();
				fillGroupStageNoRest();
			}
		}
	}

	function fillGroupStageNoRest() {
		hideTablesExcept(false, potsTables);
		for (const potTable of Array.from(potsTables).slice(0, 4)) {
			groupIdx = 0;
			let potTeamNames = potTable.querySelectorAll('.potsTeam');
			potTeamNames = shuffleTeams(potTeamNames);

			let i = 0; // Iterador sobre potTeamNames
			let attempts = 0; // Contador de intentos para prevenir bucles infinitos

			while (i < potTeamNames.length) {
				const potTeamName = potTeamNames[i];
				const selectedTeam = potTeamName.innerText.trim();
				const teamInfo = allTeams.find((team) => team.Team === selectedTeam);
				const teamConfederation = teamInfo.TeamConfederation;

				const uefaCount = groupsNations[groupIdx].filter((conf) => conf === 'UEFA').length;

				if (teamConfederation !== 'UEFA' && groupsNations[groupIdx].includes(teamConfederation)) {
					if (groupIdx === 7) {
						placeTeamInGroup(selectedTeam, groupIdx, teamInfo);
						groupIdx++;
						i++;
					} else {
						potTeamNames.splice(i, 1); // Eliminar el equipo de la posición actual
						potTeamNames.push(potTeamName); // Mover el equipo al final
					}
				} else {
					placeTeamInGroup(selectedTeam, groupIdx, teamInfo);
					groupIdx++;
					i++;
				}
			}

			potIndex++;
		}
	}
	
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
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].innerText = selectedTeam;
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)].innerText = selectedTeam;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 2)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					} else {
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)].innerText = selectedTeam;
						RO16TeamNames[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].innerText = selectedTeam;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx - 2)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
						RO16TeamImgs[potIndex + RO16FixtureIdx + (RO16FixtureIdx + 1)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
					}
					RO16Nations[RO16GroupIdx].push(teamNation);
					RO16GroupIdx++;
					i++;
				} else {
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
				QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx + 1)].innerText = selectedTeam;
				QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx + 2)].innerText = selectedTeam;
				QFTeamImgs[potIndex + QFFixtureIdx + (QFFixtureIdx + 1)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
				QFTeamImgs[potIndex + QFFixtureIdx + (QFFixtureIdx + 2)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
			} else {
				QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx - 2)].innerText = selectedTeam;
				QFTeamNames[potIndex + QFFixtureIdx + (QFFixtureIdx + 1)].innerText = selectedTeam;
				QFTeamImgs[potIndex + QFFixtureIdx + (QFFixtureIdx - 2)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
				QFTeamImgs[potIndex + QFFixtureIdx + (QFFixtureIdx + 1)].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
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
		groupStageImgs[potIndex + groupIdx * 4].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;
		groupsNations[groupIdx].push(teamInfo.TeamConfederation);
	}

	generateFixturesBtn.addEventListener('click', (e) => {
		e.preventDefault();
		let i = 0;

		hideTablesExcept(false, groupStageTables);
		generateFixturesBtn.classList.add('hide');
		tabsContainer.classList.remove('hide');
		simulateMatchdayBtn.classList.remove('hide');
		hr.classList.add('hide');

		for (let el of tabLinks) {
			for (groupStageTable of groupStageTables) {
				const stats = document.querySelectorAll('.stats');
				for (statRow of stats) {
					statRow.classList.remove('hideTable');
				}
				let tbodyRows = groupStageTable.querySelectorAll('tbody tr');
				let theaders = groupStageTable.querySelectorAll('thead tr th');
				if (theaders.length === 2) {
					// Crear y agregar las nuevas celdas de encabezado en el thead
					const headerRow = groupStageTable.querySelector('thead tr');

					// Crear y agregar las nuevas celdas de encabezado
					const headerLabels = ['P', 'W', 'D', 'L', 'GD', 'Pts'];
					headerLabels.forEach((label) => {
						const th = document.createElement('th');
						th.classList.add('tableTeamStats');
						const bold = document.createElement('b');
						bold.textContent = label;
						th.appendChild(bold);
						headerRow.appendChild(th);
					});

					// Asegurarse de que todas las filas del tbody tengan la misma cantidad de celdas que el thead
					tbodyRows.forEach((row) => {
						for (let i = 0; i < headerRow.cells.length - 1; i++) {
							const td = document.createElement('td');
							// td.classList.add('');
							row.appendChild(td);
						}
					});

					let groupStageTeamNames = groupStageTable.querySelectorAll('.GSTeamName');
					let groupStageTeamImgs = groupStageTable.querySelectorAll('.teamsImgs');
					GSFixture = GSFixtures[i];
					let fixtureTables = GSFixture.querySelectorAll('table');
					let fixtureIdx = 0;
					let idx = 0;
					for (let fixtureTable of fixtureTables) {
						idx = 0;
						let homeTeamNames = fixtureTable.querySelectorAll('.homeTeamName');
						let homeTeamLogos = fixtureTable.querySelectorAll('.homeTeamLogo .teamsImgs');
						let awayTeamNames = fixtureTable.querySelectorAll('.awayTeamName');
						let awayTeamLogos = fixtureTable.querySelectorAll('.awayTeamLogo .teamsImgs');

						homeTeamNames[0].innerText = groupStageTeamNames[GSMatchups[fixtureIdx][idx] - 1].innerText;
						homeTeamLogos[0].src = groupStageTeamImgs[GSMatchups[fixtureIdx][idx] - 1].src;
						homeTeamNames[1].innerText = groupStageTeamNames[GSMatchups[fixtureIdx][idx + 2] - 1].innerText;
						homeTeamLogos[1].src = groupStageTeamImgs[GSMatchups[fixtureIdx][idx + 2] - 1].src;
						awayTeamNames[0].innerText = groupStageTeamNames[GSMatchups[fixtureIdx][idx + 1] - 1].innerText;
						awayTeamLogos[0].src = groupStageTeamImgs[GSMatchups[fixtureIdx][idx + 1] - 1].src;
						awayTeamNames[1].innerText = groupStageTeamNames[GSMatchups[fixtureIdx][idx + 3] - 1].innerText;
						awayTeamLogos[1].src = groupStageTeamImgs[GSMatchups[fixtureIdx][idx + 3] - 1].src;
						idx++;
						fixtureIdx++;
					}
				}
				groupStageTables[0].classList.add('hide');
				groupSpacing.classList.add('hide');
				GSFixtures[0].classList.add('hide');
				topScorers.classList.add('hide');
				groupStageTable = groupStageTables[0];
				groupSpacing = groupSpacings[0];
				groupSpacing.classList.remove('hide');
				groupStageTable.classList.remove('hide');
				groupStageTable.classList.add('group-active');
				GSFixture = GSFixtures[0];
				GSFixture.classList.remove('hide');
				i++;
			}
			el.addEventListener('click', (e) => {
				e.preventDefault();

				groupStageTables[0].classList.add('hide');
				groupStageTable.classList.add('hide');
				groupSpacing.classList.add('hide');
				GSFixture.classList.add('hide');
				topScorers.classList.add('hide');
				let active = document.querySelector('.tabs li.active');
				if (active) {
					active.classList.remove('active');
				}

				const parentListItem = el.parentElement;
				parentListItem.classList.add('active');
				const dataIndex = parentListItem.getAttribute('data-index');
				if (dataIndex === '8') {
					topScorers.classList.remove('hide');
				} else {
					groupStageTable = groupStageTables[dataIndex];
					groupSpacing = groupSpacings[dataIndex];
					groupSpacing.classList.remove('hide');
					groupStageTable.classList.remove('hide');
					groupStageTable.classList.add('group-active');
					GSFixture = GSFixtures[dataIndex];
					GSFixture.classList.remove('hide');

					// Obtener la tabla de Group A

					// Obtener todas las filas del tbody
				}
			});
		}
	});

	let clickCount = 0;
	simulateMatchdayBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		clickCount++;

		const homeTeamsIndex = [0, 3, 6, 9, 12, 15, 18, 21].map((x) => x + clickCount - (1 % 6));

		simulateMatchdayBtn.textContent = `Simulate Matchday ${clickCount + 1}`;

		const teams = homeTeamsIndex.flatMap((index) => {
			const match = GSTableMatches[index];
			return [...match.querySelectorAll('.homeTeamName, .awayTeamName')].map((el) => el.textContent.trim());
		});

		const homeTeams = teams.filter((_, i) => i % 2 === 0);
		const awayTeams = teams.filter((_, i) => i % 2 === 1);

		const extendedHomeTeamsIndex = homeTeamsIndex.flatMap((index) => [index, index]);

		let homeTeamWinChance;
		let awayTeamWinChance;
		let ratingDifference;
		for (let i = 0; i < homeTeams.length; i++) {
			const homeTeam = homeTeams[i].trim();
			const awayTeam = awayTeams[i].trim();

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

			let homeTeamScores = GSTableMatches[extendedHomeTeamsIndex[i]].querySelectorAll('.homeTeamScore:not(.done)');
			let awayTeamScores = GSTableMatches[extendedHomeTeamsIndex[i]].querySelectorAll('.awayTeamScore:not(.done)');
			homeTeamScores[0].innerText = homeTeamGoals;
			awayTeamScores[0].innerText = awayTeamGoals;
			homeTeamScores[0].classList.add('done');
			awayTeamScores[0].classList.add('done');
			let currentRow = GSTableMatches[extendedHomeTeamsIndex[i]].querySelectorAll('.fixtureRow:not(.done)')[0];
			let detailsElement = currentRow.querySelector('.details');

			detailsElement.remove();

			let homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
			let awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);

			if (homeTeamGoals !== 0) {
				while (!homeTeamGoal.goalMinutes || !homeTeamGoal.goalScorers) {
					homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
				}
				let homeTeamGoalScorers = homeTeamGoal.goalScorers;
				let homeTeamGoalMinutes = sortObj(homeTeamGoal.goalMinutes);

				for (let i = 0; i < homeTeamGoalScorers.length; i++) {
					let goalScorer = `${homeTeamGoalScorers[i].player.FirstName} ${homeTeamGoalScorers[i].player.LastName}`.trim();
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
				while (!awayTeamGoal.goalMinutes) {
					awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);
				}
				let awayTeamGoalScorers = awayTeamGoal.goalScorers;
				let awayTeamGoalMinutes = sortObj(awayTeamGoal.goalMinutes);

				for (let i = 0; i < awayTeamGoalScorers.length; i++) {
					let goalScorer = `${awayTeamGoalScorers[i].player.FirstName} ${awayTeamGoalScorers[i].player.LastName}`.trim();
					let goalMinute = awayTeamGoalMinutes[i];
					let html = `<p class="away"><span class="goalMinute">${goalMinute}'  </span> ${goalScorer}`;
					if (awayTeamGoalScorers[i].isPenalty) {
						html += ' (p)';
					}
					html += '</p>';
					detailsElement.innerHTML += html;
				}
			}

			updateScores(homeTeamRow, '#matchesPlayed', 1);
			updateScores(awayTeamRow, '#matchesPlayed', 1);

			const detailsElementDiv = currentRow.parentNode.querySelector('.details');
			if (!detailsElementDiv) {
				currentRow.parentNode.insertBefore(detailsElement, currentRow.nextSibling);
			}

			currentRow.classList.add('done');

			for (const GSTable of groupStageTables) {
				sortTable(GSTable);
			}
		}

		updateGoalScorers(topScorersList);

		if (clickCount === 3) {
			simulateMatchdayBtn.classList.add('hide');
			continueToKOBtn.classList.remove('hide');

			groupStageTables.forEach((table) => {
				const [team1, team2] = [...table.querySelectorAll('.GSTeamName')].map((el) => el.textContent);
				qualifiedToRO16.push(team1, team2);
			});
		}
	});

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

	continueToKOBtn.addEventListener('click', (e) => {
		e.preventDefault();

		if (KORound === 0) {
			KORound++;

			// startDrawBtn.classList.remove('hide');
			// fastDrawBtn.classList.remove('hide');
			// topScorers.classList.add('hide');

			const RO16TeamNames = document.querySelectorAll('#RO16TeamName');
			const RO16TeamImgs = document.querySelectorAll('#RO16TeamsImgs');
			RO16FixtureIdx = 0;

			for (let matchup of RO16Matchups) {
				const homeTeam = qualifiedToRO16[matchup[0]];
				const awayTeam = qualifiedToRO16[matchup[1]];

				const normalizedHomeTeam = normalizeTeamName(homeTeam);
				const normalizedAwayTeam = normalizeTeamName(awayTeam);

				RO16TeamNames[RO16FixtureIdx].innerText = homeTeam;
				RO16TeamNames[RO16FixtureIdx + 1].innerText = awayTeam;
				RO16TeamImgs[RO16FixtureIdx].src = `clubs_world_cup_images/${normalizedHomeTeam.replace(/\s+/g, '')}.png`;
				RO16TeamImgs[RO16FixtureIdx + 1].src = `clubs_world_cup_images/${normalizedAwayTeam.replace(/\s+/g, '')}.png`;

				RO16FixtureIdx += 2;
			}

			tabsContainer.classList.add('hide');
			continueToKOBtn.classList.add('hide');
			hideTablesExcept(false, groupStageTables);
			hideTablesExcept(false, GSTableMatches);
			RO16Matches.classList.remove('hide');
			showTables(RO16MatchesSect);
			groupSpacing.classList.add('hide');
			tabsContainerKO.classList.remove('hide');
			simulateKOBtn.classList.remove('hide');

			tabLinksKO.forEach((el) => {
				el.addEventListener('click', (e) => {
					e.preventDefault();
					hideTablesExcept(false, groupStageTables);
					GSTables.classList.add('hide');

					document.querySelector('#tabsKO li.active')?.classList.remove('active');
					el.parentElement.classList.add('active');

					const dataIndex = el.parentElement.getAttribute('data-index');
					const matchesTable = document.querySelector('.activeTable');
					matchesTable.classList.toggle('hide', dataIndex !== '0');
					topScorers.classList.toggle('hide', dataIndex !== '1');
				});
			});

			simulateKOBtn.addEventListener('click', async (e) => {
				e.preventDefault();

				const fixtureIdx = KORound === 1 ? [24, 24, 25, 25, 26, 26, 27, 27] : KORound === 2 ? [28, 28, 29, 29] : KORound === 3 ? [30, 30] : [31];

				const uniqueFixtureIdx = [...new Set(fixtureIdx)];

				// if (KORound === 4) {
				//     simulateKOBtn.innerText = 'Simulate 2nd Leg';
				// } else {
				//     simulateKOBtn.innerText = 'Simulate 2nd Leg';
				// }

				const homeTeams = [];
				const awayTeams = [];
				const extractTeams = (table) => {
					const rows = table.querySelectorAll('tbody.groupMatches tr');
					rows.forEach((row) => {
						homeTeams.push(row.querySelector('.homeTeam .homeTeamName').textContent.trim());
						awayTeams.push(row.querySelector('.awayTeam .awayTeamName').textContent.trim());
					});
				};

				uniqueFixtureIdx.forEach((index) => GSTableMatches[index] && extractTeams(GSTableMatches[index]));

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

					let penaltiesResult;
					if (homeTeamGoals === awayTeamGoals) {
						const ET = extraTime(homeTeamGoals, awayTeamGoals);
						result = ET.winner;
						winMethod = ET.winMethod;

						if (winMethod === 'Penalties') {
							penaltiesResult = penalties();
						} else {
							nGoals = generateRandomNumber(1, 2);
							gDifference = nGoals;

							if (result === 'Home Team') {
								homeTeamGoals += nGoals;
							} else {
								awayTeamGoals += nGoals;
							}
						}
					}

					const currentRow = GSTableMatches[fixtureIdx[i]].querySelectorAll('.fixtureRow:not(.done)')[0];
					let detailsElement = currentRow.querySelector('.details');

					detailsElement.remove();

					let homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
					let awayTeamGoal = determineGoalScorers(awayTeamInfo, awayTeamGoals);

					if (winMethod === 'Extra Time') {
						if (result === 'Home Team') {
							let ETGoalScorers = determineGoalScorers(homeTeamInfo, nGoals, true);
							while (!ETGoalScorers.goalMinutes) {
								ETGoalScorers = determineGoalScorers(homeTeamInfo, nGoals, true);
							}
							while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
								homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
							}
							homeTeamGoal = sumObjects(ETGoalScorers, homeTeamGoal);
						} else {
							let ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, true);
							while (!ETGoalScorers.goalMinutes) {
								ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, true);
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
							let goalScorer = `${homeTeamGoalScorers[i].player.FirstName} ${homeTeamGoalScorers[i].player.LastName}`.trim();
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
							let goalScorer = `${awayTeamGoalScorers[i].player.FirstName} ${awayTeamGoalScorers[i].player.LastName}`.trim();
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

					const detailsElementDiv = currentRow.parentNode.querySelector('.details');
					if (!detailsElementDiv) {
						currentRow.parentNode.insertBefore(detailsElement, currentRow.nextSibling);
					}

					currentRow.classList.add('done');

					updateGoalScorers(topScorersList);

					simulateKOBtn.classList.add('hide');
					continueToKOBtn.classList.remove('hide');
					if (KORound === 1) {
						continueToKOBtn.innerText = 'Continue to Quarter Finals';
					} else if (KORound === 2) {
						continueToKOBtn.innerText = 'Continue to Semi Finals';
					} else {
						continueToKOBtn.innerText = 'Continue to Final';
					}

					if (qualifiedToF.length > 0) {
						simulateKOBtn.innerText = 'Simulate Final';
					}

					if (homeTeamGoals > awayTeamGoals) {
						qualifyTeam(homeTeam);
					} else if (awayTeamGoals > homeTeamGoals) {
						qualifyTeam(awayTeam);
					} else {
						if (result === 'Home Team') {
							qualifyTeam(homeTeam);
						} else {
							qualifyTeam(awayTeam);
						}
					}

					let homeTeamScores = GSTableMatches[fixtureIdx[i]].querySelectorAll('.homeTeamScore:not(.done)');
					let awayTeamScores = GSTableMatches[fixtureIdx[i]].querySelectorAll('.awayTeamScore:not(.done)');

					if (winMethod === 'Penalties') {
						const penaltiesResults = penaltiesResult.split('-');
						let penaltiesScoreOne;
						let penaltiesScoreTwo;

						if (result === 'Home Team') {
							penaltiesScoreOne = parseInt(penaltiesResults[0]);
							penaltiesScoreTwo = parseInt(penaltiesResults[1]);
						} else {
							penaltiesScoreOne = parseInt(penaltiesResults[1]);
							penaltiesScoreTwo = parseInt(penaltiesResults[0]);
						}

						homeTeamScores[0].innerText = `${homeTeamGoals} (${penaltiesScoreOne})`;
						awayTeamScores[0].innerText = `(${penaltiesScoreTwo}) ${awayTeamGoals}`;
					} else {
						homeTeamScores[0].innerText = homeTeamGoals;
						awayTeamScores[0].innerText = awayTeamGoals;
					}

					homeTeamScores[0].classList.add('done');
					awayTeamScores[0].classList.add('done');

					if (KORound === 4 && clickCount > 0) {
						const winnerText = document.querySelector('.winner');

						if (result === 'Home Team') {
							winnerText.innerText = `${homeTeam} wins the EURO!!!`;
						} else {
							winnerText.innerText = `${awayTeam} wins the EURO!!!`;
						}

						const jsConfetti = new JSConfetti();

						jsConfetti.addConfetti().then(() => jsConfetti.addConfetti());

						continueToKOBtn.classList.add('hide');
					}
				}
			});
		} else if (KORound > 0) {
			continueToKOBtn.classList.add('hide');
			hideTablesExcept(false, GSTableMatches);
			groupSpacing.classList.add('hide');

			GSTableMatches.forEach((match, index) => {
				if (index >= 28 && index <= 29 && KORound === 1) {
					match.classList.remove('hide');
				}
			});

			potIndex = 0;

			if (KORound === 1) {
				const QFTeamNames = document.querySelectorAll('#QFTeamName');
				const QFTeamImgs = document.querySelectorAll('#QFTeamsImgs');
				RO16Matches.classList.remove('activeTable');
				QFMatchesTable.classList.add('activeTable');
				QFMatchesTable.classList.remove('hide');

				populateKnockoutStage(QFTeamNames, QFTeamImgs, qualifiedToQF);
			} else if (KORound === 2) {
				QFMatchesTable.classList.remove('activeTable');
				SFMatchesTable.classList.add('activeTable');

				SFMatchesTable.classList.remove('hide');
				continueToKOBtn.classList.add('hide');
				hideTablesExcept(false, GSTableMatches);
				groupSpacing.classList.add('hide');

				GSTableMatches[30].classList.remove('hide');

				const SFTeamNames = document.querySelectorAll('#SFTeamName');
				const SFTeamImgs = document.querySelectorAll('#SFTeamsImgs');

				populateKnockoutStage(SFTeamNames, SFTeamImgs, qualifiedToSF, 2);
			} else if (KORound === 3) {
				SFMatchesTable.classList.remove('activeTable');
				finalMatchesTable.classList.add('activeTable');

				finalMatchesTable.classList.remove('hide');
				continueToKOBtn.classList.add('hide');
				simulateKOBtn.classList.remove('hide');

				hideTablesExcept(false, GSTableMatches);
				groupSpacing.classList.add('hide');

				GSTableMatches[31].classList.remove('hide');

				const finalTeamNames = document.querySelectorAll('#finalTeamName');
				const finalTeamImgs = document.querySelectorAll('#finalTeamsImgs');

				const homeTeamName = qualifiedToF[0];
				const awayTeamName = qualifiedToF[1];

				const normalizedHomeTeam = normalizeTeamName(homeTeamName);
				const normalizedAwayTeam = normalizeTeamName(awayTeamName);

				finalTeamNames[0].innerText = homeTeamName;
				finalTeamNames[1].innerText = awayTeamName;

				finalTeamImgs[0].src = `clubs_world_cup_images/${normalizedHomeTeam.replace(/\s+/g, '')}.png`;
				finalTeamImgs[1].src = `clubs_world_cup_images/${normalizedAwayTeam.replace(/\s+/g, '')}.png`;

				if (r === 24) {
					continueToKOBtn.classList.add('hide');
				}
				KORound++;
			}
		}

		function populateKnockoutStage(teamNamesElements, teamImgsElements, qualifiedTeams) {
			let fixtureIdx = 0;

			for (let i = 0; i < qualifiedTeams.length; i++) {
				const teamName = qualifiedTeams[i];
				const normalizedTeam = normalizeTeamName(teamName);

				// Determine the index for filling team names and images

				teamNamesElements[fixtureIdx].innerText = teamName;
				teamImgsElements[fixtureIdx].src = `clubs_world_cup_images/${normalizedTeam.replace(/\s+/g, '')}.png`;

				fixtureIdx++;
			}

			simulateKOBtn.classList.remove('hide');
			tabsContainerKO.classList.remove('hide');
			KORound++;
		}
	});
});
