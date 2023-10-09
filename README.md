# Instructions & Project Details

# Prtrolium_Report Generator(task assesement of Young Innovation PVT LTD).
YIPL-INTERN-PETROLEUM-REPORT is the is a RESTful API application that allows users to:
1.List the total sale of each petroleum.
2.List the top 3 countries that have the highest and lowest total sales till date.
3.List average sale of each petroleum product in range of 4 years(2007-2010 & 2011-2014) of interval. Note: Do not count zero sale during average calulation


## Prerequisites
Before running the application locally, ensure you have the following dependencies installed:

- Node.js
- npm
- Any SQL database

# Clone the repository
https://bitbucket.org/orion002/yipl-intern-petroleum-report/src/master/

# Navigate to the project directory
cd yipl-intern-petroleum-report

# Install project dependencies
npm install

# Configure .env file
# Add necessary environment variables & including database connection details.

# Run database migrations
npx sequelize db:migrate

# Seed the database with initial data
npx sequelize db:seed:all

Note: These migration & seeders are normalized & model definition from response of provided task api end point:
https://raw.githubusercontent.com/younginnovations/internsh

# Build and watch for changes
npm run build:watch

# Start the server with automatic restart on code changes
npm run start:watch

# Swagger Documentation:
localhost:port/swagger
