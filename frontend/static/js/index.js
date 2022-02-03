
import Dashboard from "/views/Dashboard.js";
import Toys from "/views/Toys.js";
import AddToStore from "/views/AddToStore.js";
import {APIPath} from "/views/Config.js";

console.log("js is running");

const navigatTo = url => {    
    history.pushState(null,null,url);
    router();
}

const CloseModal = async() => {
    $("#myModal").hide();
};

const router = async() => {   
    const routes = [
        { path: "/", view : Dashboard},
        { path: "/toys", view : Toys},
        { path: "/addToStore", view : AddToStore}
    ]

    const potentialMatches = routes.map( route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });
    
    let match = potentialMatches.find(p => p.isMatch);   
    if(!match)
    {
        match = {
            route: routes[0],
            isMatch : true
        }
    }
   
    const view = new match.route.view();
    document.querySelector("#app").innerHTML= await view.getHtml();

};


window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded",async()=> {
    document.body.addEventListener("click", async e =>{
        //Cancel Button
        if(e.target.matches("[data-button-click]"))
        {
           //clear content
           $("#txtTitle").val("");
           $("#txtImageUrl").val("");        
           $("#txtMessage").hide();  
        }

        if(e.target.matches("[data-link]"))
        {
                e.preventDefault();              
                navigatTo(e.target.href);
        }

        if(e.target.matches("[data-link-Close]"))
        {
            CloseModal();
        }

        if(e.target.matches("[data-link-like]"))
        {
               //1. Call API  - get Data - GET  2. increse Likes by 1 .3 update Likes using API - PUT
               //4. Updated HTML 

               // Making sure to get latest Data
               let apiURL =  APIPath + e.target.id;
               console.log(apiURL);
               let response = await fetch(apiURL);

               let data = await response.json();                           
               data.likes = data.likes + 1; 
   
               const responseUpdated = await fetch(apiURL , {
                 method: 'PUT',
                 headers: {
                   'Content-type': 'application/json'
                 },
                 body: JSON.stringify(data)
               });
                 
                // Awaiting response.json()
                const resData = await responseUpdated.json();   
                //4. Updated HTML             
                document.querySelector("#like_" + e.target.id).innerHTML = resData.likes;   

        }
    });

    document.body.addEventListener('change',async function(e){
        //search data by Text enter in to Textbox of Search from UI

        if(e.target.matches("[data-search]"))
        {

           $('body').addClass('busy'); 

           let response = fetch(APIPath).then(
                response => {
                    return response.json();
                }).then(
                    data => { 

                        let valueToSearch= $("#txtSearch").val();
                        let searchedData = data;

                        if($("#txtSearch").val() != undefined || $("#txtSearch").val() != '')
                        {
                            searchedData = data.filter(element => element.name.toLowerCase().includes(valueToSearch.toLowerCase()) > 0);                            
                        }

                        let html = '<h1>Toys Store</h1><br/>';
                        html +='<div class="mb-3">'            
                            + '<input data-search  type="input" class="form-control" id="txtSearch" value="'+ valueToSearch +'" placeholder="enter name to search">'
                            + '</div>';
                        
                            if(searchedData.length > 0)
                            {
                                searchedData.forEach(element =>
                                    {
                                        html += '<div class="col" > <div class="card">' 
                                            + '<img width="100" height="100" src="' + element.image + '" class="card-img-top card-img-top-toys" alt="...">'
                                            + '<div class="card-body"> '
                                            + '  <h5 class="card-title"> ' + element.name + '</h5> '
                                            + ' </div>'
                                            + ' <div class="card-footer"> '
                                            + ' <small class="text-muted"><a href="#" id=' + element.id +'  data-link-like >Like</a> ( <span class="likelink" value=' + element.id +' id=like_' + element.id +'>' + element.likes + '</span> )</small>'
                                            + ' </div> '
                                            + ' </div>'
                                            + ' </div><br/>';
                                    });
                            }
                            else{
                                html += '<div class="col" > '
                                      + 'No Matching Data Found!!! '
                                      + ' </div><br/>';
                            }
                        document.querySelector("#app").innerHTML= html; 

                        $('body').removeClass('busy');    

                    });
        }
    });
   
    document.body.addEventListener('submit',async function(e){

        // Validation and can add required css. 
        // Modal popup 
        // Spinner 
        // Search - Functionality -
        // Header and Footer  -- done       
          

         if($("#txtTitle").val() != "" && $("#txtImageUrl").val() != "")
         {
                // Insert/ Submit any data : POST Method        
                e.preventDefault();     

                let data = {       
                "name":  $("#txtTitle").val(),
                "image": $("#txtImageUrl").val(),
                "likes": 0
                }

                const responseUpdated = await fetch(APIPath , {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
                $("#txtTitle").val("");
                $("#txtImageUrl").val("");        
                $("#txtMessage").show(); // similar to display : block 
                $("#myModal").show(); 
        }

     });

    router();
});


