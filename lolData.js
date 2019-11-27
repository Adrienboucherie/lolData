var urlAPI = "https://euw1.api.riotgames.com/lol/";
var APIkey = "RGAPI-23577392-4902-4110-94fb-5fbcedc3ac4c"

function getInfos(){

var summonerName = $('#name').val();
console.log(summonerName);

$.ajax({ 
    type: "GET",
    dataType: "json",
    url: urlAPI + "summoner/v4/summoners/by-name/" + summonerName+"?api_key=" + APIkey,
    
    success: function(data){
        $('#test').append("<p>Summoner's name: " + data.name + "</p> <p>Level " + data.summonerLevel + "</p>");        
        console.log(data.id);

    $.ajax({ 
        type: "GET",
        dataType: "json",
        url: urlAPI + "league/v4/entries/by-summoner/" + data.id + "?api_key=" + APIkey,
        
        success: function(infoRanked){
            infoRanked.forEach(test => {
                $('#infoRanked').append("<li class= list-group-item> TYPE:  " + test.queueType + " " + test.tier + " " + test.rank + " " + test.leaguePoints + "LP </li>");
                if(test.miniSeries != null){
                    $("#infoRanked").append("<li class= list-group-item> Promotion: " + test.miniSeries.wins + "W/" + test.miniSeries.losses+ "L </li>" ); 
                }
                var winrate = parseInt((test.wins/ (test.wins + test.losses))*100);
                $('#infoRanked').append("<li class= list-group-item> wins: " + test.wins + "<br> losses: " + test.losses + "<br> winrate: " + winrate + "% </li>");
                console.log(winrate);
            });
            
            
            
        }
    });

    }
});


}