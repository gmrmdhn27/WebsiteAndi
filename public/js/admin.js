// Auth & Navigation
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");

// Product Management
const productModal = document.getElementById("product-modal");
const productForm = document.getElementById("product-form");
// Use optional chaining or check existence, though in admin.html it should exist if dashboardSection exists
const productsTable = document
	.getElementById("products-table")
	.querySelector("tbody");

// Helper Info Default Products
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

// Check login status
if (localStorage.getItem("isAdminLoggedIn") === "true") {
	showDashboard();
}

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const user = document.getElementById("username").value;
	const pass = document.getElementById("password").value;

	if (user === "admin" && pass === "admin123") {
		localStorage.setItem("isAdminLoggedIn", "true");
		showDashboard();
		Swal.fire({
			icon: "success",
			title: "Login Berhasil",
			text: "Selamat datang kembali, Admin!",
			timer: 1500,
			showConfirmButton: false,
		});
	} else {
		Swal.fire({
			icon: "error",
			title: "Login Gagal",
			text: "Username atau Password salah!",
			confirmButtonColor: "#d33",
		});
	}
});

logoutBtn.addEventListener("click", () => {
	Swal.fire({
		title: "Konfirmasi Logout",
		text: "Apakah Anda yakin ingin keluar?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#dc3545",
		cancelButtonColor: "#6c757d",
		confirmButtonText: "Ya, Logout",
		cancelButtonText: "Batal",
	}).then((result) => {
		if (result.isConfirmed) {
			localStorage.removeItem("isAdminLoggedIn");
			location.reload();
		}
	});
});

function showDashboard() {
	loginSection.style.display = "none";
	dashboardSection.style.display = "block";
	loadProducts();
	loadOrders();
}

function switchTab(tabName) {
	document
		.querySelectorAll(".tab-content")
		.forEach((el) => el.classList.remove("active"));
	document
		.querySelectorAll(".tab-btn")
		.forEach((el) => el.classList.remove("active"));

	document.getElementById(tabName + "-tab").classList.add("active");
	document
		.querySelector(`button[onclick="switchTab('${tabName}')"]`)
		.classList.add("active");
}

function getProducts() {
	const stored = localStorage.getItem("products");
	if (!stored) {
		localStorage.setItem("products", JSON.stringify(defaultProducts));
		return defaultProducts;
	}
	return JSON.parse(stored);
}

function saveProducts(products) {
	localStorage.setItem("products", JSON.stringify(products));
	loadProducts();
}

function loadProducts() {
	const products = getProducts();
	productsTable.innerHTML = "";

	products.forEach((p, index) => {
		const row = `
            <tr>
                <td><img src="${
									p.image
								}" width="50" style="border-radius:4px;"></td>
                <td>${p.name}</td>
                <td>Rp ${p.price.toLocaleString("id-ID")}</td>
                <td>${p.desc}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editProduct(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteProduct(${index})">Hapus</button>
                </td>
            </tr>
        `;
		productsTable.innerHTML += row;
	});
}

// Modal Functions
function openProductModal() {
	document.getElementById("product-form").reset();
	document.getElementById("edit-index").value = "-1";
	document.getElementById("modal-title").textContent = "Tambah Produk";
	productModal.style.display = "flex";
}

function closeProductModal() {
	productModal.style.display = "none";
}

window.editProduct = function (index) {
	const products = getProducts();
	const p = products[index];

	document.getElementById("edit-index").value = index;
	document.getElementById("p-name").value = p.name;
	document.getElementById("p-price").value = p.price;
	document.getElementById("p-image").value = p.image;
	document.getElementById("p-desc").value = p.desc;

	document.getElementById("modal-title").textContent = "Edit Produk";
	productModal.style.display = "flex";
};

window.deleteProduct = function (index) {
	Swal.fire({
		title: "Hapus Produk?",
		text: "Anda tidak akan dapat mengembalikan ini!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#dc3545",
		cancelButtonColor: "#6c757d",
		confirmButtonText: "Ya, Hapus!",
		cancelButtonText: "Batal",
	}).then((result) => {
		if (result.isConfirmed) {
			const products = getProducts();
			products.splice(index, 1);
			saveProducts(products);
			Swal.fire("Terhapus!", "Produk telah dihapus.", "success");
		}
	});
};

productForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const index = parseInt(document.getElementById("edit-index").value);
	const newProduct = {
		name: document.getElementById("p-name").value,
		price: parseInt(document.getElementById("p-price").value),
		image: document.getElementById("p-image").value,
		desc: document.getElementById("p-desc").value,
	};

	const products = getProducts();

	if (index === -1) {
		products.push(newProduct);
	} else {
		products[index] = newProduct;
	}

	saveProducts(products);
	closeProductModal();
	Swal.fire({
		icon: "success",
		title: "Berhasil",
		text: "Produk berhasil disimpan!",
		timer: 1500,
		showConfirmButton: false,
	});
});

// Order Management
function loadOrders() {
	const orders = JSON.parse(localStorage.getItem("orders")) || [];
	const tableBody = document
		.getElementById("orders-table")
		.querySelector("tbody");
	tableBody.innerHTML = "";

	if (orders.length === 0) {
		tableBody.innerHTML =
			'<tr><td colspan="6" style="text-align:center;">Belum ada pesanan masuk.</td></tr>';
		return;
	}

	// Sort by newest
	orders.reverse().forEach((order) => {
		const row = `
            <tr>
                <td>${order.date}</td>
                <td>${order.name}</td>
                <td>${order.phone}</td>
                <td>Rp ${order.total.toLocaleString("id-ID")}</td>
                <td>${order.payment}</td>
                <td>
                    ${
											order.status === "paid"
												? '<span style="background:#28a745; color:white; padding:4px 8px; border-radius:4px; font-size:12px;">Sudah Dibayar</span>'
												: order.status === "cancelled"
												? '<span style="background:#dc3545; color:white; padding:4px 8px; border-radius:4px; font-size:12px;">Dibatalkan</span>'
												: '<span style="background:#ffc107; color:#222; padding:4px 8px; border-radius:4px; font-size:12px;">Menunggu Pembayaran</span>'
										}
                </td>
                <td>
                    ${
											order.status !== "paid" && order.status !== "cancelled"
												? `<button class="action-btn" style="background:#17a2b8;" onclick="markAsPaid('${order.id}')">Lunas</button>`
												: ""
										}
                    <button class="action-btn delete-btn" onclick="deleteOrder('${
											order.id
										}')">Hapus</button>
                </td>
            </tr>
        `;
		tableBody.innerHTML += row;
	});
}

// Order Actions
window.deleteOrder = function (id) {
	Swal.fire({
		title: "Hapus Pesanan?",
		text: "Data pesanan akan dihapus permanen.",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#dc3545",
		confirmButtonText: "Hapus",
		cancelButtonText: "Batal",
	}).then((result) => {
		if (result.isConfirmed) {
			let orders = JSON.parse(localStorage.getItem("orders")) || [];
			orders = orders.filter((o) => o.id !== id);
			localStorage.setItem("orders", JSON.stringify(orders));
			loadOrders();
			Swal.fire("Terhapus", "Pesanan telah dihapus.", "success");
		}
	});
};

window.markAsPaid = function (id) {
	let orders = JSON.parse(localStorage.getItem("orders")) || [];
	const index = orders.findIndex((o) => o.id === id);
	if (index !== -1) {
		orders[index].status = "paid";
		localStorage.setItem("orders", JSON.stringify(orders));
		loadOrders();
		Swal.fire(
			"Berhasil",
			"Status pesanan diubah menjadi: Sudah Dibayar",
			"success"
		);
	}
};
