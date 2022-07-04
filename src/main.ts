import router from './infra/router/router'
import bodyParser from 'body-parser'
import { MySQLDataSource } from './infra/database/mysql_datasource'
;(async () => {
  await MySQLDataSource.initialize()
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())
  router.listen(4000, () => console.log('Running on server'))
})()
