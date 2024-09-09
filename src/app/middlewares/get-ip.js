let ipBlackList = {};

const limitIpCallApiView = async (req, res, next) => {
    const ip = req.socket.remoteAddress;
    const current_time = Date.now();

    if (!ipBlackList[ip]) {
        ipBlackList[ip] = []; // Nếu chưa có IP thì khởi tạo array thời gian gọi API 
    }

    // Loại bỏ các IP có thời gian gọi trên 1 phút
    ipBlackList[ip] = ipBlackList[ip].filter(e => current_time - e < 60000);

    // Giới hạn số lần gọi trong 1 phút
    if (ipBlackList[ip].length >= 5) {
        return res.status(400).json({
            message: 'Đừng spam nha!',
            status: false,
        });
    }

    // Nếu không, tiếp tục gọi API
    ipBlackList[ip].push(current_time);
    next();
}

module.exports = { limitIpCallApiView }