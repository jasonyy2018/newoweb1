# 上海葳澄信息科技有限公司网站

AI Solutions for Business

## 项目概述

这是一个展示上海葳澄信息科技有限公司（WSAI）人工智能解决方案的网站。网站采用Flask框架开发，支持多语言（中文、英文、日文），并具有响应式设计，适配各种设备。

## 功能特性

- 响应式设计，适配桌面端和移动端
- 多语言支持（中文、英文、日文）
- AI解决方案展示
- 成功案例展示
- 在线咨询表单
- SEO和GEO优化
- Redis缓存支持
- Nginx反向代理

## 技术栈

- Python 3.8+
- Flask Web框架
- SQLite数据库
- Redis缓存（外部服务器）
- Nginx反向代理
- Jinja2模板引擎
- Tailwind CSS
- Font Awesome图标库
- Three.js 3D图形库

## 项目结构

```
.
├── app.py                 # Flask应用主文件
├── database.py            # 数据库操作模块
├── geo_optimizer.py       # GEO优化器
├── auto_geo_optimizer.py  # 自动GEO优化器
├── requirements.txt       # Python依赖包
├── babel.cfg              # Babel配置文件
├── messages.pot           # 翻译模板文件
├── consultations.db       # SQLite数据库文件
├── Dockerfile             # Docker配置文件
├── docker-compose.yml     # Docker Compose配置文件
├── nginx.conf             # Nginx配置文件
├── .dockerignore          # Docker忽略文件
├── static/                # 静态资源文件夹
│   ├── css/               # CSS样式文件
│   ├── images/            # 图片资源
│   ├── robots.txt         # 搜索引擎爬虫协议
│   └── sitemap.xml        # 网站地图
├── templates/             # HTML模板文件夹
│   ├── about.html         # 关于我们页面
│   ├── contact.html       # 联系我们页面
│   ├── faq.html           # 常见问题页面
│   ├── index.html         # 首页
│   ├── admin_consultations.html  # 后台咨询管理页面
│   ├── error.html         # 错误页面
│   ├── components/        # 组件文件夹
│   ├── solutions/         # 解决方案页面文件夹
│   └── case-studies/      # 案例研究页面文件夹
├── data/                  # 数据文件夹
│   └── consultations.db   # SQLite数据库
├── logs/                  # 日志文件夹
└── translations/          # 翻译文件夹
    ├── en/                # 英文翻译
    ├── ja/                # 日文翻译
    └── zh/                # 中文翻译
```

## 安装和运行

### 本地开发环境

1. 克隆项目到本地：
   ```
   git clone <repository-url>
   cd newoweb1
   ```

2. 创建虚拟环境并激活：
   ```
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. 安装依赖：
   ```
   pip install -r requirements.txt
   ```

4. 运行应用：
   ```
   python app.py
   ```

5. 在浏览器中访问 `http://localhost:5001`

### Docker部署

1. 构建并启动Docker容器：
   ```
   docker-compose up -d
   ```

2. 在浏览器中访问 `http://localhost:8090`

3. 查看日志：
   ```
   docker-compose logs -f
   ```

4. 停止容器：
   ```
   docker-compose down
   ```

### 生产环境部署

1. 构建Docker镜像：
   ```
   docker build -t wisdomitc-website .
   ```

2. 运行容器（需要配置外部Redis）：
   ```
   docker run -d -p 5001:5001 \
     -e REDIS_URL=redis://redis_C7DGKB@156.238.249.149:6379/0 \
     --name wisdomitc-website wisdomitc-website
   ```

3. 在浏览器中访问 `http://localhost:5001`

## Redis缓存配置

项目现在使用外部Redis服务器进行缓存：
- 服务器地址: 156.238.249.149
- 端口: 6379
- 密码: redis_C7DGKB

## SEO和GEO优化

本项目实现了SEO（搜索引擎优化）和GEO（生成式引擎优化）功能：

### SEO优化特性
- 结构化数据标记（Schema.org）
- 优化的meta标签
- 响应式设计
- 快速加载速度
- 清晰的网站结构

### GEO优化特性
- 生成式AI内容优化
- 知识图谱标记
- 语义化内容结构
- AI爬虫友好的标记

### 自动优化系统
项目包含自动GEO优化系统，可以按以下顺序执行优化任务：
1. SEO优化
2. GEO优化
3. 网站健康检查

系统提供以下功能：
- 手动触发优化
- 定时自动优化（每日/每周）
- 优化报告生成
- 健康状态监控

运行自动优化：
```bash
python auto_geo_optimizer.py
```

## 多语言支持

项目使用Flask-Babel实现多语言支持。目前支持：
- 中文（默认）
- 英文
- 日文

添加新语言的步骤：
1. 在`translations`目录下创建新语言文件夹
2. 使用Babel提取和编译翻译字符串
3. 在模板中使用`_()`函数标记可翻译文本

## 数据库

项目使用SQLite数据库存储咨询表单数据。数据库包含一个`consultations`表，字段包括：
- id: 咨询ID
- name: 客户姓名
- email: 客户邮箱
- company: 公司名称
- phone: 电话号码
- service: 感兴趣的服务
- message: 咨询内容
- timestamp: 提交时间

## 缓存系统

项目使用外部Redis服务器作为缓存系统，提供以下功能：
- 页面缓存
- 会话存储
- 临时数据存储

## 反向代理

项目使用Nginx作为反向代理，提供以下功能：
- 静态文件服务
- 负载均衡
- SSL终止
- 压缩和缓存

## 自定义和扩展

### 添加新解决方案页面
1. 在`templates/solutions/`目录下创建新HTML文件
2. 参考现有解决方案页面的结构和标记
3. 在首页的解决方案部分添加新卡片

### 添加新案例研究
1. 在`templates/case-studies/`目录下创建新HTML文件
2. 参考现有案例研究页面的结构和标记
3. 在首页的案例研究部分添加新卡片

### 修改网站内容
1. 编辑相应的HTML模板文件
2. 更新多语言翻译文件
3. 重启应用使更改生效

## 故障排除

### 常见问题

1. **页面无法加载**
   - 检查Flask应用是否正在运行
   - 确认端口未被占用
   - 检查防火墙设置

2. **数据库连接错误**
   - 确认`consultations.db`文件存在且权限正确
   - 检查数据库表结构

3. **翻译不生效**
   - 确认语言文件已正确编译
   - 检查浏览器语言设置

4. **Docker容器问题**
   - 查看容器日志：`docker-compose logs`
   - 确认端口未被占用
   - 检查Docker配置文件

5. **Redis连接问题**
   - 确认外部Redis服务器可访问
   - 检查Redis连接配置是否正确
   - 确认防火墙设置允许访问Redis端口

### 日志查看
应用日志输出到`logs/`目录，Docker容器日志可通过以下命令查看：
```
docker-compose logs -f web
```

## 维护和更新

### 定期任务
- 更新内容和案例研究
- 检查并更新依赖包
- 监控网站性能和可用性
- 运行GEO优化保持搜索引擎友好性

### 备份
- 定期备份`data/consultations.db`数据库文件
- 备份重要的配置文件和翻译文件
- 备份日志文件

## 许可证

本项目为上海葳澄信息科技有限公司专有软件，保留所有权利。

## Docker 部署说明

## 项目概述

本项目是一个基于Flask的网站，展示上海葳澄信息科技有限公司的人工智能解决方案。项目已完全Docker化，包含以下服务：

## 系统要求

- Docker 20.10+
- Docker Compose 1.29+

## 部署步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd newoweb1
```

### 2. 构建和启动服务

```bash
# 构建镜像
docker-compose build

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps
```

### 3. 访问应用

- 主网站: http://localhost:8090
- 直接访问Flask应用: http://localhost:5001
- 健康检查: http://localhost:5001/health

## 故障排除

### 常见问题及解决方案

#### 1. 'gunicorn.conf.py' 文件不存在错误

**问题描述**: 在服务器部署时出现 "Error: 'gunicorn.conf.py' doesn't exist" 错误。

**可能原因**:
- 文件未正确复制到服务器
- Docker 构建过程中文件被忽略
- 路径引用错误

**解决方案**:

1. **检查文件是否存在**:
   ```bash
   # 在项目根目录执行
   ls -la gunicorn.conf.py
   ```

2. **检查 .dockerignore 配置**:
   确保 [gunicorn.conf.py](file:///c:/Users/jason/Documents/projects/newoweb1/gunicorn.conf.py) 文件没有被 [.dockerignore](file:///c:/Users/jason/Documents/projects/newoweb1/.dockerignore) 忽略。

3. **重新构建镜像**:
   ```bash
   # 清理旧镜像
   docker-compose down
   docker rmi newoweb1_web
   
   # 重新构建
   docker-compose build --no-cache
   docker-compose up -d
   ```

4. **使用验证脚本检查环境**:
   ```bash
   python verify_deployment.py
   ```

#### 2. 端口冲突

```bash
# 查看占用端口的进程
netstat -tuln | grep :5001
netstat -tuln | grep :8090

# 停止占用端口的进程或更改端口映射
```

#### 3. 容器无法启动

```bash
# 查看详细日志
docker-compose logs web
docker-compose logs nginx
```

#### 4. 健康检查失败

```bash
# 检查服务是否正常运行
curl http://localhost:5001/health
```

### 高级故障排除

#### 查看容器内部文件结构

```bash
# 进入容器
docker-compose exec web bash

# 在容器内检查文件
ls -la /
ls -la /app/
```

#### 手动测试 Gunicorn 启动

```bash
# 进入容器
docker-compose exec web bash

# 手动启动 Gunicorn
cd /app
gunicorn --config gunicorn.conf.py app:app
```

## 性能调优

### 资源限制

在 `docker-compose.yml` 中可以配置资源限制：

```yaml
web:
  deploy:
    resources:
      limits:
        memory: 512M
        cpus: '0.5'
```

### 扩展服务

可以调整 Gunicorn 工作进程数，在 [gunicorn.conf.py](file:///c:/Users/jason/Documents/projects/newoweb1/gunicorn.conf.py) 中修改:

```python
workers = 4  # 根据服务器CPU核心数调整
```

## 安全建议

1. 使用非 root 用户运行容器
2. 定期更新基础镜像
3. 限制容器资源使用
4. 配置 HTTPS 证书
5. 定期备份数据卷

## 联系信息

如有任何问题，请联系：
- 邮箱: jyu@wisdomitc.com
- 电话: +86-18964673689