// Data produk
const products = {
    1: { name: "Apel Merah", price: 25000 },
    2: { name: "Pisang Mas", price: 15000 },
    3: { name: "Jeruk Manis", price: 20000 },
    4: { name: "Anggur Hijau", price: 35000 },
    5: { name: "Mangga Harum Manis", price: 30000 },
    6: { name: "Semangka Merah", price: 18000 }
};

// Keranjang belanja
let cart = [];
let cartCount = 0;

// Fungsi untuk scroll ke bagian produk
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Fungsi untuk menambah produk ke keranjang
function addToCart(productId) {
    const product = products[productId];
    
    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    // Update jumlah keranjang
    cartCount += 1;
    updateCartCount();
    
    // Tampilkan notifikasi
    showNotification(`✅ ${product.name} ditambahkan ke keranjang`);
}

// Fungsi untuk update jumlah keranjang
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Fungsi untuk menampilkan keranjang
function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Kosongkan keranjang
    cartItems.innerHTML = '';
    
    // Hitung total
    let total = 0;
    
    // Tambahkan item ke keranjang
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <div>
                <p>Rp ${itemTotal.toLocaleString()}</p>
                <button onclick="removeFromCart(${item.id})" style="color: #ff6b6b; border: none; background: none; cursor: pointer;">
                    Hapus
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    cartTotal.textContent = `Rp ${total.toLocaleString()}`;
    
    // Tampilkan modal
    modal.style.display = 'block';
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        
        cart.splice(itemIndex, 1);
        updateCartCount();
        showCart(); // Refresh tampilan keranjang
    }
}

// Fungsi untuk menutup modal
function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Event listener untuk form kontak
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('Iman').value;
    const email = document.getElementById('nami22711@gmail.com').value;
    const message = document.getElementById('message').value;
    
    // Simulasi pengiriman pesan
    showNotification('📧 Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
    
    // Reset form
    this.reset();
});

// Event listener untuk ikon keranjang
document.querySelector('.cart-icon').addEventListener('click', showCart);

// Event listener untuk tombol close modal
document.querySelector('.close').addEventListener('click', closeModal);

// Event listener untuk klik di luar modal
window.addEventListener('click', function(e) {
    const modal = document.getElementById('cartModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Animasi CSS untuk notifikasi
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll untuk navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});