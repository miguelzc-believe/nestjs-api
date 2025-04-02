module.exports = {
  apps: [
    {
      name: 'nestjs-api',
      script: 'dist/src/main.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      time: true,
    },
  ],
};
