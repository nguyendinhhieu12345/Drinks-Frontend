import { Server } from "socket.io";

const io = new Server(8900, {
    cors: {
        origin: "http://localhost:3001",
        credentials: true
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        socket.broadcast.emit('message', msg);
    });

    // user tạo => screen emp => create order
    // user tạo => screen take away, delevẻy => create order
    socket.on("user_create_order", (data) => {
        io.to(data.branchId).emit("user_create_order", {
            orderId: data.orderId
        })
    })

    // user hủy đơn => socket client update => emp
    // employeeId == null ? "reload all branch" : "reload order detail hoac order all of employeeId"
    // screen take away, delevery, order detail
    socket.on("user_update_order", (data) => {
        io.to(data.branchId).emit("user_update_order", {
            orderId: data.orderId,
            employeeId: data.employeeId
        })
    })

    // employee update status order => client (all status)
    // screen order detail web, app
    socket.on("employee_update_order", (data) => {
        io.to(data.userId).emit("employee_update_order", {
            orderId: data.orderId
        })
    })

    // employee update status order => client (create) => employee cùng chi nhánh cập nhập lại đơn order đã được nhận => empl khác
    // screen order detail web, app - delevery, takeaway app
    socket.on("employee_update_order_same_branch", (data) => {
        io.to(data.branchId).emit("employee_update_order_same_branch", {
            orderId: data.orderId
        })
    })

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

console.log("Socket server is running on port 8900");
