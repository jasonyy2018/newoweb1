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
- Redis缓存
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

2. 在浏览器中访问 `http://localhost:8090` (注意：端口已更改为8090)

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

2. 运行容器：
   ```
   docker run -d -p 5001:5001 --name wisdomitc-website wisdomitc-website
   ```

3. 在浏览器中访问 `http://localhost:5001`

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

项目使用Redis作为缓存系统，提供以下功能：
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

## 联系信息

如有任何问题，请联系：
- 邮箱: jyu@wisdomitc.com
- 电话: +86-18964673689