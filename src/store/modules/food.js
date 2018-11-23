const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

const food = {
    namespaced: true,
    state: {
        criticType: {
            POSITIVE: POSITIVE,
            NEGATIVE: NEGATIVE,
            ALL: ALL
        },
        selectType: ALL,
        onlyContent: false,
        desc: {
            positive: '满意',
            negative: '不满意',
            all: '全部'
        }
    },
    mutations: {
        initialize(state, payload) {
            state.selectType = payload.selectType
            state.onlyContent = payload.onlyContent
            state.desc = payload.desc
        },
        modifSelectType(state, payload) {
            state.selectType = payload.selectType
        },
        modifOnlyContent(state, payload) {
            state.onlyContent = payload.onlyContent
        },
    }
}

export default food