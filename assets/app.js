
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCC_QAtoIFzixfSzhDZ-bpwUzpx502P3Ac",
    authDomain: "trainscheduler-15b66.firebaseapp.com",
    databaseURL: "https://trainscheduler-15b66.firebaseio.com",
    projectId: "trainscheduler-15b66",
    storageBucket: "trainscheduler-15b66.appspot.com",
    messagingSenderId: "535277925346"
};

firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", "#submit", function () {         //on click, getting values of input fields, 

    var newName = $("#newName").val().trim();
    var newDest = $("#newDest").val().trim();
    var newTime = $("#newTime").val().trim();
    var newFreq = $("#newFreq").val().trim();

    function newTrainData(trainName, trainDestination, trainTime, trainFrequency) {
        database.ref().push({                       //pushing the newTrainData to the firebase
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    };

    newTrainData(newName, newDest, newTime, newFreq);       //calling func

    $("#newName").val("");          //resetting the input fields to blank
    $("#newDest").val("");
    $("#newTime").val("");
    $("#newFreq").val("");

    console.log("New Data Added");

});

// contact firebase and return info in order from oldest to newest
setInterval(() => {
    $("#table").empty();
    database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (snapshot) {

        console.log(snapshot);
        var newRow = $("<tr>");         //creates new row within the table
        var listName = $("<th>");       //creates new header cell within row
        var listDest = $("<td>");       //creates new cell within the row
        var listFreq = $("<td>");       //creates new cell within the row
        var listArrive = $("<td>");
        var listMinAway = $("<td>");
        //giving new row info from firebase and attrs, 
        //then adding the new row to the table

        var data = snapshot.val();                                  //assigning var to the database info
        var convertedTime = moment(data.time, "HH:mm");             //converting the time into minutes and assigning a var
        var timeDiff = moment().diff(moment(convertedTime), "minutes");         //finding the difference between now and the first arrival time
        var timeRemaining = timeDiff % data.frequency;              //finding the time until next arrival by dividing the timeDiff by the frequency
        var minAway = data.frequency - timeRemaining;               //subtracting the time remaining from the freq to find how many min away the next train is
        var nextArrive = moment().add(minAway, "minutes");          //establishing nextArrive by comparing now to the next arrival
        nextArrive = moment(nextArrive).format("HH:mm");            //formatting into the HH:mm 

        listName.text(data.name).attr("scope", "row");              //creating new tables cells and giving them their info

        listDest.text(data.destination);                            

        listFreq.text(data.frequency);

        listArrive.text(nextArrive).addClass("arriveTime");

        listMinAway.text(minAway);

        newRow.append(listName, listDest, listFreq, listArrive, listMinAway);           
        
        $("#table").append(newRow);                         //updating table with newRow
    });
}, 1000);





