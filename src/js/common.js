/**
 * Created by lsm on 2018-1-4.
 */

const domain = 'http://127.0.0.1:8080';

// FUNCTIONS =============================================================
let TOKEN_KEY = 'jwtToken';
let getJwtToken = function(){
    return sessionStorage.getItem(TOKEN_KEY);
};
let setJwtToken = function(token){
    sessionStorage.setItem(TOKEN_KEY,token)
};
let removeJwtToken = function(){
    sessionStorage.removeItem(TOKEN_KEY);
};
let createAuthorizationTokenHeader = function(){
    let token = getJwtToken();
    if(token){
        return {"Authorization":"Bearer "+ token};
    }else{
        return {};
    }
};
//时间戳转化为时间
let changeDate = function(param){
    var timeStamp = new Date(param),
        oYear = timeStamp.getFullYear(),
        oMonth = timeStamp.getMonth()+ 1,
        oDay = timeStamp.getDate(),
        oHour = timeStamp.getHours(),
        oMin = timeStamp.getMonth(),
        oSecond = timeStamp.getSeconds(),
        oTime = oYear + '-' + getZero(oMonth) + '-' + getZero(oDay) + ' ' + getZero(oHour) +':' + getZero(oMin) + ':' + getZero(oSecond);
    return oTime;
};
//补0操作
function getZero(num){
    if(parseInt(num) < 10){
        num = '0'+ num;
    }
    return num;
}


export default{
    globalUrl:domain,
    getJwtToken:getJwtToken,
    setJwtToken:setJwtToken,
    removeJwtToken:removeJwtToken,
    createAuthorizationTokenHeader:createAuthorizationTokenHeader,
    changeDate:changeDate
}