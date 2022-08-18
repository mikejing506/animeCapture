const fs = require('fs')

let path = '/mnt/lvm/share/btdownload/anime'
let linkPath = '/mnt/lvm/share/Ani'

const passExt = ['!qB']

function removeFanSub(fileName){
    let reg = /^\[.*?\](\s)?/g
    if(reg.test(fileName)){
        return fileName.replace(reg,'')
    }else{
        return {false:false,name:fileName};
    }
}

function getBangumiNameAndEP(fileName){
    if(fileName[0]==='['){
        let SqEPReg = /\[[0-9]+(v[0,9])?\]?/g
        SqEPReg.test(fileName)
        let EPIndex = SqEPReg.lastIndex
        let EP = fileName.match(SqEPReg)[0].replace(/[\[\]]/g,'')
        let Bangumi = fileName.substring(0,EPIndex).replace(SqEPReg,'').replace(/[\[\]]/g,'')
        return {
            BGM:Bangumi,
            EP:EP
        }
    }else{
        let reg = /\s-\s[0-9]+(v[0-9]|.5)?/g
        if(reg.test(fileName)){
            let EPIndex = reg.lastIndex
            let EP = fileName.match(reg)[0].replace(' - ','')
            let Bangumi = fileName.substring(0,EPIndex).replace(reg,'')
            return {
                BGM:Bangumi,
                EP:EP
            }
        }else{
            let SqEPReg = /\[[0-9]+(v[0,9])?\]/g
            if(SqEPReg.test(fileName)){
                let EPIndex = SqEPReg.lastIndex
                let EP = fileName.match(SqEPReg)[0].replace(/[\[\]]/g,'')
                let Bangumi = fileName.substring(0,EPIndex).replace(SqEPReg,'')
                return {
                    BGM:Bangumi,
                    EP:EP
                }
            }else{//OVA Movie etc.
                console.log(`3${fileName}`)
            }
        }
    }
}

files = fs.readdirSync(path)

files.map((file)=>{
    let fileExt = file.split('.').pop();
    if(!passExt.includes(fileExt)){
        let ep = getBangumiNameAndEP(removeFanSub(file))
    
        if(ep){
            console.log(`${linkPath}/${ep.BGM}/${ep.EP}`)
            if(!fs.existsSync(`${linkPath}/${ep.BGM}`)){
                fs.mkdirSync(`${linkPath}/${ep.BGM}`)
            }
            if(!fs.existsSync(`${linkPath}/${ep.BGM}/${ep.EP}`)){
                fs.linkSync(`${path}/${file}`,`${linkPath}/${ep.BGM}/${ep.EP}.${fileExt}`)
            }else{
                fs.unlinkSync(`${linkPath}/${ep.BGM}/${ep.EP}.${fileExt}`)
                fs.linkSync(`${path}/${file}`,`${linkPath}/${ep.BGM}/${ep.EP}.${fileExt}`)
            }
        }
    }
})