const fs = require('fs');
const csv = require('csv-parser');

const inputFile = '50k.csv';
const outputFile = 'output.json';

const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const daysOfWeekEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function parseSession(session) {
    if (session === 'Repos') {
        return { duration: null, type: 'Repos', interval: null, difficulty: null };
    }

    const parts = session.split(" / ").map(part => part.trim());

    let duration = null;
    let difficulty = null;
    let type = null;
    let interval = null;

    if (parts.length >= 3) {
        duration = parseInt(parts[0].replace("’", ""), 10);
        difficulty = parts[1].replace("Diff. ", "");

        type = parts[2];
        if (parts.length === 4) {
            interval = parts[3];
        }
    } else if (parts.length === 2) {
        duration = parseInt(parts[0].replace("’", ""), 10);
        type = parts[1];
    }

    return { duration, type, interval, difficulty };
}

const results = [];
fs.createReadStream(inputFile)
    .pipe(csv({ headers: false }))
    .on('data', (row) => {
        const weekLabel = Object.values(row)[0];
        const weekNumber = parseInt(weekLabel.replace("SEM ", ""), 10);

        if (!isNaN(weekNumber)) {
            const days = daysOfWeek.map((day, index) => {
                const session = row[index + 1] || "Repos";
                const parsedSession = parseSession(session);

                return {
                    day: daysOfWeekEn[index],
                    ...parsedSession
                };
            });

            results.push({ week: weekNumber, days });
        }
    })
    .on('end', () => {
        fs.writeFile(outputFile, JSON.stringify(results, null, 2), (err) => {
            if (err) throw err;
            console.log(`Data written to ${outputFile}`);
        });
    });
