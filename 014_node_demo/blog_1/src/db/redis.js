const redis = require('redis');
const {REDIS_CONF } = require('../conf/db');

// kes * 获取所有设置的数据
// 创建客户端;
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
// 监控错误;
redisClient.on('error',err=>{
    console.error(err);
})

function  set(key,val) {
    if(typeof val === 'object'){
        val = JSON.stringify(val);
    }
    redisClient.set(key,val,redis.print);

}

function get(key) {
    const p = new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                console.error(err);
                return
            }
            if(val == null){
                resolve(null);
                return
            }
            try{
                resolve( JSON.parse(val) );
            }catch(ex){
                console.log(ex);
                resolve(val);
            }
        })
    })
    return p
}

module.exports={
    set,
    get
}