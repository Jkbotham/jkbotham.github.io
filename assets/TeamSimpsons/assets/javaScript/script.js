
// http://app.ticketmaster.com/discovery/v2/events.json?&keyword=Minnesota%20Vikings&apikey=uc6FKMGBBMGcsjNBIjHKvpNkXv2pkFhd&startDateTime=2019-10-23T18:00:00Z&sort=date,asc

$(document).ready(function () {
    var searchedTeamName = "";
    var teamSearch = encodeURI(searchedTeamName);
    var ticketMasterURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
    var ticketMasterApiKey = "uc6FKMGBBMGcsjNBIjHKvpNkXv2pkFhd";
    var proxy = "https://chriscastle.com/proxy/index.php?:proxy:";
    var footballID = "&subGenreId=KZazBEonSMnZfZ7vFE1";
    var keywordSearch = "&keyword=";
    var sortAsc = "&sort=date,asc";
    var sportsDbTeamId = "";

    //Search by id in DBSports API
//     var nflTeams = 
//     {cardinals:"134946", 
//     falcons: "134942", 
//     ravens: "134922",
//     bills: "134918",
//     panthers: "134943",
//     bears: "134938",
//     bengals: "134923",
//     browns: "134924",
//     cowboys: "134934",
//     broncos: "134930",
//     lions: "134939",
//     packers: "134940",
//     texans: "134926",
//     colts: "134927",
//     jaguars: "134928",
//     chiefs: "134931",
//     chargers: "135908",
//     rams: "135907",
//     dolphins: "134919",
//     vikings: "134941",
//     patriots: "134920",
//     saints: "134944",
//     giants: "134935",
//     jets: "134921",
//     raiders: "134932",
//     eagles: "134936",
//     steelers: "134925",
//     fortyNiners: "134948",
//     seahawks: "134949",
//     buccaneers: "134945",
//     titans: "134929",
//     redskins: "134937",
// };


$(".teamBtn").on("click", function(){
    event.preventDefault();
    console.log($(this).text());
    searchedTeamName = $(this).text()
console.log("******" + searchedTeamName);
    console.log(teamSearch);


    console.log("here next" + $(this).attr("data-sportsDb") );
    sportsDbTeamId = $(this).attr("data-sportsDb");


    sportsDbTeamInfo = {
        "team": searchedTeamName,
        "id": sportsDbTeamId
    }

    sportsDbCall(sportsDbTeamInfo);
    ticketMasterCall(sportsDbTeamInfo);
})

function ticketMasterCall(teamInfo){

    searchedTeamName=teamInfo.team;

    $.ajax({
        type: "GET",
        url: proxy + ticketMasterURL,
        async: true,
        dataType: "json",
        data: "apikey=" + ticketMasterApiKey + footballID + sortAsc + keywordSearch + searchedTeamName,
        timeout: 2000,
        success: function (response) {

            console.log(response);
            console.log(response._embedded.events[0]);

            var parkingDetails = response._embedded.events[0]._embedded.venues[0].parkingDetail;
            console.log(parkingDetails);
            $("#parkingInfo").text(parkingDetails);
            //Team Logos 
            console.log(moment(response._embedded.events[0].dates.start.dateTime).format("LLL"));
            //Team Searched
            $(".card-header").text(searchedTeamName);


            // Objects we are going to use in the site
            //TM// Stadium Name -- response. 
            console.log(response._embedded.events[0]._embedded.venues); //Can't get specific name.
            $("#stadium").text(response._embedded.events[0]._embedded.venues[0].name)
            $("#address").text(response._embedded.events[0]._embedded.venues[0].address.line1 + ", " + response._embedded.events[0]._embedded.venues[0].city.name + ", " + response._embedded.events[0]._embedded.venues[0].state.stateCode + " " + response._embedded.events[0]._embedded.venues[0].postalCode)
            $("#venue").attr("href", response._embedded.events[0]._embedded.venues[0].url)

            //TM// Game Date    
            console.log(response._embedded.events[0].dates.start.localDate);
            // $("#date").text(response._embedded.events[0].dates.start.localDate)
            //TM// Game Time  
            console.log(response._embedded.events[0].dates.start.localTime);
            $("#date").text(moment(response._embedded.events[0].dates.start.dateTime).format("LLL"));

            //TM// Entry Information  -- response. 
            console.log(response._embedded.events[0]._embedded.venues[0].generalInfo.generalRule);
            
            //This doesn't work yet
            var entryDetails = response._embedded.events[0]._embedded.venues[0].generalInfo.generalRule;
            $("#entryInfo").text(entryDetails);

            //TM// Parking Information -- response. 
            console.log(response._embedded.events[0]._embedded.venues[0].parkingDetail);

            // adding location to buy tickets
            $("#buyTickets").attr("href", response._embedded.events[0]._embedded.venues[0].url)

            // Team Logos
            $("#logoImg1").attr("src", response._embedded.events[0]._embedded.attractions[0].images[0].url);
            $("#logoImg2").attr("src", response._embedded.events[0]._embedded.attractions[1].images[0].url);

            $(".pricingNotWorking").removeAttr("style");
            $(".pricingWorking").attr("style", "display: none");

            //TM// Ticket Pricing Range  -- response.
            $("#max").text(response._embedded.events[0].priceRanges[0].max)
            $("#min").text(response._embedded.events[0].priceRanges[0].min)
            $(".pricingNotWorking").attr("style", "display: none");
            $(".pricingWorking").removeAttr("style");

        },
        error: function (xhr, status, err) {
            console.log(xhr, status, err);
        }
    });

};


    // https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=Vikings&locale=*&subGenreId=KZazBEonSMnZfZ7vFE1&sort=date,asc



//On load function for 'Vikings' Default
$(window).on('load', function(){
          
        
    sportsDbTeamInfo = {
        "team": "Minnesota Vikings",
        "id": "134941"
    }

    //searchedTeamName = sportsDbTeamInfo.team



    // console.log($(this).attr("data-sportsDb"));
    // sportsDbTeamId = $(this).attr("data-sportsDb");

    sportsDbCall(sportsDbTeamInfo);
    ticketMasterCall(sportsDbTeamInfo);
});

// SPORTS DB AJAX CALL

    var DBAPIKey = "1";

    function sportsDbCall(teamInfo){

    sportsDbTeamId = teamInfo.id;

    
    var queryURL = "https://www.thesportsdb.com/api/v1/json/" + DBAPIKey + "/lookupteam.php?id=" + sportsDbTeamId;
   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(responseDB) {
        console.log(responseDB);
        // Stadium image 
        $("#stadiumImg").attr("src", responseDB.teams[0].strStadiumThumb);
        //PULL TEAM LOGO (LINK)//
        // console.log(responseDB.teams[0].strTeamBadge); Found in the other api
        // $("#logoImg1").attr("src", responseDB.teams[0].strTeamBadge)

        //PULL TEAM TWITTER
        console.log(responseDB.teams[0].strTwitter);
        $(".fa-twitter-square").attr('href', "https://" + responseDB.teams[0].strTwitter)

        //PULL TEAM WEBSITE
        console.log(responseDB.teams[0].strWebsite);

        //PULL TEAM FACEBOOK
        console.log(responseDB.teams[0].strFacebook);
        $(".fa-facebook-square").attr('href', "https://" + responseDB.teams[0].strFacebook)

        //PULL TEAM INSTAGRAM
        console.log(responseDB.teams[0].strInstagram);
        $(".fa-instagram").attr('href', "https://" + responseDB.teams[0].strInstagram)


    });
};


});
