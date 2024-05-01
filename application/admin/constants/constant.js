import { ThirdwebSDK } from '@thirdweb-dev/sdk';

export const SDK = new ThirdwebSDK('sepolia');

export const CONTRACT_PRODUCT_ADDRESS = '0x55A9a7e1c45FF45e3Ff4b8295BD901025ce0e554';
export const CONTRACT_CATERGOTY_ADDRESS = '0xad56Ed62ec7Cb322c7546D9a560686E031EE472C';
export const CONTRACT_STORE_ADDRESS = '0x9875AE8810A4182e472d9bD29A674570739F3F6D';

export function bigNumberToString(productId) {
    if (productId?._isBigNumber) {
        return productId.toString();
    } else {
        return parseInt(productId?.hex, 16).toString();
    }
}

export function numberWithCommas(numberString) {
    // Chuyển chuỗi số thành số nguyên
    const number = parseInt(numberString);
    // Kiểm tra nếu không phải là số
    if (isNaN(number)) return 'Invalid number';

    // Chuyển số thành chuỗi và định dạng bằng cách thêm dấu phẩy sau mỗi 3 chữ số từ phải sang trái
    return number.toLocaleString('vi-VN');
}
