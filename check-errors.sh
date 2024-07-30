#!/bin/bash

# Chạy ứng dụng Node.js
yarn dev

# Kiểm tra mã thoát của lệnh trước đó
if [ $? -eq 0 ]; then
  echo "Ứng dụng đã chạy thành công và không có lỗi."
  exit 1
else
  echo "Có lỗi xảy ra khi chạy ứng dụng."
  exit 1
fi
