const startDrawBtn = document.querySelector('#startDraw');
const fastDrawBtn = document.querySelector('#fastDraw');
const continueFromOriginalBtn = document.querySelector('#continueFromOriginal');
const continueToKOBtn = document.querySelector('#continueToKO')
const continueDrawBtn = document.querySelector('#continueDrawBtn');
const generateFixturesBtn = document.querySelector('#generateFixturesBtn');
const potsTables = document.querySelectorAll('.potsTable');
let potsBalls = document.querySelectorAll('.potsBall');
let KORound = 0;
let groupIdx = 0;
const groupStageTeams = document.querySelectorAll('.GSTeamName');
const groupStageImgs = document.querySelectorAll('#groupStageImgs');
let potIndex = 0;
let r = 0;
const GSDoneTeams = []
let tabLinks = document.querySelectorAll('.tabs a');
tabLinks = Array.from(tabLinks).slice(0, 10);
const tabsContainer = document.querySelector('.tabs-container');
const tabPanels = document.querySelectorAll(".tabs-panel");
let groupStageTable = document.querySelector('.groupStageTable');
let groupStageTables = document.querySelectorAll('.groupStageTable');
const topTenScorers = document.querySelector('.topScorers');
const topScorers = document.querySelector('.scorers');
let groupSpacings = document.querySelectorAll('.groupSpacing')
const hr = document.querySelector('.hr');
let groupSpacing = groupSpacings[0]
const GSFixtures = document.querySelectorAll('.groupStageMatches')
const GSMatchups = [[1, 2, 3, 4], [1, 3, 2, 4], [4, 1, 2, 3]]
const GSTableMatches = document.querySelectorAll('.GSTableMatches');
const topScorersList = {}
const QFMatches = document.querySelector('#QFMatches');
const QFMatchesSect = document.querySelectorAll('#QFMatchesTable');
const QFMatchups = [[0,3], [2, 1], [4, 7], [6, 5]];
const tabsContainerKO = document.querySelector('#tabsContainerKO');
const tabLinksKO = tabsContainerKO.querySelectorAll('.tabs a');
const simulateMatchdayBtn = document.querySelector('#simulateMatchdayBtn');
const simulateKOBtn = document.querySelector('#simulateKOBtn')
const GSTables = document.querySelector('#GSTables');
const qualifiedToF = [];
const qualifiedToQF = [];
const qualifiedToSF = [];
const QFMatchesTable = document.querySelector('.QFMatches');
const SFMatchesTable = document.querySelector('.SFMatches');
const finalMatchesTable = document.querySelector('.finalMatch')
let QFFixtureIdx = 0;
const QFTeamNames = document.querySelectorAll('#QFTeamName');
const QFTeamImgs = document.querySelectorAll('#QFTeamsImgs');

const loadTeams = async () => {
    const res = await fetch('sud_NT.json')
    const data = await res.json()

    const teams = data.Teams.Team
    const OriginalGS = data.OriginalGS

    return [teams, OriginalGS];
}

function disableBalls() {
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        ball.style.pointerEvents = 'none';
        ball.style.backgroundColor = '#8b8c89';
    });
}

function enableBalls() {
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        ball.style.pointerEvents = 'auto'; 
        ball.style.backgroundColor = '#fff'
    });
}

function isWindowSmall() {
    return window.innerWidth <= 1304;
}

loadTeams().then(Teams => {
    const allTeams = Teams[0];
    const originalGS = Teams[1];

    function movePot(potTable) {
        return new Promise((resolve, reject) => {
            potTable.classList.remove('hide')
            potTable.style.position = "absolute";
            potTable.style.bottom = "0";
            potTable.style.right = "0";
            potTable.style.transition = "all 1s ease-in-out";
            
            potTable.style.transform = "translate(0, 0)";
            setTimeout(() => {
                potTable.style.transform = "translate(20%, 35%)";
                resolve();
            }, 100);
        });
    }

    async function moveTeam(team, x, y) {
        x++;
        
        team.style.position = "absolute";
        team.style.bottom = "0";
        team.style.right = "0";
        team.style.transition = "all 1s ease-in-out";
        
        team.style.transform = "translate(0, 0)";

        if (x <= 4) {
            x = -2000 + (x * 400);
        } else if (x > 4 && x < 9) {
            x = -2000 + ((x - 4) * 400);
            y = -280;
        }
        
        setTimeout(() => {
            team.style.transform = `translate(${x}px, ${y}px)`;
            
            setTimeout(() => {
                team.classList.add('hide');
            }, 1000);
        }, 100);

        return 'done';
    }

    async function generateBalls(maxNum, teamNames, potTable, doneTeams=false, i=false) {

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

            let potsBallIdx = 0;
            
            for (let ball of potsBalls) {
                potsBallIdx++;

                ball.classList.add('ball', 'white');
                ball.classList.remove('hide');

                chooseRandomTeam(maxNum--, teamNames, ball, doneTeams);
            }

            let activePotsBalls = document.querySelectorAll('.potsBall:not(.hide)').length;
            let activePotsTeams = potTable.querySelectorAll('.potsTeam:not(.hide)').length;
            if (activePotsBalls !== activePotsTeams) {
                teamNames = extractTeamNames(i);
                generateBalls(6, teamNames, potTable, doneTeams, i);
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

    function chooseRandomTeam(maxNum, potTeams, ball, doneTeams=false) {
        let i = Math.floor(Math.random() * maxNum);
        
        let team = potTeams[i];
        let counter = 0;

        while (doneTeams && doneTeams.includes(team.trim()) && counter < 8) {
            i = Math.floor(Math.random() * maxNum);
            team = potTeams[i];
            counter++;
        }

        if (counter === 8) {
            ball.classList.add('hide')
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
        potTeams.forEach(team => {
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

        potTable = potsTables[i];
        teamNames = extractTeamNames(i);
        continueFromOriginalBtn.classList.add('hide');
        let maxNum = 4;
        generateBalls(maxNum, teamNames, potTable)
    })

    continueDrawBtn.addEventListener('click', (e) => {
        e.preventDefault();
        continueDrawBtn.classList.add('hide');

        potTable = potsTables[potIndex];
        potTeams = potTable.querySelectorAll('.potsTeam');
        potTeams = shuffleTeams(potTeams);
        teamNames = extractTeamNames(potIndex);
        let maxNum = 4;
        showTables(potsTables);
        generateBalls(maxNum, teamNames, potTable).then(() => {
        })
    });

    async function moveTeamAsync(team, x, y) {
        if (!isWindowSmall()) {
            moveTeam(team, x, y);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Elegir numero random mediante un filtro
    function generateRandomNumber (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Elegir numero random par mediante un filtro
    function generateEvenNumber (min, max) {
        let evenNumber;
        do {
            evenNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (evenNumber % 2 !== 0);
        return evenNumber;
    }

    // Generar el numero de goles en el partido
    function generateNumbersGoals(result) {
        let random = Math.random();

        // 80% de probabilidad de que hayan entre 1-3 goles
        let range1_3 = 0.97;
        // 20% de probabilidad de que hayan entre 4-8 goles
        let range4_8 = 0.03;

        // Si el resultado es empate, generar numero par
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

    // Generar la diferencia de goles de los dos equipos en un partido mediante la ratingDifference
    function generateGoalDifference(ratingDifference, gNumber) {
        if (ratingDifference <= 20) {
            if (gNumber % 2 === 0) {
                return generateRandomNumber(2, 2)
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

    // Determinar resultado en base a la probabilidad de ganar de cada equipo
    function determineResult(homeTeamWinChance, teamRatingDifference) {
        let drawProbability = (teamRatingDifference < 10) ? 0.2 : 0.1;
        
        let random = Math.random();

        if (random < drawProbability) {
            return "Draw";
        } else {
            let randomOutcome = Math.random();
            if (randomOutcome < homeTeamWinChance) {
                return "Home Team";
            } else {
                return "Away Team";
            }
        }
    }

    // Determinar los anotadores del partido
    function determineGoalScorers(team, gNumber, ET = false) {
        if (gNumber === 0) {
            return null;
        }

        // Obtener todos los jugadores de dicho equipo
        const players = team.Players;

        // Determinar el tirador de penaltis del equipo
        const penaltyTaker = players.find(player => player.PenaltyTaker === true);
        let goalScorers = []
        let goalMinutes = []

        let random = Math.random() * 100;
        let penaltyChance = Math.random() * 100;

        let goalN = 0; 
        for (const player of players) {

            // Si hay penalti
            if (penaltyChance <= 20) {
                goalScorers.push({ player: penaltyTaker, isPenalty: true });
                let goalMinute = generateGoalMinute(ET);
                goalMinutes.push(goalMinute);
                goalN++;
                penaltyChance = Math.random() * 100;
            }
            if (random < player.ScoringChance && goalN < gNumber) {

                // Elegir el anotador del equipo
                goalScorers.push({ player: player, isPenalty: false });

                // Determinar el minuto del gol
                let goalMinute = generateGoalMinute(ET);
                goalMinutes.push(goalMinute);
                goalN++;

                // Insertar el anotador del equipo en topScorersList
                if (goalN >= gNumber) {
                    for (let goalScorer of goalScorers) {
                        const fullName = goalScorer.player.FirstName + ' ' + goalScorer.player.LastName;
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

    // Actualizar la lista de topScorers
    function updateGoalScorers(topScorersList) {

        // Determinar los 10 jugadores con mas goles
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

    // Ordenar GroupStageTable
    function sortTable(table) {
        let tbody = table.querySelector('tbody');
        let rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort(function(a, b) {
            let pointsA = parseInt(a.querySelector('.totalPts').textContent) || 0;
            let pointsB = parseInt(b.querySelector('.totalPts').textContent) || 0;
            let goalDiffA = parseInt(a.querySelector('.goalDifference').textContent) || 0;
            let goalDiffB = parseInt(b.querySelector('.goalDifference').textContent) || 0;

            // Si dos o mas equipos tienen los mismos puntos, se medira quien acabe primero en base a la diferencia de goles de cada equipo
            if (pointsA !== pointsB)  {
                return pointsB - pointsA;
            } else {
                return goalDiffB - goalDiffA;
            }
            
        });

        rows.forEach(function(row) {
        tbody.appendChild(row);
    });

    rows.forEach(function(row) {
        tbody.appendChild(row);
    });
}

// Ordenar goalMinute
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

    // Buscar row de un teamName en especifico
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

    // Actualizar resultados de los partidos
    function updateScores(teamRow, id, numToUpdate) {
        const currentNum = parseInt(teamRow.querySelector(id).textContent);
        const newNum = currentNum + numToUpdate;
        teamRow.querySelector(id).textContent = newNum.toString();
    }

    // Eliminar espacios o tildes
    function normalizeTeamName(selectedTeam) {
        const normalizedTeam = selectedTeam.replace(/[áéíóúÁÉÍÓÚãñÑ]/g, match => {
            if (match.normalize) {
                return match.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
            } else {
                return match.replace(/[áéíóúÁÉÍÓÚãñÑ]/g, ''); 
            }
        });

        return normalizedTeam;
    }


    // Generar el minuto del gol
    function generateGoalMinute(extraTime = false) {
        const probability = Math.random();

        // Si el gol fue en tiempo extra
        if (extraTime) {
            const minute = `${Math.floor(Math.random() * 31) + 90}`;
            return minute;
        } else if (probability <= 0.03) {
            let half = Math.random();
            let halfAddedTime;

            if (half <= 0.50) {
                halfAddedTime = 45;
            } else {
                halfAddedTime = 90;
            }
            const addedTime = `${halfAddedTime} + ${Math.floor(Math.random() * 10) + 1}`;
            return addedTime;
        } else {
            const minute = `${Math.floor(Math.random() * 90) + 1}`;
            return minute;
        }
    }

    // Obtener los maximos anotadores de la competencia
    function getTopScorers(obj, limit = 10) {
        const entries = Object.entries(obj);

        const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

        const topEntries = sortedEntries.slice(0, limit);

        const topScorers = Object.fromEntries(topEntries);

        return topScorers;
    }

    // Obtener el resultado de penaltis
    function penalties() {
            const results = [
                { score: "4-3", probability: 0.235 },
                { score: "3-2", probability: 0.206 },
                { score: "5-4", probability: 0.163 },
                { score: "4-2", probability: 0.134 },
                { score: "3-1", probability: 0.122 },
                { score: "5-3", probability: 0.113 },
                { score: "4-1", probability: 0.101 },
                { score: "2-2", probability: 0.067 },
                { score: "2-1", probability: 0.059 },
                { score: "1-1", probability: 0.046 }
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

    // Tiempo extra
    function extraTime() {
        const result = Math.random();

        let winner;
        let winMethod;

        // 50% de probabilidad de que gane homeTeam, 50% de probabilidad de que gane awayTeam
        if (result < 0.5) {
            winner = 'Home Team';
        } else {
            winner = 'Away Team';
        }

        // 50% de probabilidad de que el partido se vaya a penaltis, 50% de probabilidad de que el partido se vaya a tiempo extra
        if (result < 0.5) {
            winMethod = 'Penalties'
        } else {
            winMethod = 'Extra Time'
        }

        return { winner, winMethod };
    }

    // Encontrar equipo en base a el nombre de un jugador
    function findTeamByPlayerName(playersData, playerName) {
        for (const team of Object.values(playersData[0])) {
            const player = team.Players.find(player => {
                const fullName = player.FirstName + ' ' + player.LastName;
                return fullName.trim() === playerName.trim();
            });
            if (player) {
                return team.Team;
            }
        }
        return null;
    }

    // Sumar dos objetos
    function sumObjects(obj1, obj2) {
        try {
        if (!obj2) {
            return { ...obj1 };
        } else if (!obj1.goalScorers) {
            obj1 = {
                'goalScorers': obj1,
            }
        } else {

        const goalScorers = [...obj1.goalScorers, ...obj2.goalScorers];

        const goalMinutes = [...obj1.goalMinutes, ...obj2.goalMinutes];

        return { goalScorers, goalMinutes };
        }
    } catch (e) {
        console.log(e)
    }
    }

    // Calificar equipo a la siguiente fase
    function qualifyTeam(team) {
        if (qualifiedToQF.length < 8) {
            qualifiedToQF.push(team);
        } else if (qualifiedToSF.length < 4) {
            qualifiedToSF.push(team);
        } else {
            qualifiedToF.push(team);
        }
    }

    // Si se hace click en potsBall
    potsBalls.forEach((potsBall) => {
        potsBall.addEventListener('click', () => {
            let selectedTeam = potsBall.innerText.trim();
            const teamToMove = Array.from(potTeams).find(team => team.innerText.trim() === selectedTeam);
        
            potsBall.classList.add('hide');
            disableBalls();
            let y = -550;
            
            // Animacion de mover equipo
            moveTeamAsync(teamToMove, groupIdx, y).then(() => {
                const selectedTeam = teamToMove.innerText;
                const normalizedTeam = normalizeTeamName(selectedTeam);

                // Actualizar equipo dentor de groupStageTeams y Imgs
                groupStageTeams[potIndex + groupIdx * 4].innerText = selectedTeam;
                groupStageImgs[potIndex + groupIdx * 4].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
                r++;
                enableBalls();

                groupIdx++;
                GSDoneTeams.push(selectedTeam.trim());

                if (r === 4 || r === 8 || r === 16) {
                    potIndex += 1;
                    groupIdx = 0;
                    startDrawBtn.classList.add('hide');
                    fastDrawBtn.classList.add('hide');
                    continueFromOriginalBtn.classList.add('hide');
                    potTable.classList.add('hide');
                    continueDrawBtn.classList.remove('hide');
                    done = false;
                } else if (r === 24) {
                    generateFixturesBtn.classList.remove('hide');
                    hideTablesExcept(false, potsTables);
                    r = 0;
                }
            });
        })
    })

    fastDrawBtn.addEventListener('click', (e) => {
        e.preventDefault();
        [startDrawBtn, fastDrawBtn].forEach(btn => btn.classList.add('hide'));
        
        // Fase de Group Stage
        if (KORound === 0) {
            fillGroupStage();
            generateFixturesBtn.classList.remove('hide');
        }
    })

    function fillGroupStage() {
        continueFromOriginalBtn.classList.add('hide');
        hideTablesExcept(false, potsTables);
        for (const potTable of Array.from(potsTables).slice(0, 4)) {
            groupIdx = 0;
            let potTeamNames = potTable.querySelectorAll('.potsTeam');
            potTeamNames = shuffleTeams(potTeamNames);
            
            let i = 0; // Variable para iterar sobre potTeamNames
            while (i < potTeamNames.length) {
                const potTeamName = potTeamNames[i];
                const selectedTeam = potTeamName.innerText.trim();
                
                placeTeamInGroup(selectedTeam, groupIdx);
                groupIdx++;
                i++;
            }
            
            potIndex++;
        }
    }

    function placeTeamInGroup(teamName, groupIdx) {
        const normalizedTeam = normalizeTeamName(teamName);
        groupStageTeams[potIndex + groupIdx * 4].innerText = teamName;
        groupStageImgs[potIndex + groupIdx * 4].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
    }

    // Boton de continuar desde el sorteo original
    continueFromOriginalBtn.addEventListener('click', (e) => {
        i = 0;
        e.preventDefault()
        startDrawBtn.classList.add('hide');
        fastDrawBtn.classList.add('hide');
        continueFromOriginalBtn.classList.add('hide');
        hideTablesExcept(false, potsTables)
        for (let group in originalGS) {
            originalGS[group].forEach(team => {
                const normalizedTeam = normalizeTeamName(team);
                groupStageTeams[i].innerText = team;
                groupStageImgs[i].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
                i++;
            })
        }
        
        generateFixturesBtn.classList.remove('hide');
        startDrawBtn.classList.add('hide');
        continueFromOriginalBtn.classList.add('hide');
        fastDrawBtn.classList.add('hide');
    })
    
    // Generar fixtures
    generateFixturesBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let i = 0;
        let GSFixture;

        hideTablesExcept(false, groupStageTables)
        generateFixturesBtn.classList.add('hide');
        tabsContainer.classList.remove('hide');
        simulateMatchdayBtn.classList.remove('hide')
        hr.classList.add('hide');

        for (let el of tabLinks) {
            for (groupStageTable of groupStageTables) {
                const stats = document.querySelectorAll('.stats')
                for (const statRow of stats) {
                    statRow.classList.remove('hideTable');
                }
                let tbodyRows = groupStageTable.querySelectorAll('tbody tr');
                let theaders = groupStageTable.querySelectorAll('thead tr th')
                if (theaders.length === 2) {

                    // Crear y agregar las nuevas celdas de encabezado en el thead
                    const headerRow = groupStageTable.querySelector('thead tr');

                    // Crear y agregar las nuevas celdas de encabezado
                    const headerLabels = ["P", "W", "D", "L", "GD", "Pts"];
                    headerLabels.forEach(label => {
                    const th = document.createElement('th');
                    th.classList.add('tableTeamStats');
                    const bold = document.createElement('b');
                    bold.textContent = label;
                    th.appendChild(bold);
                    headerRow.appendChild(th);
                    });

                    // Asegurarse de que todas las filas del tbody tengan la misma cantidad de celdas que el thead
                    tbodyRows.forEach(row => {
                    for (let i = 0; i < headerRow.cells.length - 1; i++) {
                    const td = document.createElement('td');
                    // td.classList.add('');
                    row.appendChild(td);
                    }
                    });

                    let groupStageTeamNames = groupStageTable.querySelectorAll('.GSTeamName')
                    let groupStageTeamImgs = groupStageTable.querySelectorAll('.teamsImgs')
                    GSFixture = GSFixtures[i]
                    let fixtureTables = GSFixture.querySelectorAll('table');
                    let fixtureIdx = 0
                    let idx = 0
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
        groupStageTable.classList.remove('hide')
        groupStageTable.classList.add('group-active')
        GSFixture = GSFixtures[0];
        GSFixture.classList.remove('hide');
        i++;
    }
        el.addEventListener("click", e => {
            e.preventDefault();
            
            groupStageTables[0].classList.add('hide');
            groupStageTable.classList.add('hide')
            groupSpacing.classList.add('hide')
            GSFixture.classList.add('hide');
            topScorers.classList.add('hide');
            let active = document.querySelector(".tabs li.active")
            if (active) {
                active.classList.remove('active');
            }

            const parentListItem = el.parentElement;
            parentListItem.classList.add("active");
            const dataIndex = parentListItem.getAttribute('data-index');
            if (dataIndex === '4') {
                topScorers.classList.remove('hide');
            } else {
                groupStageTable = groupStageTables[dataIndex];
                groupSpacing = groupSpacings[dataIndex];
                groupSpacing.classList.remove('hide');
                groupStageTable.classList.remove('hide')
                groupStageTable.classList.add('group-active')
                GSFixture = GSFixtures[dataIndex];
                GSFixture.classList.remove('hide');
    }
        })}

        let clickCount = 0;
    simulateMatchdayBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        clickCount++;

        const homeTeamsIndex = [0, 3, 6, 9].map(x => x + clickCount - 1 % 6);

        simulateMatchdayBtn.textContent = `Simulate Matchday ${clickCount + 1}`;
        
        const teams = homeTeamsIndex.flatMap(index => {
            const match = GSTableMatches[index];
            return [...match.querySelectorAll('.homeTeamName, .awayTeamName')].map(el => el.textContent.trim());
        });

        const homeTeams = teams.filter((_, i) => i % 2 === 0);
        const awayTeams = teams.filter((_, i) => i % 2 === 1);

        const extendedHomeTeamsIndex = homeTeamsIndex.flatMap(index => [index, index]);

        let homeTeamWinChance;
        let awayTeamWinChance;
        let ratingDifference;
        for (let i = 0; i < homeTeams.length; i++) {
            const homeTeam = homeTeams[i].trim();
            const awayTeam = awayTeams[i].trim();
            
            const homeTeamInfo = allTeams.find(team => team.Team === homeTeam);
            const awayTeamInfo = allTeams.find(team => team.Team === awayTeam);
            const homeTeamRating = homeTeamInfo.TeamRating
            const awayTeamRating = awayTeamInfo.TeamRating
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

            let result = determineResult(homeTeamWinChance, ratingDifference)
            // console.log(result)
            let nGoals = generateNumbersGoals(result)
            let gDifference = generateGoalDifference(ratingDifference, nGoals)

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
                    let goalScorer = homeTeamGoalScorers[i].player.LastName !== '' ? homeTeamGoalScorers[i].player.LastName : homeTeamGoalScorers[i].player.FirstName;
                    let goalMinute = homeTeamGoalMinutes[i];
                    let html = `<p class="home"><span class="goalMinute">${goalMinute}' </span>  ${goalScorer}`;
                    if (homeTeamGoalScorers[i].isPenalty) {
                        html += " (p)";
                    }
                    html += '</p>'
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
                    let goalScorer = awayTeamGoalScorers[i].player.LastName !== '' ? awayTeamGoalScorers[i].player.LastName : awayTeamGoalScorers[i].player.FirstName;
                    let goalMinute = awayTeamGoalMinutes[i];
                    let html = `<p class="away"><span class="goalMinute">${goalMinute}'  </span> ${goalScorer}`;
                    if (awayTeamGoalScorers[i].isPenalty) {
                        html += " (p)";
                    }
                    html += '</p>'
                    detailsElement.innerHTML += html;
                }
            }
            
            updateScores(homeTeamRow, '#matchesPlayed', 1);
            updateScores(awayTeamRow, '#matchesPlayed', 1);
            
            
            const detailsElementDiv = currentRow.parentNode.querySelector('.details');
            if (!detailsElementDiv) {
                currentRow.parentNode.insertBefore(detailsElement, currentRow.nextSibling);
            } 
            
            currentRow.classList.add('done')

            for (const GSTable of groupStageTables) {
                sortTable(GSTable)
            }
        }

        updateGoalScorers(topScorersList);

        if (clickCount === 3) {
            simulateMatchdayBtn.classList.add('hide');
            continueToKOBtn.classList.remove('hide');

            groupStageTables.forEach(table => {
                const [team1, team2] = [...table.querySelectorAll('.GSTeamName')].map(el => el.textContent);
                qualifiedToQF.push(team1, team2);
            });
        }
    })

    const fixtureRows = document.querySelectorAll('.fixtureRow');


    fixtureRows.forEach(row => {
    row.addEventListener('click', () => {
        const currentRow = row;

        // Seleccionar el elemento que contiene los detalles adicionales (estadio, capacidad, goles)
        const detailsElement = currentRow.parentNode.querySelector('.details');
        
        // Verificar si el elemento de detalles existe
        if (detailsElement) {
            // Toggle la clase 'show' para expandir o contraer el elemento de detalles
            // detailsElement.classList.toggle('hide');
            detailsElement.classList.toggle('show')
            detailsElement.classList.toggle('hide')
        }

        });
    });

    continueToKOBtn.addEventListener('click', (e) => {
        e.preventDefault()

        if (KORound === 0) {
            KORound++;

            // startDrawBtn.classList.remove('hide');
            // fastDrawBtn.classList.remove('hide');
            // topScorers.classList.add('hide');

            const QFTeamNames = document.querySelectorAll('#QFTeamName');
            const QFTeamImgs = document.querySelectorAll('#QFTeamsImgs');
            QFFixtureIdx = 0;

            for (let matchup of QFMatchups) {
                const homeTeam = qualifiedToQF[matchup[0]];
                const awayTeam = qualifiedToQF[matchup[1]];

                const normalizedHomeTeam = normalizeTeamName(homeTeam);
                const normalizedAwayTeam = normalizeTeamName(awayTeam);

                QFTeamNames[QFFixtureIdx].innerText = homeTeam;
                QFTeamNames[QFFixtureIdx + 1].innerText = awayTeam;
                QFTeamImgs[QFFixtureIdx].src = `images/${normalizedHomeTeam.replace(/\s+/g, '')}.png`;
                QFTeamImgs[QFFixtureIdx + 1].src = `images/${normalizedAwayTeam.replace(/\s+/g, '')}.png`;
                
                QFFixtureIdx += 2;
            }

            tabsContainer.classList.add('hide');
            continueToKOBtn.classList.add('hide');
            hideTablesExcept(false, groupStageTables);
            hideTablesExcept(false, GSTableMatches);
            QFMatches.classList.remove('hide');
            showTables(QFMatchesSect);
            groupSpacing.classList.add('hide')
            tabsContainerKO.classList.remove('hide');
            simulateKOBtn.classList.remove('hide');

            tabLinksKO.forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    hideTablesExcept(false, groupStageTables);
                    GSTables.classList.add('hide');

                    document.querySelector("#tabsKO li.active")?.classList.remove('active');
                    el.parentElement.classList.add("active");
            
                    const dataIndex = el.parentElement.getAttribute('data-index');
                    const matchesTable = document.querySelector('.activeTable');
                    matchesTable.classList.toggle('hide', dataIndex !== '0');
                    topScorers.classList.toggle('hide', dataIndex !== '1');
                });
            });

            
            simulateKOBtn.addEventListener('click', async (e) => {
                e.preventDefault();

                const fixtureIdx = KORound === 1 ? 
                    [12, 12, 13, 13] :
                    KORound === 2 ? [14, 14] : [15];
                
                const uniqueFixtureIdx = [...new Set(fixtureIdx)];

                const homeTeams = [];
                const awayTeams = [];
                const extractTeams = table => {
                    const rows = table.querySelectorAll('tbody.groupMatches tr');
                    rows.forEach(row => {
                      homeTeams.push(row.querySelector('.homeTeam .homeTeamName').textContent.trim());
                      awayTeams.push(row.querySelector('.awayTeam .awayTeamName').textContent.trim());
                    });
                  };
                  
                uniqueFixtureIdx.forEach(index => GSTableMatches[index] && extractTeams(GSTableMatches[index]));
                
                let homeTeamWinChance;
                let awayTeamWinChance;
                let ratingDifference;

                for (let i = 0; i < homeTeams.length; i++) {
                    
                    let winMethod;
                    const homeTeam = homeTeams[i];
                    const awayTeam = awayTeams[i];
                    
                    const homeTeamInfo = allTeams.find(team => team.Team === homeTeam);
                    const awayTeamInfo = allTeams.find(team => team.Team === awayTeam);
                    const homeTeamRating = homeTeamInfo.TeamRating
                    const awayTeamRating = awayTeamInfo.TeamRating
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
    
                    let result = determineResult(homeTeamWinChance, ratingDifference)
                    // console.log(result)
                    let nGoals = generateNumbersGoals(result)
                    let gDifference = generateGoalDifference(ratingDifference, nGoals)
    
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
                            } while (homeTeamGoal && !homeTeamGoal.goalMinutes) {
                                homeTeamGoal = determineGoalScorers(homeTeamInfo, homeTeamGoals);
                            }
                            homeTeamGoal = sumObjects(ETGoalScorers, homeTeamGoal)
                        } else {
                            let ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, true);
                            while (!ETGoalScorers.goalMinutes) {
                                ETGoalScorers = determineGoalScorers(awayTeamInfo, nGoals, true);
                            } while (awayTeamGoal && !awayTeamGoal.goalMinutes) {
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
                            let goalScorer = homeTeamGoalScorers[i].player.LastName !== '' ? homeTeamGoalScorers[i].player.LastName : homeTeamGoalScorers[i].player.FirstName;
                            let goalMinute = homeTeamGoalMinutes[i];
                            let html = `<p class="home"><span class="goalMinute">${goalMinute}' </span>  ${goalScorer}`;
                            if (homeTeamGoalScorers[i].isPenalty) {
                                html += " (p)";
                            }
                            html += '</p>'
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
                            let goalScorer = awayTeamGoalScorers[i].player.LastName !== '' ? awayTeamGoalScorers[i].player.LastName : awayTeamGoalScorers[i].player.FirstName;
                            let goalMinute = awayTeamGoalMinutes[i];
                            let html = `<p class="away"><span class="goalMinute">${goalMinute}'  </span> ${goalScorer}`;
                            if (awayTeamGoalScorers[i].isPenalty) {
                                html += " (p)";
                            }
                            html += '</p>'
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
                    
                    currentRow.classList.add('done')
                    

                    updateGoalScorers(topScorersList);

                    simulateKOBtn.classList.add('hide');
                    continueToKOBtn.classList.remove('hide');
                    if (KORound === 1) {
                        continueToKOBtn.innerText = 'Continue to Semi Finals'
                    } else if (KORound === 2) {
                        continueToKOBtn.innerText = 'Continue to Final'
                    }
                                        
                    if (qualifiedToF.length > 0) {
                        simulateKOBtn.innerText = 'Simulate Final'
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

                    if (KORound === 3 && clickCount > 0) {
                        const winnerText = document.querySelector('.winner');

                        if (result === 'Home Team') {
                            winnerText.innerText = `${homeTeam} wins the EURO!!!`;
                        } else {
                            winnerText.innerText = `${awayTeam} wins the EURO!!!`;
                        }
                        
                        const jsConfetti = new JSConfetti();

                        jsConfetti.addConfetti().then(() => jsConfetti.addConfetti())

                        continueToKOBtn.classList.add('hide');
                    }
                }
            })
        } else if (KORound > 0) {
            continueToKOBtn.classList.add('hide');
            hideTablesExcept(false, GSTableMatches);
            groupSpacing.classList.add('hide');

            GSTableMatches.forEach((match, index) => {
                if (index >= 22 && index <= 23) {
                    match.classList.remove('hide');
                }
            });

            potIndex = 0;


            if (KORound === 1) {
                QFMatchesTable.classList.remove('activeTable');
                SFMatchesTable.classList.add('activeTable');

                SFMatchesTable.classList.remove('hide');
                continueToKOBtn.classList.add('hide');
                hideTablesExcept(false, GSTableMatches);
                groupSpacing.classList.add('hide');
            
                GSTableMatches[14].classList.remove('hide');
                
                const SFTeamNames = document.querySelectorAll('#SFTeamName');
                const SFTeamImgs = document.querySelectorAll('#SFTeamsImgs');

                populateKnockoutStage(SFTeamNames, SFTeamImgs, qualifiedToSF, 2);
            } else if (KORound === 2) {
                SFMatchesTable.classList.remove('activeTable');
                finalMatchesTable.classList.add('activeTable');

                finalMatchesTable.classList.remove('hide');
                continueToKOBtn.classList.add('hide');
                simulateKOBtn.classList.remove('hide');

                hideTablesExcept(false, GSTableMatches);
                groupSpacing.classList.add('hide')

                GSTableMatches[15].classList.remove('hide');


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
                teamImgsElements[fixtureIdx].src = `images/${normalizedTeam.replace(/\s+/g, '')}.png`;
        
                fixtureIdx ++;
            }
        
            simulateKOBtn.classList.remove('hide');
            tabsContainerKO.classList.remove('hide');
            KORound++;
        }
    })

    })
});