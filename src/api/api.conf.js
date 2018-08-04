// let winurl = 'http://localhost';

let macurl = 'http://hyperzjy.applinzi.com';

export default {

    url: macurl,
    errorCode: 0,
    successCode: 1,

    normalUserType: 0,
    superUserType: 1,

    overdueCode: 1,
    nearoverCode: 2,
    normal_code: 0,


    water:{
        listUrl: macurl + '/web/?r=water/list',
        pageCountUrl:macurl + '/web/?r=water/pageinfo'
    }

}