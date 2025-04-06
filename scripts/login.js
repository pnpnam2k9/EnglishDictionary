document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngừng hành động mặc định của form (không reload trang)

    // Lấy giá trị từ các input
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Lấy thông tin người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || []; // Đọc danh sách người dùng từ localStorage

    // Tìm người dùng có email trùng khớp
    const user = users.find(u => u.email === email);

    if (user && user.password === password) {
        alert("Đăng nhập thành công!");
        // Chuyển hướng đến trang chính sau khi đăng nhập thành công
        window.location.href = "Hmain.html"; // Thay "homepage.html" bằng trang bạn muốn chuyển đến
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
});
