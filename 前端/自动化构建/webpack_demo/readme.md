1. npm install webpack-dev-server -g
 

2. npm install webpack -g


webpack 教程

https://github.com/kraaas/webpack-tutorial-collection
http://www.jianshu.com/p/42e11515c10f


安装报错
1. npm WARN package.json: No repository field

```
package.json 加入以下内容

"repository": {
  "type": "git",
  "url": "git://github.com/username/repository.git"
}
```

2. npm WARN install Refusing to install webpack as a dependency of itself

```
package.json name不要起名为webpack

{
  "name": "test_webpk",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "loader": "webpack-dev-server --inline"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/username/repository.git"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^0.26.0",
    "style-loader": "^0.13.1"
  }
}


```

webpack插件

``` 
 	"json-loader"			: 转换json的加载器,
	"css-loader"			: css加载器,
    "style-loader"			: style加载器,
 	"webpack-dev-server"	: 构建本地服务器,
 	"babel-core"			: JavaScript的平台核心文件,
    "babel-loader"			: ,
    "babel-preset-es2015"	: 解析Es6,
 	b
 
```