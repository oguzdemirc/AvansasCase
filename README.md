system requirent

postgresql
nodejs


then run this commands
touch .env
# write like .env.example your envs

npm install
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm run start
