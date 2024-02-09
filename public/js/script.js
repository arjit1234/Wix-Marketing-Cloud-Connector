//   $(document).ready(function() {
//     // Handle form submission
//     $('#updateProductBtn').click(function(event) {
//         event.preventDefault(); // Prevent default form submission

//         // Get form data
//         var productId = $('#productId').val();
//         var productName = $('#productName').val();
//         var productPrice = $('#productPrice').val();
//         var productSKU = $('#productSKU').val();
//         var imageFile = $('#imageFile')[0].files[0];

//         // Create FormData object to send file
//         var formData = new FormData();
//         formData.append('productId', productId);
//         formData.append('productName', productName);
//         formData.append('productPrice', productPrice);
//         formData.append('productSKU', productSKU);
//         formData.append('imageFile', imageFile);

//         // Convert formData to query string
//         var searchParams = new URLSearchParams(formData);

//         // Redirect to updateProduct route with query string
//         window.location.href = '/updateProduct/' + productId + '?' + searchParams.toString();
//     });
// });
