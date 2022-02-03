
import AbstractViews  from "./AbstractViews.js";

export default class extends AbstractViews
{
    constructor(){
        super();
        this.SetTitle("Dashboard");
    }

    async getHtml()
    {
        return '<h1>Welcome to Toys App</h1> <p> <a href="/toys" data-link>View Latest Toys</a></p>';
    }
}