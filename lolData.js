var urlAPI = "https://euw1.api.riotgames.com/lol/";
var APIkey = "RGAPI-0cd586f6-594b-4795-8f17-b7628a1fa394"

function getName(){

var summonerName = $('#name').val();
console.log(summonerName);

$.ajax({ 
    type: "GET",
    dataType: "json",
    url: urlAPI + "summoner/v4/summoners/by-name/" + summonerName+"?api_key=" + APIkey,
    
    success: function(data){
        $('#test').append("<p>Summoner's name: " + data.name + "</p> <p>Level " + data.summonerLevel + "</p>");        
        
    console.log(data);

    $.ajax({ 
        type: "GET",
        dataType: "json",
        url: urlAPI + "league/v4/entries/by-summoner/" + data.id + "?api_key=" + APIkey,
        
        success: function(infoRanked){
            infoRanked.forEach(test => {
                $('#infoRanked').append("<br>TYPE:  " + test.queueType + " " + test.tier + " " + test.rank + " " + test.leaguePoints + "LP");
                if(test.miniSeries != null){
                    $("#infoRanked").append("<p>Promotion: " + test.miniSeries.wins + "W/" + test.miniSeries.losses+ "L </p>" ); 
                }
                var winrate = (test.wins/ (test.wins + test.losses))*100;
                $('#infoRanked').append("<br>wins: " + test.wins + "<br> losses: " + test.losses + "<br> winrate: " + winrate + "%");
                console.log(winrate);
            });
            
            
            
        }
    });

    }
});


}