# Gunicorn配置文件
bind = "0.0.0.0:5001"
workers = 3
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
max_requests = 1000
max_requests_jitter = 100
preload_app = True
reload = False

# 日志配置
accesslog = "/app/logs/access.log"
errorlog = "/app/logs/error.log"
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# 进程配置
daemon = False
pidfile = "/app/logs/gunicorn.pid"
user = None
group = None
tmp_upload_dir = None

# 性能配置
worker_tmp_dir = "/dev/shm"