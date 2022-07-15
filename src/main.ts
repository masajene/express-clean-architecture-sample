import bodyParser from 'body-parser'
import router from './infra/router/router'

/* eslint import/newline-after-import: "off" */
;(async () => {
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())
  router.listen(4000, () => console.log('Running on server'))
})()
