@echo off
echo 正在启动珊珊的个人网站...
echo.

REM 尝试使用Python启动服务器
python -m http.server 8000 >nul 2>&1
if %errorlevel% equ 0 (
    echo Python服务器已启动！
    echo 请在浏览器中访问: http://localhost:8000
    echo.
    echo 按任意键停止服务器...
    pause >nul
    exit
)

REM 如果Python不可用，尝试使用Node.js
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let filePath='.'+req.url;if(filePath=='./') filePath='./index.html';const extname=path.extname(filePath);const contentType={'html':'text/html','css':'text/css','js':'text/javascript','png':'image/png','jpg':'image/jpg','gif':'image/gif','svg':'image/svg+xml'}[extname.slice(1)]||'text/plain';fs.readFile(filePath,(err,content)=>{if(err){res.writeHead(404);res.end('404 Not Found');}else{res.writeHead(200,{'Content-Type':contentType});res.end(content);}});}).listen(8000,()=>console.log('Server running at http://localhost:8000'));" >nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js服务器已启动！
    echo 请在浏览器中访问: http://localhost:8000
    echo.
    echo 按任意键停止服务器...
    pause >nul
    exit
)

REM 如果都不可用，提供手动打开的说明
echo 未找到Python或Node.js，请尝试以下方式：
echo.
echo 1. 安装VSCode并使用Live Server扩展
echo 2. 直接双击index.html文件打开
echo 3. 使用其他本地服务器工具
echo.
echo 如果直接打开HTML文件，部分功能可能受限，但基本展示正常。
echo.
pause 