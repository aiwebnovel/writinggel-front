import { atom, selector } from 'recoil'

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

// export const OutputSelect = selector({
//     key:'OutputSelect',
//     get: ({get}) => {
//         const output = get(outputFollowState)
        
//     }
// })

// export const PlanSelect = selector({
//     key:'PlanSelect',
//     get: ({get}) => {
//         const plan = get(PayPlanState)
//         return parseInt(plan);
//     }
// })

