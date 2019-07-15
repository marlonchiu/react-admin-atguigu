# React-Admin 后台管理系统

## 写在前边

```text
参考学习 尚硅谷前端20190105班级学习视频项目  张小飞老师
```

## 运行指令

```npm
# 开发环境
// yarn start
npm start

# 打包发布
// yarn build
npm run build
npm install -g serve
serve build
```

## git管理项目

```npm
# 创建分支
git checkout -b dev
git push origin dev

# 根据远程分支创建本地分支
git checkout -b dev origin/dev
git pull origin dev

# 查看分支
git branch --all              # 查看分支
git branch <分支名如test>      # 创建分支
git checkout <分支名如test>    # 切换分支

# 在dev分支开发的代码合并到master
    git checkout master # 切换到主分支
    git merge dev       # 将dev分支的代码和master合并
    git push origin master # 提交主分支代码
    
# 打tags
git tag   # 打印所有标签
git tag -a 1.0.0 -m "备注信息说明"  # 创建tag 包含版本号和说明信息
git tag -d 1.0.0                   # 删除某个版本的标签（本地操作）
git push origin 1.0.0              # 指定版本的标签推送
git push origin --tags             # 所有版本的标签推送
```
