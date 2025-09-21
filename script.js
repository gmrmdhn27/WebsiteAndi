// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	});
});

// Button interaction
document.querySelectorAll(".btn-outline").forEach((btn) => {
	btn.addEventListener("click", function () {
		this.textContent = "LIHAT KERANJANG";
		this.style.background = "#28a745";
		this.style.borderColor = "#28a745";
		this.style.color = "white";

		setTimeout(() => {
			this.textContent = "Pilih";
			this.style.background = "transparent";
			this.style.borderColor = "#222";
			this.style.color = "#222";
		}, 1500);
	});
});

const navbarNav = document.querySelector(".nav-links");
document.querySelector("#sidebar").onclick = () => {
	navbarNav.classList.toggle("active");
};

// text typing
const texts = [
	"TEMUKAN KACAMATAMU",
	"BEBAS PILIH DESAIN",
	"DENGAN HASIL YANG PRESISI",
	"VISI YANG SEMPURNA",
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";
const typingElement = document.getElementById("typing-text");

function type() {
	if (count === texts.length) {
		count = 0; // kembali ke teks pertama
	}
	currentText = texts[count];
	letter = currentText.slice(0, ++index);

	typingElement.textContent = letter;

	if (letter.length === currentText.length) {
		// setelah selesai mengetik, tunggu 2 detik lalu hapus
		setTimeout(() => erase(), 2000);
	} else {
		setTimeout(type, 120); // kecepatan mengetik
	}
}

function erase() {
	letter = currentText.slice(0, --index);
	typingElement.textContent = letter;

	if (letter.length === 0) {
		count++;
		index = 0;
		setTimeout(type, 500); // jeda sebelum mulai teks berikutnya
	} else {
		setTimeout(erase, 80); // kecepatan menghapus
	}
}

// mulai animasi
type();

let cartCount = 0;

// Ambil semua tombol "Pilih"
const buttons = document.querySelectorAll(".product .btn");
const cartBadge = document.getElementById("cart-count");

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		// Tambahkan jumlah item ke keranjang
		cartCount++;

		// Update tampilan badge
		cartBadge.textContent = cartCount;
		cartBadge.style.display = "inline-block"; // tampilkan badge
	});
});

const cartSidebar = document.querySelector(".cart-sidebar");
const openCart = document.querySelector(".cart-icon");
const closeCart = document.querySelector(".close-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// Format harga Rupiah
function formatRupiah(amount) {
	if (!amount || isNaN(amount)) return "Rp 0";
	return "Rp " + amount.toLocaleString("id-ID");
}

// Buka Sidebar
openCart.addEventListener("click", (e) => {
	e.preventDefault();
	cartSidebar.classList.add("active");
});

// Tutup Sidebar
closeCart.addEventListener("click", () => {
	cartSidebar.classList.remove("active");
});

// Saat tombol pilih produk diklik
buttons.forEach((button) => {
	button.addEventListener("click", (e) => {
		const productElement = e.target.closest(".product");
		const product = {
			name: productElement.querySelector("h3").textContent.trim(),
			price:
				parseInt(
					productElement
						.querySelector(".product-price")
						.textContent.replace(/[^\d]/g, "")
				) || 0,
			image: productElement.querySelector("img").src,
			quantity: 1,
		};

		// Cek apakah produk sudah ada
		const existingProduct = cart.find((item) => item.name === product.name);

		if (existingProduct) {
			existingProduct.quantity++;
		} else {
			cart.push(product);
		}

		updateCart();
	});
});

// Update isi keranjang
function updateCart() {
	cartItemsContainer.innerHTML = "";

	if (cart.length === 0) {
		cartItemsContainer.innerHTML =
			'<p class="empty-msg">Keranjang masih kosong</p>';
		cartBadge.style.display = "none";
		cartTotal.textContent = "Rp 0";
		return;
	}

	let total = 0;

	cart.forEach((item, index) => {
		total += item.price * item.quantity;

		const cartItem = document.createElement("div");
		cartItem.classList.add("cart-item");
		cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div class="price">${formatRupiah(item.price)}</div>
        <div class="quantity-controls">
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
        </div>
        <button class="remove-item">Hapus</button>
      </div>
    `;

		// Tambah jumlah
		cartItem.querySelector(".increase").addEventListener("click", () => {
			item.quantity++;
			updateCart();
		});

		// Kurangi jumlah
		cartItem.querySelector(".decrease").addEventListener("click", () => {
			if (item.quantity > 1) {
				item.quantity--;
			} else {
				cart.splice(index, 1);
			}
			updateCart();
		});

		// Hapus item
		cartItem.querySelector(".remove-item").addEventListener("click", () => {
			cart.splice(index, 1);
			updateCart();
		});

		cartItemsContainer.appendChild(cartItem);
	});

	// Update badge jumlah
	const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
	cartBadge.textContent = totalQuantity;
	cartBadge.style.display = totalQuantity > 0 ? "inline-block" : "none";

	// Update total harga
	cartTotal.textContent = formatRupiah(total);
}
