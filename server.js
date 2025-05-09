const app = require('./src/app');
const { PORT } = require('./src/config/env');
const db = require('./src/config/db');

if (db) {
	db.sync().then(() => {
		app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
	});
}