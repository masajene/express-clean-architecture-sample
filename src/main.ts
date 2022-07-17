import router from './infra/router/router'

/* eslint import/newline-after-import: "off" */
;(async () => {
  router.listen(4000, () => console.log('Running on server'))
})()
