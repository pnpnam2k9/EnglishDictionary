document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn việc gửi form mặc định

    // Lấy thông tin từ các trường input và loại bỏ khoảng trắng ở đầu và cuối
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Kiểm tra nếu các trường input có rỗng không
    if (!username || !email || !password) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Lấy thông tin người dùng hiện có trong localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra nếu email đã được sử dụng
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('Email này đã được sử dụng!');
    } else {
        // Lưu thông tin người dùng vào mảng users
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        users.push(newUser);

        // Lưu mảng người dùng vào localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Thông báo người dùng đăng ký thành công và chuyển hướng đến trang đăng nhập
        alert('Đăng ký thành công!');
        window.location.href = '/Hlogin.html'; // Chuyển hướng tới trang đăng nhập
    }
});
