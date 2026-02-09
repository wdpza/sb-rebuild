module.exports = {
  apps: [{
    name: 'starbright',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/production',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '127.0.0.1'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    
    // Auto-restart on file changes (optional for production)
    watch: false,
    
    // Restart on crashes
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
}