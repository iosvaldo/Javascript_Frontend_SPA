
import AbstractViews  from "./AbstractViews.js";

export default class extends AbstractViews
{
    constructor(){
        super();
        this.SetTitle("Add To Store");
    }

    async getHtml()
    {
        let html = '<h1>Add to Store</h1><br/>';           

        html +=  '<form id="frmAddToStore" name="frmAddToStore"  class="requires-validation" method="post" >'
                + '<div class="row mb-3">'
                + '<label id="txtMessage"  class="toysHideMessage col-sm-5 col-form-label">Toy has been added successfully.</label>'
                + '</div>'
                + '<div class="row mb-3">'
                + '<label for="txtTitle" class="col-sm-2 col-form-label">Title</label>'
                + '<div class="col-sm-10">'
                + '<input type="input" class="form-control" id="txtTitle" required >'               
                + '<div class="invalid-feedback">'
                + 'Please provide a valid Title.'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="row mb-3">'
                + '<label for="txtImageUrl" class="col-sm-2 col-form-label">Image URL</label>'
                + '<div class="col-sm-10">'
                + '<input type="input" class="form-control" id="txtImageUrl" required >'
                + '</div>'
                + '</div>'
                + '<div class="row mb-3">'
                + '<label for="inputImageUrl" class="col-sm-2 col-form-label"></label>'
                + '<div class="col-sm-10">'
                + '<button type="submit" class="btn btn-primary" >Add To Store</button>&nbsp;'
                + '<button type="button" class="btn btn-primary" data-button-click>Cancel</button>'
               
                + '</div>'
                + '</div>'
                + '</form>';

        return html;

    }
}