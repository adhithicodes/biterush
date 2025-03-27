$(document).ready(function() {
    // Cart functionality
    let cart = [];
    
    // Open/close cart
    $('#cart-link').click(function(e) {
        e.preventDefault();
        $('#cart-sidebar').addClass('active');
    });
    
    $('.close-cart').click(function() {
        $('#cart-sidebar').removeClass('active');
    });
    
    // Add to cart
    $(document).on('click', '.add-to-cart', function() {
        const name = $(this).data('name');
        const price = parseInt($(this).data('price'));
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        updateCart();
        $('#cart-sidebar').addClass('active');
    });
    
    // Remove from cart
    $(document).on('click', '.remove-item', function() {
        const name = $(this).data('name');
        cart = cart.filter(item => item.name !== name);
        updateCart();
    });
    
    // Update cart display
    function updateCart() {
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price} × ${item.quantity}</p>
                    </div>
                    <div class="cart-item-price">₹${itemTotal}</div>
                    <button class="remove-item" data-name="${item.name}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        if (cart.length === 0) {
            cartHTML = '<p>Your cart is empty</p>';
        }
        
        $('#cart-items').html(cartHTML);
        $('#cart-total-price').text('₹' + total);
        $('.cart-count').text(cart.reduce((sum, item) => sum + item.quantity, 0));
    }
    
    // Smooth scrolling for navigation
    $('nav a').on('click', function(e) {
        if ($(this).attr('href') !== '#cart') {
            e.preventDefault();
            const target = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 500);
        }
    });
    
    // Make restaurant cards clickable
    $('.restaurant-card').on('click', function() {
        // In a real app, this would navigate to restaurant page
        alert('Navigating to restaurant page');
    });
});