document.addEventListener("DOMContentLoaded", function(event) { 
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
    
    function updateLabel(startDate){
        document.getElementById("date-from").innerHTML = "Since " + new Date(startDate).toLocaleDateString() + " " + new Date(startDate).toLocaleTimeString();
        document.getElementById("form").hidden = true
        document.getElementById("timer-text").hidden = false
        document.getElementById("timer-text").innerHTML = "The timer expires on " + localStorage.getItem("CountDownDate").toString() + "<br><br> Title: " +  localStorage.getItem("Subject")
    }
    
    function progress(){
        var endDate = new Date(localStorage.getItem("CountDownDate"));
        var startDate = new Date(localStorage.getItem("StartDate"));
        var now = new Date()
        var timeDiff = endDate - new Date();
    
        var done = (now-startDate) / (endDate-startDate);
        
        if (done>=1){
            party.confetti(document.body,{
                debug: false,
                gravity: 800,
                zIndex: 99999,
                count: party.variation.range(50,100),
                shapes: ["square","circle","roundedRectangle"]
            });
            party.confetti(document.body,{
                debug: false,
                gravity: 800,
                zIndex: 99999,
                count: party.variation.range(50,100),
                shapes: ["square","circle","roundedRectangle"]
            });
            cancelTimer()
            return 0
        }
    
        var percentStr = (100.0 * done).toString();
    
        var days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
        var hours = Math.floor((timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        var minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
        var seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);
    
        // Aggiornare i contenuti dei div con i nuovi valori
        document.getElementById("days").innerText = "" + days;
        document.getElementById("hours").innerText = ""+ hours;
        document.getElementById("minutes").innerText = "" + minutes;
        document.getElementById("seconds").innerText = "" + seconds;
        
        if (done < 0.1) {
            percentStr = percentStr.slice(0, 9);
          } else {
            percentStr = percentStr.slice(0, 10);
        }
        
        document.getElementById("progress-percentage").innerHTML = percentStr + "%";
    
    
        return done
    }
    
    function startCountdown() {
        let now = new Date()
        let end_date = new Date(document.getElementById("end-date").value)
        
        if(end_date >= now){
            line = new ProgressBar.Line('#container-progress', {
                color: '#FCB03C'
            });
            
            localStorage.setItem("CountDownDate",end_date)
            localStorage.setItem("StartDate",new Date())
            motivo = document.getElementById('motivo').value
    
            if(isBlank(motivo)) localStorage.setItem("Subject","No Name :(")
            else localStorage.setItem("Subject",motivo)
        
            updateLabel(new Date())
    
            let value = progress()
            document.getElementById("cancel-div").hidden = false;
            if (value < 1) {
                line.animate(progress());
                myReq = requestAnimationFrame(update);
            }
            else{
                party.confetti(document.body,{
                    debug: false,
                    gravity: 800,
                    zIndex: 99999,
                    count: party.variation.range(50,100),
                    shapes: ["square","circle","roundedRectangle"]
                });
    
                party.confetti(document.body,{
                    debug: false,
                    gravity: 800,
                    zIndex: 99999,
                    count: party.variation.range(50,100),
                    shapes: ["square","circle","roundedRectangle"]
                });
                cancelTimer()
            }
            
        }
    }
    
    function cancelTimer(){
        cancelAnimationFrame(myReq);
        localStorage.removeItem("CountDownDate");
        localStorage.removeItem("StartDate");
        localStorage.removeItem("Subject");
    
        document.getElementById("form").hidden = false;
        document.getElementById("timer-text").hidden = true;
        document.getElementById("date-from").innerHTML = "";
        document.getElementById("cancel-div").hidden = true;
    
        line.destroy();
    
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        document.getElementById("progress-percentage").innerHTML = "";
        
    }
    
    function update() {
        line.set(progress());
        myReq = requestAnimationFrame(update);
    }
    
    function createLine(){
        line = new ProgressBar.Line('#container-progress', {
            color: '#FCB03C'
        });
    }

    const today=(new Date()).toISOString().slice(0,10); // get local current date
    document.querySelectorAll('input[type="datetime-local"]').forEach(el=>{
     el.min=today+"T00:00";
    })

    let myReq;
    var line;

    createLine();

    var startButton = document.getElementById("start-button");
    if (startButton) {
        startButton.addEventListener("click", startCountdown);
    }

    var cancelButton = document.getElementById("buton-cancel");
    if (cancelButton) {
        cancelButton.addEventListener("click", cancelTimer);
    }

    if (localStorage.getItem("CountDownDate") !== null && localStorage.getItem("StartDate") !== null) {
        updateLabel(localStorage.getItem("StartDate"))
        let value = progress()
        document.getElementById("cancel-div").hidden = false;
        if (value < 1) {
            line.animate(progress());
            myReq = requestAnimationFrame(update);
        } else{
            cancelTimer()
        }
    }else{
        document.getElementById("cancel-div").hidden = true;
    }
});