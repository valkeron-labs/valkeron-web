module.exports = {
  apps: [
    {
      name: 'valkeron-web',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/zetoniak/code/valkeron-web',
      env: {
        PORT: 3002,
        NODE_ENV: 'production',
      },
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
};
