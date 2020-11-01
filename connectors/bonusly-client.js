const env = require('dotenv').config().parsed;
var unirest = require('unirest');

// function to return list of recognition received by me at ellucian.
function getMyBonuses() {
    return new Promise((resolve, reject) => {
        unirest.get(env.BONUSLY_BASE_API + '/bonuses?receiver_email='+env.MY_COMPANY_EMAIL)
        .headers(
            { "Authorization": "Bearer " + env.BONUSLY_API_KEY })
        .end(response => {
            if (!response.ok) {
                reject(`error`);
            } else {
                let my_bonuses = [];
                response.body.result && response.body.result.forEach(element => {
                    if(element.giver.manager_email){
                         var temp = {
                             created_at : element.created_at,
                             giver : element.giver.short_name,
                             reason : element.reason_decoded.replace(/([@#&\+]\S+)/gi,"").trim()
                         }
                         my_bonuses.push(temp);
                    } 
                 });
                resolve(my_bonuses);
            }
        });
    });
}

// function to return list of achievements received by me at ellucian. 
function getMyAchievements() {
    return new Promise((resolve, reject) => {
        unirest.get(env.BONUSLY_BASE_API + '/achievements')
        .headers(
            { "Authorization": "Bearer " + env.BONUSLY_API_KEY })
        .end(response => {
            if (!response.ok) {
                reject(`error`);
            } else {
                let my_achievements = [];
                response.body.result && response.body.result.forEach(element => {
                    if(element.user.email.toLowerCase() === env.MY_COMPANY_EMAIL){
                         var temp = {
                             created_at : element.created_at,
                             end_date : element.deactivated_at,
                             total_days_held : date_diff_indays(element.created_at,element.deactivated_at),
                             reason : element.headline,
                             title:element.title,
                             achievement_type : element.achievement_type_key
                         }
                         my_achievements.push(temp);
                    } 
                 });
                resolve(my_achievements);
            }
        });
    });
}

// function to calculate number of days between two dates.
var date_diff_indays = function(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

exports.getMyBonuses = getMyBonuses;
exports.getMyAchievements = getMyAchievements;
