let i = 0;
const fetchimportfile = (jsondata)=>{
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      i++;
      const result = {
        issuccess:i%2===0?true:false,
        successlist:[`1`,`2`,`3`],
        failedlist:[`4`,`5`],
        errmsg:`导入失败,无法辨识文件`
      };

      resolve(result);
    },5000);
  });
}

export default fetchimportfile;
