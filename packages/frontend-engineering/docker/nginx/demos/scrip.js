const { $ } = require('zx');

(async () => {
  try {
    // const { stdout } = await $`docker ps`;
    // console.log('stdout: ', stdout);
    // await $` docker run -d  -p 80:80 --rm  --name nginx nginx`;

    // await $`docker cp /Users/laiguolin/Workspace/notebook/nodejs/docs-dist/  nginx:/usr/share/nginx/html`;
    await $`docker cp /Users/laiguolin/Workspace/notebook/nodejs/nginx.conf  nginx:/etc/nginx/nginx.conf`;
    await $`docker exec -it  nginx nginx -s reload`;
    await $`docker exec -it nginx cat /etc/nginx/nginx.conf`;
  } catch (error) {
    console.log('error: ', error);
  }
})();
