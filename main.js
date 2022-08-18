const fs = require('fs')

let re = new RegExp('^\\[.*?\\](\\s)', 'g')
let regName = new RegExp('-\\s[0-9]+(v[0-9])?', 'g')
let regNameInSq = new RegExp('\\[[0-9]*?\\]', 'g')

fs.readdir('Z:\\btdownload\\anime', (err, files) => {
    let bangumiName,bangumiEP;
    files.forEach(videoName => {
        let slice = re.exec(videoName)
        let _videoNameBegin = videoName[slice[0].length]
        if (slice && _videoNameBegin !== '[') {//[subGroupName] Anime Name with ep[balaba]
            let _videoName = videoName.substring(slice[0].length)
            console.log(_videoName)
            let name = regName.exec(_videoName);
            console.log(`${name}`)
            if (name[0]) { //[subGroupName] Anime Name - EP [balaba]
                // console.log(videoName)
                bangumiName = _videoName.substring(0, name.index)
                bangumiEP = name[0].split(' - ')[1]
                // console.log(`${bangumiName} - ${bangumiEP}`)
            } else {
                name = regNameInSq.exec(_videoName) //[subGroupName] Anime Name [Ep][balaba]
                // console.log(name)
                if(name){
                    bangumiName = _videoName.substring(0, name.index)
                    let Sq = new RegExp('[\\]\\[]','g')
                    bangumiEP = name[0].replace(Sq,'')
                    // console.log(`${bangumiName} - ${bangumiEP}`)
                }else{
                    // console.log(videoName)
                    // looks like a Movie or OVA?
                }
            }
        } else {//[subGroupName][ Anime Name ][Ep][balaba]
            
        }
    })
})

// let videoName = '[ANi] 川尻小玉的懶散生活 - 11 [1080P][Baha][WEB-DL][AAC AVC][CHT].mp4'

// let slice = re.exec(videoName)
// if (slice && videoName[slice[0].length] !== '[') {//[subGroupName] Anime Name with ep[balaba]
//     videoName = videoName.slice(slice[0].length);
//     let name = regName.exec(videoName);
//     console.log(name)
//     if (name[0]) { //[subGroupName] Anime Name - EP [balaba]
//         // console.log(videoName)
//         bangumiName = videoName.substring(0, name.index)
//         bangumiEP = name[0].split(' - ')[1]
//         // console.log(`${bangumiName} - ${bangumiEP}`)
//     } else {
//         name = regNameInSq.exec(videoName) //[subGroupName] Anime Name [Ep][balaba]
//         // console.log(name)
//         if(name){
//             bangumiName = videoName.substring(0, name.index)
//             let Sq = new RegExp('[\\]\\[]','g')
//             bangumiEP = name[0].replace(Sq,'')
//             // console.log(`${bangumiName} - ${bangumiEP}`)
//         }else{
//             // console.log(videoName)
//             // looks like a Movie or OVA?
//         }
//     }
// } else {//[subGroupName][ Anime Name ][Ep][balaba]
    
// }