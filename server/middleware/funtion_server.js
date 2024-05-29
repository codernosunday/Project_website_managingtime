
const TG_Class_LyThuyet = (SiSo, SoTiet) => {
    var vuot = SiSo - 40;
    if (vuot <= 0 || SoTiet == 0) {
        return 0;
    }
    else if (vuot >= 1 && vuot <= 19) {
        return 0.1 * SoTiet;
    }
    else if (vuot > 19 && vuot <= 29) {
        return 0.2 * SoTiet;
    }
    else if (vuot > 29 && vuot <= 39) {
        return 0.3 * SoTiet;
    }
    else if (vuot > 39 && vuot <= 49) {
        return 0.4 * SoTiet;
    }
    else if (vuot > 49 && vuot <= 59) {
        return 0.5 * SoTiet;
    }
    else {
        return "Chia 2 lớp";
    }
};
const TG_Class_ThucHanh = (SiSo, SoGio) => {
    var vuot = SiSo - 25;
    if (vuot <= 0 || SoGio == 0) {
        return 0;
    }
    else if (vuot >= 5 && vuot <= 10) {
        return 0.1 * SoGio;
    }
    else if (vuot > 10 && vuot <= 15) {
        return 0.2 * SoGio;
    }
    else if (vuot > 15 && vuot <= 20) {
        return 0.3 * SoGio;
    }
    else {
        return 0;
    }
};
module.exports = {
    TG_Class_LyThuyet,
    TG_Class_ThucHanh
};
