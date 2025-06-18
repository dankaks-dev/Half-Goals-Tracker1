const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;
const apiUrl = 'https://v3.football.api-sports.io/fixtures?date=' + new Date().toISOString().split('T')[0];

const headers = {
  'x-apisports-key': apiKey
};

async function fetchMatches() {
  const res = await fetch(apiUrl, { headers });
  const data = await res.json();
  displayMatches(data.response);
}

function displayMatches(matches) {
  const container = document.getElementById('app');
  container.innerHTML = '<h1>Today\'s Matches with Goal Stats</h1>';

  const table = document.createElement('table');
  table.border = '1';
  table.style.width = '100%';
  table.innerHTML = '<tr><th>Match</th><th>Time</th><th>1st Half Goal %</th><th>2nd Half Goal %</th></tr>';

  matches.forEach(match => {
    const row = document.createElement('tr');
    const teams = match.teams.home.name + ' vs ' + match.teams.away.name;
    const time = match.fixture.date.split('T')[1].slice(0, 5);

    // These are placeholders; live goal prediction would require more stats data
    const firstHalfChance = Math.floor(Math.random() * 100);
    const secondHalfChance = 100 - firstHalfChance;

    row.innerHTML = `<td>${teams}</td><td>${time}</td><td>${firstHalfChance}%</td><td>${secondHalfChance}%</td>`;
    table.appendChild(row);
  });

  container.appendChild(table);
}

fetchMatches();
