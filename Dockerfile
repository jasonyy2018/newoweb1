# 使用Python官方镜像作为基础镜像
FROM python:3.9-slim

# 设置标签
LABEL maintainer="jyu@wisdomitc.com"
LABEL description="上海葳澄信息科技有限公司网站 - AI Solutions for Business"

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 升级pip并安装依赖
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 复制应用代码（除了在.dockerignore中忽略的文件）
COPY . .

# 创建非root用户
RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /app
USER appuser

# 创建数据和日志目录
RUN mkdir -p /app/data && \
    mkdir -p /app/logs && \
    touch /app/data/consultations.db

# 暴露端口
EXPOSE 5001

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5001/health || exit 1

# 启动应用
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "--workers", "3", "app:create_app()"]