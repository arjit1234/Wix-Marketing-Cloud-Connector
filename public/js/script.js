$(document).ready(function() {
    var selectedProductIds = [];
    $('.product-checkbox').change(function() {
            var productId = $(this).data('product-id');
            if ($(this).is(':checked')) {
                // Add the product ID to the array if checkbox is checked
                selectedProductIds.push(productId);
            } else {
                // Remove the product ID from the array if checkbox is unchecked
                selectedProductIds = selectedProductIds.filter(id => id !== productId);
            }
        });

        // Handle select all checkbox
        $('#selectAll').click(function(){
            if ($(this).is(':checked')) {
              $('.product-checkbox').prop('checked', true);
              //Add all product IDs to the array
              selectedProductIds = $('.product-checkbox').map(function() {
                return $(this).data('product-id');
              })
            } else {
              $('.product-checkbox').prop('checked', false);
              selectedProductIds = []
            }
            console.log(selectedProductIds);
        });

        $('#batchDelete').click(function(event){
          event.preventDefault();
          
          if(selectedProductIds.length > 0) 
          {
              if(confirm('Are you sure want to delete the selected product')) {
                selectedProductIds.forEach( productId => {
                    var deleteUrl = '/deleteProduct/' + productId;
                    window.location.href = deleteUrl;
                })
              }
          }
        });
        $('#updateProductBtn').click(function(event) {
            event.preventDefault(); // Prevent default form submission
    
            // Get form data
            var productId = $('#productId').val();
            var productName = $('#productName').val();
            var productPrice = $('#productPrice').val();
            var productSKU = $('#productSKU').val();
            var imageFile = $('#imageFile')[0].files[0];
    
            // Create FormData object to send file
            var formData = new FormData();
            formData.append('productId', productId);
            formData.append('productName', productName);
            formData.append('productPrice', productPrice);
            formData.append('productSKU', productSKU);
            formData.append('imageFile', imageFile);
    
            // Convert formData to query string
            var searchParams = new URLSearchParams(formData);
    
            // Redirect to updateProduct route with query string
            window.location.href = '/updateProduct/' + productId + '?' + searchParams.toString();
        });
        $('#createproductBtn').click(function(event) {
            event.preventDefault(); // Prevent default form submission
    
            // Get form data
            const productId = $('.productId').val(); 
            const productName = $('.productName').val();
            const productPrice = $('.productPrice').val();
            const productSKU = $('.productSKU').val();
            const productDescription = $('.productDescription').val();
            const imageFile = $('.imageFile')[0].files[0];
            console.log(productId,productName,productPrice,productSKU,imageFile);
            // Create FormData object to send file
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('productName', productName);
            formData.append('productPrice', productPrice);
            formData.append('productSKU', productSKU);
            formData.append('productDescription', productDescription)
            formData.append('imageFile', imageFile);
    
            // Convert formData to query string
            const searchParams = new URLSearchParams(formData);
    
            //Redirect to updateProduct route with query string
            window.location.href = '/addProduct/' + '?' + searchParams.toString();
    
    
        });

   })

// $(document).ready(function() {
//     // Handle form submission
    
// });

// $(document).ready(function() {
    
// })