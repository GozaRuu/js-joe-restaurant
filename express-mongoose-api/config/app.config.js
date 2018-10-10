if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

module.exports = {
	port : process.env.PORT || '3000',
	secret : process.env.SECRET || '12345',
	mongoUrl : process.env.MONGO_URL || 'mongodb://localhost:27017/jsjoe'
};
