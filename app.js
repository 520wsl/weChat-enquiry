//app.js
import { api, apiName } from '/utils/api';
import time from '/utils/time';
import utils from '/utils/utils';
import auth from '/utils/auth';
import configA from '/config';
const config = {
  onLaunch: function () {
    // this.login()
  },
  apiName: apiName,
  time,
  utils,
  CDN: configA.service.imgUrl,
  ...auth,
  ...api
}
// for (var name in api) {
//   config[name] = api[name]
// }
App(config)
