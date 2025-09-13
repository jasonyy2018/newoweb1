# Docker安装和使用指南

本指南将帮助您在Windows系统上安装和配置Docker，以便运行上海葳澄信息科技有限公司网站。

## 目录
1. [系统要求](#系统要求)
2. [安装Docker Desktop](#安装docker-desktop)
3. [验证安装](#验证安装)
4. [构建和运行项目](#构建和运行项目)
5. [常用Docker命令](#常用docker命令)
6. [故障排除](#故障排除)

## 系统要求

### Windows 10/11 (64位)
- Windows 10 Pro, Enterprise, 或 Education (Build 15063 或更高版本)
- Windows 11 Pro, Enterprise, 或 Education
- 启用Hyper-V和容器功能
- BIOS中启用虚拟化

### Windows 10 Home
- Windows 10 Home (Build 19018 或更高版本)
- 需要安装WSL 2 (Windows Subsystem for Linux)

## 安装Docker Desktop

### 方法一：直接下载安装 (推荐)

1. 访问Docker官网下载页面：
   https://docs.docker.com/desktop/install/windows-install/

2. 下载Docker Desktop for Windows安装程序

3. 双击下载的安装文件开始安装

4. 按照安装向导完成安装过程

5. 安装完成后，系统会提示您需要注销并重新登录

### 方法二：使用包管理器安装

如果您使用的是Windows 10/11 Pro或Enterprise版本，可以使用包管理器安装：

```powershell
# 使用winget (Windows 10/11内置)
winget install Docker.DockerDesktop

# 或使用Chocolatey (需要先安装Chocolatey)
choco install docker-desktop
```

## 配置Docker Desktop

1. 启动Docker Desktop应用

2. 在系统托盘中等待Docker图标变为稳定状态（不再有动画）

3. 点击Docker图标，选择"Settings"

4. 在"General"选项卡中，确保以下选项被选中：
   - Use the WSL 2 based engine
   - Start Docker Desktop when you log in

5. 在"Resources"选项卡中，根据您的系统配置调整：
   - CPUs: 至少2个核心
   - Memory: 至少4GB
   - Swap: 1GB

6. 在"Shared Drives"选项卡中，选择包含项目文件的驱动器

## 验证安装

打开PowerShell或命令提示符，运行以下命令：

```powershell
# 检查Docker版本
docker --version

# 检查Docker Compose版本
docker compose version

# 运行测试容器
docker run hello-world
```

如果安装成功，您应该看到相应的版本信息和"Hello from Docker!"消息。

## 构建和运行项目

### 1. 克隆或复制项目文件
确保项目文件位于您选择的目录中，例如：
```
C:\Users\YourUsername\Documents\projects\newoweb1
```

### 2. 初始化数据库
在项目根目录下运行数据库初始化脚本：

```powershell
cd C:\Users\YourUsername\Documents\projects\newoweb1
python database.py
```

### 3. 构建Docker镜像
在项目根目录下打开PowerShell或命令提示符：

```powershell
cd C:\Users\YourUsername\Documents\projects\newoweb1
docker compose build
```

### 4. 启动服务
```powershell
docker compose up -d
```

### 5. 访问应用
在浏览器中访问：
- http://localhost (通过Nginx)
- http://localhost:5001 (直接访问Flask应用)

### 6. 查看日志
```powershell
# 查看所有服务日志
docker compose logs -f

# 查看特定服务日志
docker compose logs -f web
docker compose logs -f nginx
docker compose logs -f redis
```

### 7. 停止服务
```powershell
docker compose down
```

## 常用Docker命令

### Docker Compose命令
```powershell
# 构建服务
docker compose build

# 启动服务（后台运行）
docker compose up -d

# 停止服务
docker compose down

# 查看运行中的服务
docker compose ps

# 查看服务日志
docker compose logs

# 重新启动服务
docker compose restart

# 执行容器内的命令
docker compose exec web python auto_geo_optimizer.py
```

### Docker命令
```powershell
# 查看所有容器
docker ps -a

# 查看镜像
docker images

# 删除停止的容器
docker container prune

# 删除未使用的镜像
docker image prune

# 查看磁盘使用情况
docker system df
```

## 项目架构说明

本项目使用Docker Compose配置了三个服务：

1. **web**: Flask应用服务
   - 使用Gunicorn作为WSGI服务器
   - 包含健康检查
   - 连接到Redis缓存

2. **nginx**: Nginx反向代理
   - 处理静态文件服务
   - 将动态请求代理到Flask应用
   - 提供更好的性能和安全性

3. **redis**: Redis缓存服务
   - 提供缓存功能
   - 存储会话数据

## 数据持久化

项目使用Docker卷来持久化数据：

- `data`: SQLite数据库文件目录
- `logs`: 应用日志文件目录
- `redis-data`: Redis数据卷

这些数据在容器停止或删除后仍然保留。

## 环境变量

项目支持以下环境变量：

- `FLASK_ENV`: Flask环境 (production/development)
- `FLASK_APP`: Flask应用入口点
- `SECRET_KEY`: Flask密钥
- `REDIS_URL`: Redis连接URL

## 故障排除

### 常见问题

1. **Docker Desktop无法启动**
   - 确保启用了Hyper-V和容器功能
   - 检查BIOS中是否启用了虚拟化
   - 重启计算机后再次尝试

2. **端口被占用**
   - 检查是否有其他服务占用了80或5001端口
   - 修改docker-compose.yml中的端口映射

3. **权限问题**
   - 确保共享驱动器已正确配置
   - 以管理员身份运行Docker Desktop

4. **构建失败**
   - 检查网络连接
   - 确保requirements.txt中的包名和版本正确

5. **服务无法访问**
   - 检查容器是否正常运行：`docker compose ps`
   - 查看日志：`docker compose logs`
   - 确认端口映射正确

### 重置Docker环境

如果遇到持续问题，可以重置Docker环境：

1. 在Docker Desktop中，进入"Troubleshoot"选项卡
2. 点击"Reset to factory defaults"
3. 重新启动Docker Desktop

### 清理Docker资源

定期清理未使用的资源以释放磁盘空间：

```powershell
# 清理所有未使用的资源
docker system prune -a

# 清理未使用的卷
docker volume prune

# 清理未使用的网络
docker network prune
```

## 性能优化建议

1. **资源分配**
   - 根据项目需求调整Docker Desktop的CPU和内存分配
   - 对于生产环境，建议至少4GB内存

2. **镜像优化**
   - 使用多阶段构建减小镜像大小
   - 定期更新基础镜像

3. **缓存利用**
   - 利用Docker的的层缓存机制
   - 合理安排Dockerfile中的指令顺序

4. **日志管理**
   - 配置日志轮转防止磁盘空间耗尽
   - 定期清理旧日志

## 安全建议

1. **镜像安全**
   - 使用官方基础镜像
   - 定期扫描镜像漏洞
   - 不在镜像中存储敏感信息

2. **网络安全**
   - 限制容器间的网络访问
   - 使用网络安全组

3. **文件权限**
   - 避免以root用户运行应用
   - 设置适当的文件和目录权限

## 进一步学习资源

- Docker官方文档: https://docs.docker.com/
- Docker Compose文档: https://docs.docker.com/compose/
- Docker最佳实践: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

如有任何问题，请联系项目维护者：
- 邮箱: jyu@wisdomitc.com
- 电话: +86-18964673689