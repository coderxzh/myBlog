import path from "path"
function resolve(dir:any){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config:any)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
　　　　
    }
}