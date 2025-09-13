# 上海葳澄信息科技有限公司网站

## 项目概述
这是一个基于Flask的网站项目，专注于提供人工智能解决方案。

## 环境要求
- Python 3.9+
- Docker (可选，用于容器化部署)
- Redis (可选，用于缓存功能)

## 本地开发

### 安装依赖
```bash
pip install -r requirements.txt
```

### 运行应用
```bash
python app.py
```

应用将在 `http://localhost:5001` 上运行。

## Docker部署

### 快速开始
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps
```

应用将在以下端口上运行：
- `http://localhost` - 通过Nginx访问（推荐）
- `http://localhost:5001` - 直接访问Flask应用

### 详细部署指南
请查看 [DOCKER_DEPLOYMENT_GUIDE.md](DOCKER_DEPLOYMENT_GUIDE.md) 获取完整的Docker部署说明。

### 常用命令
```bash
# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重建镜像
docker-compose build

# 重启特定服务
docker-compose restart web
```

## 项目结构
- `app.py` - 主应用文件
- `templates/` - HTML模板文件
- `static/` - 静态资源文件（CSS, JS, 图片等）
- `requirements.txt` - Python依赖
- `Dockerfile` - Docker配置文件
- `docker-compose.yml` - Docker Compose配置文件
- `nginx.conf` - Nginx配置文件

## 功能特性
- 多语言支持（中文、英文、日文）
- 响应式设计
- SEO优化和GEO（生成式引擎优化）
- 案例研究展示
- 联系表单
- 管理员咨询查看功能
- Redis缓存支持