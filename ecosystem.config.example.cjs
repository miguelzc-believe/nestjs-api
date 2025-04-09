module.exports = {
  apps: [
    {
      name: 'nestjs-api',
      script: 'npm run start:prod', // Usa el archivo compilado de NestJS
      instances: 1, // Cambia a 'max' para usar todos los núcleos disponibles
      exec_mode: 'fork', // Modo cluster para aprovechar múltiples núcleos
      watch: false, // Desactiva watch en producción
      autorestart: true, // Reinicia automáticamente si falla
      max_memory_restart: '512M', // Reinicia si usa más de 512 MB de memoria
    },
  ],
};
