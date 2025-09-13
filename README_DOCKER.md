# Docker 部署说明

本项目支持通过 Docker 进行部署，以下是如何使用 Docker 部署本项目的说明。

## 使用 Docker Compose 部署（推荐）

### 1. 安装 Docker 和 Docker Compose

确保您已经安装了 Docker 和 Docker Compose：
- [Docker 安装指南](https://docs.docker.com/get-docker/)
- [Docker Compose 安装指南](https://docs.docker.com/compose/install/)

### 2. 构建和启动服务

在项目根目录下运行以下命令：

```bash
docker-compose up -d
```

这将：
- 构建 Docker 镜像
- 启动 Flask 应用服务
- 将应用端口映射到主机的 5001 端口

### 3. 访问应用

应用启动后，可以通过以下地址访问：
```
http://localhost:5001
```

### 4. 停止服务

要停止服务，运行：
```bash
docker-compose down
```

## 直接使用 Docker 部署

### 1. 构建镜像

```bash
docker build -t newoweb1 .
```

### 2. 运行容器

```bash
docker run -d -p 5001:5001 --name newoweb1-app newoweb1
```

### 3. 访问应用

```
http://localhost:5001
```

### 4. 停止容器

```bash
docker stop newoweb1-app
```

## 环境变量配置

可以通过环境变量来配置应用：

- `SECRET_KEY`: Flask 应用的密钥
- `FLASK_ENV`: 运行环境 (`production` 或 `development`)
- `HOST`: 应用监听的主机地址 (默认: 0.0.0.0)
- `PORT`: 应用监听的端口 (默认: 5001)

在 docker-compose.yml 中配置环境变量示例：
```yaml
environment:
  - SECRET_KEY=your-secret-key-here
  - FLASK_ENV=production
```

## 数据持久化

为了确保数据库数据在容器重启后不丢失，docker-compose.yml 配置了卷挂载：
```yaml
volumes:
  - ./consultations.db:/app/consultations.db
```

这将把数据库文件挂载到主机目录，确保数据持久化。

## 故障排除

### 查看日志

```bash
docker-compose logs
```

### 进入容器调试

```bash
docker-compose exec web bash
```