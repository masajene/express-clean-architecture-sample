import bodyParser from 'body-parser'
import router from './infra/router/router'
import { MySQLDataSource } from './infra/database/mysql_datasource'

/* eslint import/newline-after-import: "off" */
;(async () => {
  const db = new MySQLDataSource()
  await db.datasource().initialize()

  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())
  // eslint-disable-next-line no-console
  router.listen(4000, () => console.log('Running on server'))
})()
