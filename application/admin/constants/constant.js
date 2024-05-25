import { ThirdwebSDK } from '@thirdweb-dev/sdk';

//localhost
export const SDK = new ThirdwebSDK('sepolia');

export const CONTRACT_PRODUCT_ADDRESS = '0xaDa44A194A24a82c9Bfc13f5b6d112bF4d698Aa9';
export const CONTRACT_CATEGORY_ADDRESS = '0xdd3Db257875352D8F60C1c635bC10adB8b71a7CD';
export const CONTRACT_AUTH_ADDRESS = '0xf4B44c8858aae0179be511c4F6a1370eFeFF84eE';
export const CONTRACT_ORDER_ADDRESS = '0x3e8bEC409B1ebA5b381f5d35D6D4EDd129B9c2e2';

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
