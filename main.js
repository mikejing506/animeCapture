const fs = require('fs')

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
        return `${fileName.substring(0,EPIndex).replace(SqEPReg,'').replace(/[\[\]]/g,'')} - ${EP}`
    }else{
        let reg = /\s-\s[0-9]+(v[0-9])?/g
        if(reg.test(fileName)){
            let EPIndex = reg.lastIndex
            let EP = fileName.match(reg)
            return `${fileName.substring(0,EPIndex).replace(reg,'')}${EP}`
        }else{
            let SqEPReg = /\[[0-9]+(v[0,9])?\]/g
            if(SqEPReg.test(fileName)){
                let EPIndex = SqEPReg.lastIndex
                let EP = fileName.match(SqEPReg)[0].replace(/[\[\]]/g,'')
                return `${fileName.substring(0,EPIndex).replace(SqEPReg,'')} - ${EP}`
            }else{//OVA Movie etc.
                console.log(`3${fileName}`)
            }
        }
    }
}

// let files = require('./files.json')
let path = 'Z:\\btdownload\\anime'
files = fs.readdirSync(path)

files.map((file)=>{
    console.log(getBangumiNameAndEP(removeFanSub(file)))
})