import * as io from 'socket.io-client';
import { v4 } from 'uuid';
import axios from 'axios';

const token = v4();

console.info(new Date().toISOString(), `start the request`);

axios
  .get(`http://localhost:3333/api?token=${token}`)
  .then((resp) => {
    console.info(new Date().toISOString(), `got ${resp.data.length} resords`);
    process.exit(0);
  })
  .catch((e) => {
    console.info(e);
    process.exit(0);
  });

const ioClient = io.connect('ws://localhost:3333');
ioClient.on(`progress-${token}`, (progress) =>
  console.info(new Date().toISOString(), `processed ${progress}%`)
);
