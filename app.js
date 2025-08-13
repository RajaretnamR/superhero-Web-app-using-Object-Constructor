// Step - 1 Hero Constructor Function :
function Hero(name, powerLevel, secretIdentity, category){
    //Public Property yaru veyna pathuka mudiyum :
    this.name = name;
    this.powerLevel = powerLevel;
    this.category = category;

    // Idhu secret Key yarum use panna mudiyadhu : andha Function kulla mattum dha access panna mudiyum veyliya mudiyadhu
    var _secret = secretIdentity;

    this.revelIdentity =function(){
        return _secret;
    }

    this.setIdentity = function(){
        return _newIdentity;
    }

}

//Global Variables :
let heros = [];
let isEditing = false;
let editIndex = null;
 
//load data from Local Storage :
window.onload = function(){
    const saved  = localStorage.getItem("heros");

    if(saved){
        const raw = JSON.parse(saved);
        heros = raw.map(function(hero){
          return  new Hero(hero.name,hero.powerLevel, hero._secret || hero.secretIdentity , hero.category)
        })

        renderHeros();
    }
}

//SaveHeros Function create pana poren da :
function saveHeros(){
    const data = heros.map(function(hero){
        // console.log(hero)
        return{
            name:hero.name,
            powerLevel:hero.powerLevel,
            category:hero.category,
            secretIdentity:hero.revelIdentity()
        };
    })
    localStorage.setItem("heros" , JSON.stringify(data));

}




//Add & Edit Hero from the form :
document.getElementById("heroForm").addEventListener("submit" , function(e) {
    e.preventDefault();

    //Target All the html elements :
    const name = document.querySelector("#heroName").value.trim();
    const power = parseInt(document.querySelector("#heroPower").value);
    const identity = document.querySelector("#secretIdentity").value.trim();
    const category = document.querySelector("#heroCategory").value.trim();
    
     if(isEditing){
        //update existing item :
        heros[editIndex] = new Hero(name, power, identity, category) ;
        isEditing=false;
        editIndex=null;
     }else{
        //add new hero 
        let newHero = new Hero(name, power, identity, category) ;
        heros.push(newHero)
     }


    this.reset(); // ✅ After Submit Clears all input fields
    renderHeros();
    saveHeros();
     
})

//UI la Show panuradhukana Fucntion :  
function renderHeros(filter=""){
       
    const list = document.querySelector("#heroList");
    list.innerHTML=""; // Duplicate ITem ah remove panirum 

    heros.forEach(function(hero, index) {

        if(hero.name.toLowerCase().includes(filter.toLowerCase())){
        const item = document.createElement("li");

        item.className = "list-group-item d-flex justify-content-between aling-item-center";
 
                item.innerHTML = `
                    <div>
                        <strong>${hero.name}</strong> (Power: ${hero.powerLevel})
                        <span class="badge bg-secondary ms-2">${hero.category}</span>
                        <br>
                        <small>Secret</small>
                    </div>
                    <div>
                        <button class="btn btn-warning btn-sm me-2" onClick="editHero(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onClick="deleteHero(${index})">Delete</button>
                    </div>
                `;

                list.appendChild(item)
                // console.log(heroList);
        }        
            
    })

}


function deleteHero(index){
        if(confirm("Hey buddy Are you sure you want to delete this hero ??!!")){
                heros.splice(index, 1);
                renderHeros();
                saveHeros();
        }
}


function editHero(index){
    const hero = heros[index];

    // Form la old data fill pannurathu
    document.querySelector("#heroName").value = hero.name;
    document.querySelector("#heroPower").value = hero.powerLevel;
    document.querySelector("#secretIdentity").value = hero.revelIdentity();
    document.querySelector("#heroCategory").value = hero.category;

    // "Nee edit mode la iruka" nu mark pannanum
     isEditing = true;
     editIndex = index
    // console.log(index)
}

// Target the Search Filter Input
document.querySelector("#searchHero").addEventListener("input" , function(e){
    renderHeros(e.target.value)
})



// Sort Ascending & Descending The Powerlevel :
function sortHeros(isAscending) {
    heros.sort(function(a, b) {
        if (isAscending) {
            return a.powerLevel - b.powerLevel; // Ascending
        } else {
            return b.powerLevel - a.powerLevel; // Descending
        }
    });

    renderHeros(); // UI update
    saveHeros(); // Save in local storage 
}

//Toggle function :
function toggleTheme(){
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");

}






