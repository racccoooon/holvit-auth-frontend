import { v4 as uuidv4 } from 'uuid';


export function useDeviceId() {
    let deviceIdentifier = localStorage.getItem('deviceIdentifier');
    if (!deviceIdentifier) {
        deviceIdentifier = uuidv4();
        localStorage.setItem('deviceIdentifier', deviceIdentifier);
    }
    return deviceIdentifier;
}