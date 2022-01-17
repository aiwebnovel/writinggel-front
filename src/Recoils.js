import { atom, selector } from 'recoil'

export const ProfileState = atom({
    key: 'ProfileState',
    default : {
        userName: "",
        userImage: `/user_colored.png`,
        isBill: "",
        Plan: "",
        membership_count : '',
        stopPayWish:''
    }
})

export const KakaoProfile = selector({
    key: 'KakaoProfile',
    get: (get) => {

    }
})