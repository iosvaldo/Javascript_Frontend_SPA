
import AbstractViews  from "./AbstractViews.js";
import {APIPath} from "/views/Config.js";

export default class extends AbstractViews
{
    constructor(){
        super();
        this.SetTitle("Toys Store");
    }

    async getHtml()
    {
        let response = await fetch(APIPath);
        let data = await response.json();
        
        let html = '<h1>Toys Store</h1><br/>';
        html +='<div class="mb-3">'            
            + '<input data-search type="input" class="form-control" id="txtSearch" placeholder="enter name to search">'
            + '</div>';
            
        data.forEach(element =>
        {
            html += '<div class="col" > <div class="card">' 
                + '<img src="' + element.image + '" class="toysImage card-img-top card-img-top-toys" alt="...">'
                + '<div class="card-body"> '
                + '  <h5 class="card-title"> ' + element.name + '</h5> '
                + ' </div>'
                + ' <div class="card-footer"> '
                + ' <small class="text-muted"><a href="#" id=' + element.id +'  data-link-like >Likes</a> ( <span class="likelink" value=' + element.id +' id=like_' + element.id +'>' + element.likes + '</span> )</small>'
                + ' </div> '
                + ' </div>'
                + ' </div><br/>';
        } );

        return html;
    }
}