// Preloader
window.addEventListener("load", () => {
	const preloader = document.getElementById("preloader");
	if (preloader) {
		setTimeout(() => {
			preloader.classList.add("loaded");
		}, 800); // Wait a bit for effect
	}
});

// Init Lenis Smooth Scroll
if (typeof Lenis !== "undefined") {
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		direction: "vertical",
		gestureDirection: "vertical",
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: false,
		touchMultiplier: 2,
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
}

// Init Particles.js
if (
	typeof particlesJS !== "undefined" &&
	document.getElementById("particles-js")
) {
	particlesJS("particles-js", {
		particles: {
			number: { value: 80, density: { enable: true, value_area: 800 } },
			color: { value: "#eceedf" },
			shape: { type: "circle" },
			opacity: { value: 0.5, random: false },
			size: { value: 3, random: true },
			line_linked: {
				enable: true,
				distance: 150,
				color: "#eceedf",
				opacity: 0.4,
				width: 1,
			},
			move: {
				enable: true,
				speed: 6,
				direction: "none",
				random: false,
				straight: false,
				out_mode: "out",
				bounce: false,
			},
		},
		interactivity: {
			detect_on: "canvas",
			events: {
				onhover: { enable: true, mode: "repulse" },
				onclick: { enable: true, mode: "push" },
				resize: true,
			},
			modes: {
				repulse: { distance: 100, duration: 0.4 },
			},
		},
		retina_detect: true,
	});
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			// Check if Lenis is active (global instance)
			// Ideally lenis instance should be global, but for now we fallback or use standard scroll if lenis var scope issue
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

// Sidebar toggle
const sidebar = document.querySelector("#sidebar");
const navbarNav = document.querySelector(".nav-links");
if (sidebar && navbarNav) {
	sidebar.onclick = () => {
		navbarNav.classList.toggle("active");
	};
}

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
	if (!typingElement) return;
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
	if (!typingElement) return;
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

// --- DYNAMIC PRODUCT LOADING ---
// Default Products Data
const defaultProducts = [
	{
		name: "Minimalist Frame",
		price: 350000,
		image: "/assets/minimalist.jpg",
		desc: "Frame ringan dengan desain minimalis untuk penggunaan sehari-hari",
	},
	{
		name: "Classic Sunglasses",
		price: 600000,
		image: "/assets/classic.jpg",
		desc: "Kacamata hitam klasik dengan perlindungan UV maksimal",
	},
	{
		name: "Progressive Series",
		price: 1300000,
		image: "/assets/progresive.jpg",
		desc: "Series premium untuk profesional dan membaca dengan material berkualitas tinggi",
	},
	{
		name: "Vintage Collection",
		price: 850000,
		image: "/assets/vintage.jpg",
		desc: "Koleksi vintage dengan sentuhan modern, cocok untuk gaya retro",
	},
	{
		name: "Sports Frame",
		price: 750000,
		image: "/assets/sport.jpg",
		desc: "Frame tahan lama untuk aktivitas olahraga dengan teknologi anti-slip",
	},
	{
		name: "Blue Light Filter",
		price: 450000,
		image: "/assets/blueLight.jpg",
		desc: "Perlindungan mata dari cahaya biru gadget untuk pekerja digital",
	},
];

// Initialize Products
function initProducts() {
	if (!localStorage.getItem("products")) {
		localStorage.setItem("products", JSON.stringify(defaultProducts));
	}
}

// Render Products
function renderProducts() {
	const products = JSON.parse(localStorage.getItem("products"));
	const container = document.querySelector(".product-grid");
	if (!container) return; // Guard clause if on a page without product grid

	container.innerHTML = "";

	products.forEach((p) => {
		const productHTML = `
            <div class="product" data-aos="fade-up" data-aos-duration="1200">
                <div class="product-img">
                    <img src="${
											p.image
										}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />
                </div>
                <h3>${p.name}</h3>
                <div class="product-price">Rp ${p.price.toLocaleString(
									"id-ID"
								)}</div>
                <p>${p.desc}</p>
                <button class="btn btn-outline" onclick="addToCart('${
									p.name
								}', ${p.price}, '${p.image}')">Pilih</button>
            </div>
        `;
		container.innerHTML += productHTML;
	});

	// Refresh AOS animations
	if (typeof AOS !== "undefined") {
		AOS.refresh();
	}

	// Init Vanilla Tilt
	if (typeof VanillaTilt !== "undefined") {
		VanillaTilt.init(document.querySelectorAll(".product"), {
			max: 15,
			speed: 400,
			glare: true,
			"max-glare": 0.2,
		});
	}
}

// Run init
initProducts();
renderProducts();

// --- CART LOGIC ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
const cartBadge = document.getElementById("cart-count");
// Elements might not exist on all pages
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Update badge on load
if (cartBadge) {
	cartBadge.textContent = cartCount;
	if (cartCount > 0) cartBadge.style.display = "inline-block";
}

// Format harga Rupiah
function formatRupiah(amount) {
	if (!amount || isNaN(amount)) return "Rp 0";
	return "Rp " + amount.toLocaleString("id-ID");
}

// Add to Cart Function (Global)
window.addToCart = function (name, price, image) {
	const product = { name, price, image, quantity: 1 };
	const existingProduct = cart.find((item) => item.name === product.name);

	if (existingProduct) {
		existingProduct.quantity++;
	} else {
		cart.push(product);
	}

	saveCart();
	updateBadge();

	// Optional: Show feedback
	Swal.fire({
		icon: "success",
		title: "Sukses",
		text: "Produk ditambahkan ke keranjang",
		timer: 1500,
		showConfirmButton: false,
	});
};

function saveCart() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

function updateBadge() {
	cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	if (cartBadge) {
		cartBadge.textContent = cartCount;
		cartBadge.style.display = cartCount > 0 ? "inline-block" : "none";
	}
}

// Update isi keranjang (Only runs if container exists)
function updateCart() {
	if (!cartItemsContainer) return;

	cartItemsContainer.innerHTML = "";
	// Re-read from storage to ensure sync
	cart = JSON.parse(localStorage.getItem("cart")) || [];

	if (cart.length === 0) {
		cartItemsContainer.innerHTML =
			'<p class="empty-msg">Keranjang masih kosong</p>';
		if (cartTotal) cartTotal.textContent = "Rp 0";
		return;
	}

	let total = 0;

	cart.forEach((item, index) => {
		total += item.price * item.quantity;

		const cartItem = document.createElement("div");
		cartItem.classList.add("cart-item");

		// Layout adjusted for both sidebar (if ever used) and full page
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
        <button class="remove-item" style="color:red; margin-top:5px;">Hapus</button>
      </div>
    `;

		// Tambah jumlah
		cartItem.querySelector(".increase").addEventListener("click", () => {
			item.quantity++;
			saveCart();
			updateBadge();
			updateCart();
		});

		// Kurangi jumlah
		cartItem.querySelector(".decrease").addEventListener("click", () => {
			if (item.quantity > 1) {
				item.quantity--;
			} else {
				cart.splice(index, 1);
			}
			saveCart();
			updateBadge();
			updateCart();
		});

		// Hapus item
		cartItem.querySelector(".remove-item").addEventListener("click", () => {
			cart.splice(index, 1);
			saveCart();
			updateBadge();
			updateCart();
		});

		cartItemsContainer.appendChild(cartItem);
	});

	// Update total harga
	if (cartTotal) cartTotal.textContent = formatRupiah(total);
}

// Init Cart Page
document.addEventListener("DOMContentLoaded", () => {
	// Check if we are on a page that needs cart update
	if (document.getElementById("cart-items")) {
		updateCart();
	}
	// Also init history if on orders page
	if (document.getElementById("history-items")) {
		window.loadHistory();
	}
});

// Checkout Logic
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutForm = document.getElementById("checkout-form");
const modalTotal = document.getElementById("modal-total");
const closeCheckout = document.getElementById("close-checkout");

if (checkoutBtn) {
	checkoutBtn.addEventListener("click", () => {
		if (cart.length === 0) {
			Swal.fire({
				icon: "warning",
				title: "Oops...",
				text: "Keranjang belanja Anda masih kosong!",
				confirmButtonColor: "#443627",
			});
			return;
		}

		// Calculate total from cart
		const total = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		if (modalTotal) modalTotal.textContent = formatRupiah(total);

		if (checkoutModal) checkoutModal.classList.add("active");
	});
}

if (closeCheckout && checkoutModal) {
	closeCheckout.addEventListener("click", () => {
		checkoutModal.classList.remove("active");
	});
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
	if (checkoutModal && e.target === checkoutModal) {
		checkoutModal.classList.remove("active");
	}
});

// Handle Form Submit with Midtrans
if (checkoutForm) {
	checkoutForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const name = document.getElementById("name").value;
		const phone = document.getElementById("phone").value;
		const address = document.getElementById("address").value;

		const orderId = "ORDER-" + new Date().getTime();

		let total = 0;
		// Prepare items for Midtrans
		const items = cart.map((item) => {
			total += item.price * item.quantity;
			return {
				id: item.name,
				price: item.price,
				quantity: item.quantity,
				name: item.name,
			};
		});

		// Request Token from Backend
		try {
			const response = await fetch("http://localhost:3000/api/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					order_id: orderId,
					gross_amount: total,
					customer_details: {
						first_name: name,
						email: "customer@example.com",
						phone: phone,
						shipping_address: {
							address: address,
						},
					},
					item_details: items,
				}),
			});

			const data = await response.json();

			if (data.token) {
				// 1. SAVE ORDER AS PENDING IMMEDIATELY
				const orderData = {
					id: orderId,
					date: new Date().toLocaleDateString("id-ID"),
					name: name,
					phone: phone,
					address: address,
					payment: "Midtrans",
					items: cart,
					total: total,
					status: "pending", // Default pending
					snapToken: data.token, // Save token to resume later
				};

				const orders = JSON.parse(localStorage.getItem("orders")) || [];
				orders.push(orderData);
				localStorage.setItem("orders", JSON.stringify(orders));

				// 2. REDIRECT TO ORDERS PAGE (DEFERRED PAYMENT)
				// 2. REDIRECT TO ORDERS PAGE (DEFERRED PAYMENT)
				// Clear UI immediately
				if (checkoutModal) checkoutModal.classList.remove("active");
				checkoutForm.reset();

				// Clear Cart immediately
				cart = [];
				saveCart();
				updateBadge();
				if (document.getElementById("cart-items")) updateCart();

				Swal.fire({
					icon: "success",
					title: "Pesanan Dibuat!",
					text: "Silahkan selesaikan pembayaran di halaman Riwayat Pesanan.",
					confirmButtonColor: "#28a745",
				}).then(() => {
					window.location.href = "/orders";
				});
			}
		} catch (error) {
			console.error(error);
			Swal.fire(
				"Error",
				"Gagal memproses pembayaran. Pastikan server backend berjalan.",
				"error"
			);
		}
	});
}

function updateOrderStatus(orderId, newStatus) {
	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	const orderIndex = orders.findIndex((o) => o.id === orderId);
	if (orderIndex !== -1) {
		orders[orderIndex].status = newStatus;
		localStorage.setItem("orders", JSON.stringify(orders));
	}
}

// --- HISTORY LOGIC ---
const historyItemsContainer = document.getElementById("history-items");

// Initialize: Sanitize LocalStorage
(function sanitizeOrders() {
	let orders = JSON.parse(localStorage.getItem("orders")) || [];
	const validOrders = orders.filter((o) => o.id && o.id !== "undefined");

	if (orders.length !== validOrders.length) {
		localStorage.setItem("orders", JSON.stringify(validOrders));
	}
})();

// Load History
window.loadHistory = function () {
	if (!historyItemsContainer) return;

	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	historyItemsContainer.innerHTML = "";

	if (orders.length === 0) {
		historyItemsContainer.innerHTML =
			'<p class="empty-msg">Belum ada riwayat pesanan</p>';
		return;
	}

	// Sort by newest
	orders.reverse().forEach((order) => {
		const isPaid = order.status === "paid";
		const isCancelled = order.status === "cancelled";

		// Determine status display
		let statusClass = "status-pending"; // Default
		let statusText = "Menunggu Pembayaran";
		let statusColor = "background:#fff3cd; color:#856404;";

		if (isPaid) {
			statusClass = "status-paid";
			statusText = "Lunas";
			statusColor = "background:#d4edda; color:#155724;";
		} else if (isCancelled) {
			statusClass = "status-cancelled";
			statusText = "Dibatalkan";
			statusColor = "background:#f8d7da; color:#721c24;";
		}

		// Format items list
		let itemsHtml = "";
		if (order.items && order.items.length > 0) {
			order.items.forEach((item) => {
				itemsHtml += `<li>${item.name} (${item.quantity}x)</li>`;
			});
		}

		const historyItem = document.createElement("div");
		historyItem.className = "history-item";
		// Ensure proper styling in new page
		historyItem.style.border = "1px solid #eee";
		historyItem.style.padding = "15px";
		historyItem.style.marginBottom = "15px";
		historyItem.style.borderRadius = "8px";

		historyItem.innerHTML = `
            <div class="history-header" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="font-weight:bold;">${order.date}</span>
                <span class="history-status ${statusClass}" style="padding:4px 8px; border-radius:4px; font-size:0.9em; ${statusColor}">${statusText}</span>
            </div>
            <div class="history-details">
                <ul class="history-items-list" style="list-style:none; padding:0; margin-bottom:10px;">${itemsHtml}</ul>
                <h4 style="margin-top:5px; text-align:right;">Total: ${formatRupiah(
									order.total
								)}</h4>
            </div>
            <div class="history-footer" style="margin-top:10px; border-top:1px solid #eee; padding-top:10px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.8rem; color:#888;">Order ID: ${
									order.id
								}</span>
                <div class="action-buttons" style="display:flex; gap:10px;">
                    ${
											!isPaid && !isCancelled && order.snapToken
												? `<button class="btn" style="background-color:#dc3545; color:white; padding:5px 15px; font-size:0.9rem;" onclick="cancelOrder('${order.id}')">Batalkan</button>
                               <button class="btn" style="background-color:#007bff; color:white; padding:5px 15px; font-size:0.9rem;" onclick="resumePayment('${order.id}', '${order.snapToken}')">Bayar Sekarang</button>`
												: ""
										}
                </div>
            </div>
        `;
		historyItemsContainer.appendChild(historyItem);
	});
};

// Global Cancel Function
window.cancelOrder = function (orderId) {
	Swal.fire({
		title: "Batalkan Pesanan?",
		text: "Anda yakin ingin membatalkan pesanan ini?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#d33",
		cancelButtonColor: "#3085d6",
		confirmButtonText: "Ya, Batalkan!",
		cancelButtonText: "Tidak",
	}).then((result) => {
		if (result.isConfirmed) {
			updateOrderStatus(orderId, "cancelled");
			Swal.fire(
				"Dibatalkan!",
				"Pesanan Anda telah dibatalkan.",
				"success"
			).then(() => {
				location.reload();
			});
		}
	});
};

// Global Resume Payment Function
window.resumePayment = function (orderId, token) {
	if (!token) return;

	// Resume Snap
	window.snap.pay(token, {
		onSuccess: function (result) {
			updateOrderStatus(orderId, "paid");
			Swal.fire({
				icon: "success",
				title: "Pembayaran Berhasil!",
				confirmButtonColor: "#28a745",
			}).then(() => {
				location.reload();
			});
		},
		onPending: function (result) {
			location.reload();
		},
		onError: function (result) {
			Swal.fire("Error", "Pembayaran gagal", "error");
		},
	});
};
