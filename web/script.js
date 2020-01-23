var products = [];
var productId = 1;
var cartproducts=[];
var cartproductsId=1;
var price=0;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var cartdiv=document.getElementById("cart");
var descr = document.getElementById("descr");
var aAddProduct = document.getElementById("aAddProduct");

var local1=JSON.parse(localStorage.getItem("0"));
if(local1)
{
	products=local1;
}
var local=JSON.parse(localStorage.getItem("1"));
if(local)
{
	cartproducts=local;
}
function addProducttoArray()
{
	var objProduct = new Object();
	objProduct.Id = productId;
 	objProduct.Name = document.getElementById("txtProductName").value;
    objProduct.Desc = document.getElementById("txtProductDesc").value;
	objProduct.Price = document.getElementById("txtProductPrice").value;
	objProduct.Quantity = document.getElementById("txtProductQuantity").value;
	objProduct.Image=document.getElementById("txtProductImage").value;
    products.push(objProduct);
	addProducttoDOM(objProduct);
    deleteNewProductPanel();
    localStorage.setItem("0",JSON.stringify(products));
	productId++;

}
function addProducttocartArray(selectedProductIndex)
{
    console.log(selectedProductIndex);
	var objProduct = new Object();
	var flag=0;
	objProduct.Id = products[selectedProductIndex].Id;
 	objProduct.Name = products[selectedProductIndex].Name;
 	objProduct.Desc = products[selectedProductIndex].Desc;
	objProduct.Price = products[selectedProductIndex].Price;
	objProduct.Image=products[selectedProductIndex].Image;
	objProduct.cartQuantity=1;
	for(var i=0;i<cartproducts.length;i++)
	{
		if(objProduct.Id== cartproducts[i].Id)
		{
			alert("already in cart");
			flag=1;
		}
	}
	if(flag==0)
	{
     products[selectedProductIndex].Quantity=parseInt(products[selectedProductIndex].Quantity)-1;
	localStorage.setItem("0",JSON.stringify(products));
	objProduct.Quantity = products[selectedProductIndex].Quantity;
    cartproducts.push(objProduct);
	console.log(cartproducts);
	cartproductsId++;
    }
     localStorage.setItem("1",JSON.stringify(cartproducts));

}
function addProducttoDOM(objProduct)
{  	
	//create a new DIV for this product 
	var divProduct = document.createElement("div");
	console.log(productId);
	divProduct.setAttribute("id", productId);
	
	//create a anchor for product name
    var aProductImage = document.createElement("img");
	aProductImage.setAttribute("src",objProduct.Image);
	aProductImage.setAttribute("height","60px");
	aProductImage.setAttribute("height","60px");
	divProduct.appendChild(aProductImage);

	insertBlankLine(divProduct);

	var aProductName = document.createElement("a");
	aProductName.setAttribute("href","#");
	aProductName.innerHTML = objProduct.Name;
	divProduct.appendChild(aProductName);
	
	insertBlankLine(divProduct);
	
	//create a label for product description
	var lblProductName = document.createElement("label");
	lblProductName.innerHTML = objProduct.Desc;
    divProduct.appendChild(lblProductName);
	
    insertBlankLine(divProduct);
		
	//create a anchor for deleting this product
	var aDelete = document.createElement("a");
	aDelete.setAttribute("href","#");
	aDelete.innerHTML = "Delete";
	divProduct.appendChild(aDelete);

	var edit = document.createElement("a");
	edit.setAttribute("href","#");
	edit.setAttribute("style","margin:0px 0px 0px 10px");
	edit.innerHTML = "Edit";
	divProduct.appendChild(edit);

	var cart = document.createElement("a");
	cart.setAttribute("href","#");
	cart.setAttribute("style","margin:0px 0px 0px 10px");
	cart.innerHTML = "cart";
	divProduct.appendChild(cart);

	// var stock = document.createElement("a");
	// stock.setAttribute("href","#");
	// stock.setAttribute("style","margin:0px 0px 0px 10px");
	// stock.innerHTML = "stock";
	// divProduct.appendChild(stock);

	edit.addEventListener("click",function(event)
		        {
		        	var targetParent = event.target.parentNode;
					var selectedProductIndex = getProductIndex(parseInt(targetParent.id));
					createNewEditPanel(selectedProductIndex,lblProductName,aProductName,edit); 

                    edit.setAttribute("style","visibility:hidden");
					//removeFromProductsArray(selectedProductIndex);
		        }
		);
     
     cart.addEventListener("click",function(event)
		        { 
		        	var targetParent = event.target.parentNode;
					var selectedProductIndex = getProductIndex(parseInt(targetParent.id));
					//console.log(selectedProductIndex);
					console.log(targetParent);
                    addProducttocartArray(selectedProductIndex);
                    
					//removeFromProductsArray(selectedProductIndex);
		        }
		);

     /*stock.addEventListener("click",function(event)
		        { 
		        	var targetParent = event.target.parentNode;
					var selectedProductIndex = getProductIndex(parseInt(targetParent.id));
					//console.log(selectedProductIndex);
					products[selectedProductIndex].Q=
                    
					//removeFromProductsArray(selectedProductIndex);
		        }
		);*/

	aDelete.addEventListener("click",function(event)
									  {
									   // To access the parent node of the element which is clicked
									   // Ist method
										  // var selectedProductIndex = getProductIndex(parseInt(divProduct.id));
										  // removeFromProductsArray(selectedProductIndex);
                                          // divProduct.parentNode.removeChild(divProduct);
										  
									   // 2nd Method 
										   var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
										     for(var i=0;i<cartproducts.length;i++)
                                                    {
                                                    	if(products[selectedProductIndex].Id==cartproducts[i].Id)
                                                    	{
										  	 	removeFromProductsArray1(i);
										  	 	console.log("hii");
										  	 	localStorage.setItem("1",JSON.stringify(cartproducts));
										  	 }
										  }
										   removeFromProductsArray(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);
										   localStorage.setItem("0",JSON.stringify(products)); 
										  
									  }
							);
							
    aProductName.addEventListener("click",function(event)
									  {
										 var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
										 console.log(event.target.parentNode.id);
										 getProductDetails(selectedProductIndex);
									  }
							     );
									  
	divListProducts.appendChild(divProduct);
	
    insertBlankLine(divProduct);
	insertBlankLine(divProduct);

	unHideAddNewProductLink();
}
function addProducttocartDOM(objProduct)
{  	
	//create a new DIV for this product 
    var d=parseInt(objProduct.Quantity);
    console.log(objProduct.Quantity);
    //objProduct.Quantity=1;
	var localprice;
	var divProduct = document.createElement("div");
	divProduct.setAttribute("id",objProduct.Id);

	var aProductImage = document.createElement("img");
	aProductImage.setAttribute("src",objProduct.Image);
	aProductImage.setAttribute("height","60px");
	aProductImage.setAttribute("height","60px"); 
	divProduct.appendChild(aProductImage);
	
	//create a anchor for product name
	var aProductName = document.createElement("a");
	aProductName.setAttribute("href","#");
	aProductName.innerHTML = objProduct.Name;
	aProductName.setAttribute("style","margin:0px 0px 0px 10px");
	divProduct.appendChild(aProductName);
	
	//insertBlankLine(divProduct);
	
	//create a label for product description
	var sub = document.createElement("a");
	sub.setAttribute("href","#");
	sub.setAttribute("style","margin:0px 0px 0px 10px");
	sub.innerHTML = "-";
    divProduct.appendChild(sub);

	var label = document.createElement("label");
	var change=label;
	label.setAttribute("style","margin:0px 0px 0px 10px");
	label.innerHTML = objProduct.cartQuantity;
    divProduct.appendChild(label);

     var add = document.createElement("a");
	add.setAttribute("style","margin:0px 0px 0px 10px");
	add.setAttribute("href","#");
	add.innerHTML = "+";
    divProduct.appendChild(add);


    var aDelete = document.createElement("a");
	aDelete.setAttribute("href","#");
	aDelete.setAttribute("style","margin:0px 0px 0px 10px");
	aDelete.innerHTML = "Delete";
	divProduct.appendChild(aDelete);

	insertBlankLine(divProduct);
    insertBlankLine(divProduct);

    add.addEventListener("click",function(event)
									  {
									  	var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
									    console.log(d);
                                         if(d<=0)
									  	 {
									  	 	alert("Out Of Stock");
                                             return;
									  	 }
										 objProduct.cartQuantity=parseInt(objProduct.cartQuantity)+1;
										 label.innerHTML=objProduct.cartQuantity;
										 products[selectedProductIndex].Quantity=d-1;
										 d=d-1;
										 objProduct.Quantity=d;
										 localStorage.setItem("0",JSON.stringify(products));
										 localStorage.setItem("1",JSON.stringify(cartproducts));

									  }
							     );
     sub.addEventListener("click",function(event)
									  {
									  	var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
									  	console.log(d);
									  	 if(objProduct.cartQuantity<=0)
									  	 {
                                             return;
									  	 }
										 objProduct.cartQuantity=parseInt(objProduct.cartQuantity)-1;
										 label.innerHTML=objProduct.cartQuantity;
										 products[selectedProductIndex].Quantity=d+1;
										 d=d+1;
										 objProduct.Quantity=d;
										 localStorage.setItem("0",JSON.stringify(products));
										 localStorage.setItem("1",JSON.stringify(cartproducts));
									  }
							     );

     aDelete.addEventListener("click",function(event)
									  {
									  	   var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
									  	   products[selectedProductIndex].Quantity=d+parseInt(objProduct.cartQuantity);
										   var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex1(parseInt(targetParent.id)); 
										   removeFromProductsArray1(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);
										   localStorage.setItem("0",JSON.stringify(products));
										   localStorage.setItem("1",JSON.stringify(cartproducts));
									  }
							);

     cartdiv.appendChild(divProduct);
}

function fun()
  {
  	  console.log(cartproducts.length);
  	  price=0;
  	  for(var i=0;i<cartproducts.length;i++)
  	  	 {
  	  	 	var localprice=parseInt(cartproducts[i].Price)*parseInt(cartproducts[i].cartQuantity);
  	  	 	console.log(localprice);
  	  	 	price=parseInt(price)+localprice;
  	  	 }
  	  var price1=document.getElementById("price");
  	  price1.innerHTML=parseInt(price);
  	  localStorage.setItem("2",JSON.stringify(price));
  }
function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == id) 
			return i;
    }
} 
function getProductIndex1(id) 
{
    for (var i = 0; i < cartproducts.length; i++) 
	{
        if (cartproducts[i].Id == id) 
			return i;
    }
} 

function getProductDetails(selectedProductIndex)
{
 
  alert("Name : " + products[selectedProductIndex].Name + "  Desc: " + products[selectedProductIndex].Desc + 
               "   Price : " + products[selectedProductIndex].Price + "  Quantity: " + products[selectedProductIndex].Quantity);
					 
   
}

function removeFromProductsArray(selectedProductIndex)
{
	products.splice(selectedProductIndex,1);
	console.log(products);
}

function removeFromProductsArray1(selectedProductIndex)
{
	cartproducts.splice(selectedProductIndex,1);
	console.log(cartproducts);
}

function deleteNewProductPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}
function deleteNewEditPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}

function hideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:hidden");
}

function unHideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:visible");
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function createNewProductPanel()
{
	hideAddNewProductLink();

	/* Label - Product Quantity */ 
	var lblAddProduct = document.createElement("label");
	lblAddProduct.innerHTML = "Add New Product";
	lblAddProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");	
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","number");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","number");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	txtProductQuantity.setAttribute("min","0");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var txtProductImage = document.createElement("input");
	txtProductImage.setAttribute("type","text");
	txtProductImage.setAttribute("id","txtProductImage");
    txtProductImage.setAttribute("placeholder","Enter Image src");	
	txtProductImage.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductImage);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Add Product */ 
	var btnAddButton = document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML = "Add Product";
	divAddProduct.appendChild(btnAddButton);		
		
    btnAddButton.addEventListener("click", function(event)
											{
												if(txtProductName.value==""||txtProductQuantity.value==""||txtProductPrice==""||txtProductDesc=="")
												{
													alert("fill all information");
													return;
												}
												else
												addProducttoArray();
											}
								 );	
}
function createNewEditPanel(selectedProductIndex,lblProductName,aProductName,edit)
{
	hideAddNewProductLink();

	/* Label - Product Quantity */ 
	var lblAddProduct = document.createElement("label");
	lblAddProduct.innerHTML = "Edit Product";
	lblAddProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("value",products[selectedProductIndex].Name);	
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder",products[selectedProductIndex].Desc);		
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","number");
	txtProductPrice.setAttribute("id","txtProductPrice");
   txtProductPrice.setAttribute("value",products[selectedProductIndex].Price);	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","number");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("value",products[selectedProductIndex].Quantity);	
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	var txtProductImage = document.createElement("input");
	txtProductImage.setAttribute("type","text");
	txtProductImage.setAttribute("id","txtProductImage");
    txtProductImage.setAttribute("value",products[selectedProductIndex].Image);	
	txtProductImage.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductImage);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Add Product */ 
	var btnAddButton = document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML = "Edit Product";
	divAddProduct.appendChild(btnAddButton);		
		
    btnAddButton.addEventListener("click", function(event)
											{
												if(txtProductName.value==""||txtProductQuantity.value==""||txtProductPrice.value==""||txtProductDesc.value=="")
												{
													alert("fill all information");
													return;
												}
												else
												{
													products[selectedProductIndex].Name=txtProductName.value;
													products[selectedProductIndex].Desc=txtProductDesc.value;
                                                    products[selectedProductIndex].Price=txtProductPrice.value;
                                                    products[selectedProductIndex].Quantity=parseInt(txtProductQuantity.value)+parseInt(products[selectedProductIndex].Quantity);
                                                    products[selectedProductIndex].Image=txtProductImage.value;
                                                    for(var i=0;i<cartproducts.length;i++)
                                                    {
                                                    	if(products[selectedProductIndex].Id==cartproducts[i].Id)
                                                    	{
                                                    		cartproducts[i].Name=products[selectedProductIndex].Name;
                                                    		cartproducts[i].Desc=products[selectedProductIndex].Desc;
                                                    		cartproducts[i].Price=products[selectedProductIndex].Price;
                                                    		cartproducts[i].Quantity=products[selectedProductIndex].Quantity;
                                                    		cartproducts[i].Image=products[selectedProductIndex].Image;
                                                    	}
                                                    }
                                                    
                                                    lblProductName.innerHTML=txtProductDesc.value;
                                                    aProductName.innerHTML=txtProductName.value;
                                                    localStorage.setItem("0",JSON.stringify(products));
                                                    localStorage.setItem("1",JSON.stringify(cartproducts));
                                                    location.reload();
                                                    deleteNewEditPanel();
                                                    unHideAddNewProductLink();
												}
												edit.setAttribute("style","visibility:visible");
												edit.setAttribute("style","margin:0px 0px 0px 10px");
											}
								 );	
}