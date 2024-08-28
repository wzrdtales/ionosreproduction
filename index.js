import { Client as MClient } from 'minio';
import config from './config.js';
import fs from 'fs'

const {s3} = config;

console.log('using config', s3)

const mc = new MClient(s3)

const file = fs.createReadStream('./testfile.txt', 'utf8')

const n = await mc.putObject(s3.bucket, 'testfile.txt', file)
console.log('uploaded file', n)


const stream = await mc.getObject(s3.bucket, 'testfile.txt');
const fourbytes = stream.read(4);

if(fourbytes === null) {
  console.log('BROKEN!')
  console.log('this must return the first four bytes, if it returns null, the s3 implementation is broken', fourbytes);
  console.log('BROKEN!')
} else {
  console.log('WORKING!')
  console.log('this must return the first four bytes, if it returns null, the s3 implementation is broken', fourbytes);
  console.log('WORKING!')
}
