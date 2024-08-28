import fs from 'node:fs';

import rc from 'rc';
const prefix = 'ionos';

function translate (key, obj) {
  if (!key.startsWith(`${prefix}_`)) return;

  let cursor = obj;
  const keys = key.substring(prefix.length + 1).split('__');
  const length = keys.length - 1;

  for (let i = 0; i < length; ++i) {
    const key = keys[i];
    if (!cursor[key]) {
      return false;
    }

    cursor = cursor[key];
  }

  if (typeof cursor === 'object') {
    const lastKey = keys.pop();
    cursor[lastKey] = Object.values(cursor[lastKey]);
  }

  return true;
}

const config = rc(prefix, {
  s3: {
        "bucket": "",
        "endPoint": "s3.eu-central-3.ionoscloud.com",
        "region": "eu-central-3",
        "port": 443,
        "useSSL": true,
        "accessKey": "",
        "secretKey": ""

  }
});

if (config.translate) {
  if (typeof config.translate === 'string') {
    translate(config.translate, config);
  } else if (typeof config.translate === 'object') {
    Object.values(config.translate).forEach((value) =>
      translate(value, config)
    );
  }
}
export default config;
