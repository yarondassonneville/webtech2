/* ---------------------------------------- FRAMEWORK ---------------------------------- */
var WrapperElement = function(element)
{
    // a wrapper element allow us to extend html dom functionality
    // without changing the behaviour of built-in elements
	
    // this contains the actual selection
    this.element = element;									
    
    // this allows us to see if a selection contains one or more elements
    if(element.length > 1)
    {
        this.isArray = true;
    }
    else
    {
        this.isArray = false;
    }
}

WrapperElement.prototype.toggleClass = function(className)
{
    if(this.isArray)
    {
        for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].classList.toggle(className);
		}
    }
    else {
        this.element.classList.toggle(className);
    }
    return this;
}

WrapperElement.prototype.addClass = function(className)
{
	if(this.isArray)
	{
        // multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].className += " " + className;
		}
	}
	else
	{
        // just one element, so we can manipulate it without looping
		this.element.className = className;
	}
    // return the original WrapperElement, so that we can chain multiple functions like $("li").addClass("test").toggleClass("something");
	return this;
}

WrapperElement.prototype.prepend = function(item, text)
{
    //this.insertBefore(item, this.childNodes[0]);
    var newItem = document.createElement(item);
    newItem.className = "prior-high";
    var textnode = document.createTextNode(text);
    newItem.appendChild(textnode);

    var list = document.getElementById("todo-list");
    list.insertBefore(newItem, list.childNodes[0]);
    
    return this;
}

WrapperElement.prototype.keyup = function(action){
	if(this.isArray)
	{
		// multiple elements, we'll need to loop
		for(var i = 0; i<this.element.length; i++)
		{
			this.element[i].addEventListener('keyup', action);
		}
	}
	else
	{
		// just one element, let's go nuts
		this.element[0].addEventListener('keyup', action);
	}
	return this;
}

WrapperElement.prototype.click = function(callback){
            if(this.isArray){
                for( var i=0; i<this.element.length; i++){
                    this.element[i].addEventListener("click", callback);   
                }
            }
            else {
                   this.element.addEventListener("click", callback);
            }
            return this; //Om verder te kunnen chainen
        }

WrapperElement.prototype.val = function(text)
{    
    if(this.isArray)
    {
        for(var i = 0; i<this.element.length; i++)
		{
			if(text == ""){
                this.element[i].value = "";
    } else {
	   return this.element[i].value;
    }
		}
    }
    else {
        if(text == ""){
        this.element.value = "";
    }else{
	   return this.element.value;
    }
    }
    
    return this;
}

WrapperElement.prototype.css = function(prop, val){
            if(this.isArray){
                for(var i = 0; i<this.element.length; i++){
                     this.element[i].style[prop] = val;
                }
            }
            else {
                this.element[0].style[prop] = val;   
            }
            return this;
        }

WrapperElement.prototype.on = function(event, callback){
            if(this.isArray){
                for( var i=0; i<this.element.length; i++){
                    this.element[i].addEventListener(event, callback);   
                }
            }
            else {
                   this.element[0].addEventListener(event, callback);
            }
            return this; //Om verder te kunnen chainen
        }

var $ = function(selector)
{
	// check if selector is an object already e.g. by passing 'this' on clicks
	if(typeof(selector) == "object")
	{
		return new WrapperElement(selector);
	}

    var selectedItems = document.querySelectorAll(selector);
	var newElement = new WrapperElement(selectedItems);
	return newElement;
}