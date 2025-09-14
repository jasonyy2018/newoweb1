# Docker部署修复指南

## 问题诊断

原始问题：
1. `sqlite3.OperationalError: no such table: consultations` - 已通过PostgreSQL迁移解决
2. Docker环境404错误 - 已通过路径配置修复解决
3. **新发现问题**：Docker配置缺少PostgreSQL环境变量

## 修复内容

### 1. Docker Compose配置修复

在 `docker-compose.yml` 中添加了PostgreSQL环境变量：

```yaml
environment:
  - FLASK_ENV=production
  - FLASK_APP=app.py
  # PostgreSQL数据库配置
  - POSTGRESQL_HOST=156.238.249.149
  - POSTGRESQL_PORT=5432
  - POSTGRESQL_DATABASE=aiow
  - POSTGRESQL_USER=aiow
  - POSTGRESQL_PASSWORD=EZH3HPYzy3QNGTEz
  # Redis连接信息
  - REDIS_URL=redis://redis_C7DGKB@156.238.249.149:6379/0
```

### 2. 应用配置修复

修改 `app.py` 中的数据库配置，优先使用环境变量：

```python
# PostgreSQL数据库配置 - 优先使用环境变量
app.config['POSTGRESQL'] = {
    'host': os.environ.get('POSTGRESQL_HOST', '156.238.249.149'),
    'port': int(os.environ.get('POSTGRESQL_PORT', 5432)),
    'database': os.environ.get('POSTGRESQL_DATABASE', 'aiow'),
    'user': os.environ.get('POSTGRESQL_USER', 'aiow'),
    'password': os.environ.get('POSTGRESQL_PASSWORD', 'EZH3HPYzy3QNGTEz')
}
```

## 部署步骤

### 1. 构建和启动

```bash
# 停止现有容器
docker-compose down

# 重新构建镜像
docker-compose build --no-cache

# 启动服务
docker-compose up -d
```

### 2. 验证部署

```bash
# 检查容器状态
docker-compose ps

# 查看应用日志
docker-compose logs web

# 测试健康检查
curl http://localhost:5001/health
```

### 3. 访问应用

- **直接访问**: http://localhost:5001
- **通过Nginx**: http://localhost:8090
- **HTTPS**: https://localhost:8091 (如果配置了SSL)

## 数据库连接验证

使用提供的测试脚本验证数据库连接：

```bash
python test_docker_db.py
```

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查PostgreSQL服务器是否可访问
   - 验证环境变量配置
   - 检查防火墙设置

2. **404错误**
   - 确认静态文件和模板文件路径正确
   - 检查容器内文件权限

3. **Redis连接问题**
   - 验证Redis服务器连接
   - 检查REDIS_URL环境变量

### 日志查看

```bash
# 查看应用日志
docker-compose logs -f web

# 查看Nginx日志
docker-compose logs -f nginx

# 查看所有服务日志
docker-compose logs -f
```

## 生产环境建议

1. **安全性**
   - 使用Docker secrets管理敏感信息
   - 配置SSL证书
   - 设置防火墙规则

2. **性能优化**
   - 调整Gunicorn worker数量
   - 配置Nginx缓存
   - 使用Redis缓存

3. **监控**
   - 配置健康检查
   - 设置日志轮转
   - 监控资源使用

## 完成状态

✅ SQLite到PostgreSQL迁移完成
✅ Docker配置修复完成
✅ 环境变量配置完成
✅ 数据库连接测试通过
✅ 应用路径配置修复
✅ 生产环境部署就绪

现在Docker部署应该能够正常工作，不再出现数据库连接错误或404问题。