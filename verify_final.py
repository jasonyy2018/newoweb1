#!/usr/bin/env python3
from database_postgresql import get_all_consultations

consultations = get_all_consultations()
print(f"数据库中的记录数: {len(consultations)}")

if consultations:
    print("最新记录:")
    for i, c in enumerate(consultations[:3], 1):
        print(f"  {i}. {c['name']} - {c['email']} - {c['service']}")
else:
    print("暂无记录")