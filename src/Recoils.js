import { atom } from 'recoil'

export const outputFollowState = atom({
    key: 'outputFollowState',
    default : {
        outputKr : '',
        outputEng : '',
        outputLength: 0,
        tempLength: 0,
    }
})


export const FollowSettingState = atom({
    key: 'FollowSettingState',
    default : {
        Main_character: "",
        Place: "",
        Time: "",
        Main_Events: "",
        Theme: "",
    }
})
export const FollowSelectOption = atom({
    key: 'FollowSelectOption',
    default : ''
})

