if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

module.exports = {
	port : process.env.PORT || '3000',
	secret : process.env.SECRET || '12345',
	mongoUrl : process.env.MONGO_URL || 'mongodb://localhost:27017/jsjoe',
	corsWhitelist : ['http://localhost:3000', 'https://localhost:3443', 'https://localhost:3001'],
	github: {
		clientId: process.env.GITHUB_CLIENT_ID || '',
		clientSecret: process.env.CLIENT_SECRET || ''
	}
};
