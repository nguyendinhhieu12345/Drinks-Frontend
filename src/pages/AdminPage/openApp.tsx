import React from 'react';

const openApp = () => {
    const appUrlScheme = 'myapp://'; // Deep link URL scheme của ứng dụng của bạn
    const appStoreUrl = 'https://apps.apple.com/app/id1234567890'; // URL tới App Store của ứng dụng của bạn
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.myapp'; // URL tới Play Store của ứng dụng của bạn
    const windowsStoreUrl = 'ms-windows-store://pdp/?productid=9WZDNCRFJ3TJ'; // URL tới Microsoft Store của ứng dụng của bạn
    const macStoreUrl = 'macappstore://itunes.apple.com/app/id1234567890'; // URL tới Mac App Store của ứng dụng của bạn

    const userAgent = navigator.userAgent || navigator.vendor;

    // Kiểm tra nếu là thiết bị iOS
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.location.href = appUrlScheme;
        setTimeout(() => {
            window.location.href = appStoreUrl;
        }, 2000);
    } else if (/android/i.test(userAgent)) {
        window.location.href = appUrlScheme;
        setTimeout(() => {
            window.location.href = playStoreUrl;
        }, 2000);
    } else if (/Win/.test(userAgent)) {
        window.location.href = windowsStoreUrl;
    } else if (/Mac/.test(userAgent)) {
        window.location.href = macStoreUrl;
    } else {
        alert('Deep linking is not supported on this device.');
    }
};

const OpenAppButton: React.FC = () => {
    return (
        <button onClick={openApp}>
            Open My App
        </button>
    );
};

export default OpenAppButton;
