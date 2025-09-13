# Docker版本部署指南

## 项目概述

本项目是一个基于Flask的网站，展示上海葳澄信息科技有限公司的人工智能解决方案。项目已完全Docker化，包含以下服务：

1. **Web服务** - 基于Flask和Gunicorn的Python应用
2. **Redis服务** - 用于缓存和会话存储
3. **Nginx服务** - 反向代理和静态文件服务

## 系统要求

- Docker 20.10+
- Docker Compose 1.29+
- 至少4GB可用内存

## 项目结构

```
.
├── Dockerfile              # Web服务Docker配置
├── docker-compose.yml      # 多服务编排配置
├── nginx.conf             # Nginx配置文件
├── .dockerignore          # Docker构建忽略文件
├── app.py                 # Flask应用主文件
├── requirements.txt       # Python依赖
├── static/                # 静态资源文件
├── templates/             # HTML模板文件
├── data/                  # 数据文件（数据库）
└── logs/                  # 日志文件
```

## 部署步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd newoweb1
```

### 2. 构建和启动服务

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps
```

### 3. 访问应用

- 主网站: http://localhost
- 直接访问Flask应用: http://localhost:5001
- 健康检查: http://localhost/health

### 4. 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f web
docker-compose logs -f nginx
docker-compose logs -f redis
```

### 5. 停止服务

```bash
# 停止所有服务
docker-compose down

# 停止并删除数据卷
docker-compose down -v
```

## 服务详情

### Web服务 (Flask + Gunicorn)

- **镜像**: 基于python:3.9-slim构建
- **端口**: 5001 (内部)
- **工作目录**: /app
- **用户**: appuser (非root用户)
- **健康检查**: 通过`/health`端点

### Redis服务

- **镜像**: redis:alpine
- **端口**: 6379 (内部)
- **数据持久化**: 使用命名卷redis-data

### Nginx服务

- **镜像**: nginx:alpine
- **端口**: 80 (HTTP), 443 (HTTPS)
- **静态文件**: 直接由Nginx提供服务
- **反向代理**: 将动态请求代理到Flask应用

## 配置说明

### 环境变量

Web服务支持以下环境变量：

- `FLASK_ENV`: 运行环境 (production/development)
- `FLASK_APP`: 应用入口文件
- `SECRET_KEY`: Flask密钥
- `REDIS_URL`: Redis连接URL

### 数据持久化

- **数据库**: `data/consultations.db` 挂载到容器
- **日志**: `logs/` 目录挂载到容器
- **Redis数据**: 使用Docker卷持久化

## 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 查看占用端口的进程
   netstat -an | grep :80
   netstat -an | grep :5001
   
   # 停止占用端口的进程或更改端口映射
   ```

2. **容器无法启动**
   ```bash
   # 查看详细日志
   docker-compose logs web
   docker-compose logs nginx
   ```

3. **健康检查失败**
   ```bash
   # 检查服务是否正常运行
   curl http://localhost/health
   ```

4. **静态文件无法加载**
   ```bash
   # 检查Nginx配置和文件权限
   docker-compose exec nginx nginx -t
   ```

### 重建镜像

如果需要重新构建镜像：

```bash
# 重建所有服务
docker-compose build

# 重建特定服务
docker-compose build web
```

## 性能优化

### 资源限制

在`docker-compose.yml`中可以配置资源限制：

```yaml
web:
  deploy:
    resources:
      limits:
        memory: 512M
        cpus: '0.5'
```

### 扩展服务

可以增加Gunicorn工作进程数：

```bash
# 在Dockerfile中修改CMD
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "--workers", "4", "--chdir", "/app", "app:app"]
```

## 安全建议

1. **使用非root用户运行容器**
2. **定期更新基础镜像**
3. **限制容器资源使用**
4. **配置HTTPS证书**
5. **定期备份数据卷**

## 备份和恢复

### 备份数据

```bash
# 备份数据库
cp data/consultations.db consultations_backup.db

# 备份日志
cp -r logs logs_backup
```

### 恢复数据

```bash
# 恢复数据库
cp consultations_backup.db data/consultations.db

# 重启服务使更改生效
docker-compose restart web
```

## 监控和维护

### 监控服务状态

```bash
# 查看容器资源使用情况
docker stats

# 查看容器详细信息
docker-compose ps
```

### 定期维护

1. **清理未使用的镜像**
   ```bash
   docker image prune
   ```

2. **清理未使用的卷**
   ```bash
   docker volume prune
   ```

3. **更新基础镜像**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

## 自定义配置

### 修改端口映射

在`docker-compose.yml`中修改ports配置：

```yaml
nginx:
  ports:
    - "8080:80"    # 将主机8080端口映射到容器80端口
    - "8443:443"   # 将主机8443端口映射到容器443端口
```

### 自定义Nginx配置

修改`nginx.conf`文件以调整反向代理设置、缓存策略等。

### 添加HTTPS支持

1. 准备SSL证书文件
2. 修改`nginx.conf`配置
3. 更新`docker-compose.yml`中的端口映射

## 联系信息

如有任何问题，请联系：
- 邮箱: jyu@wisdomitc.com
- 电话: +86-18964673689