let axios = require('axios')

module.exports = {
    actions: {
        async updateJWTIfNeeded(ctx, cookie) {
            if(ctx.state.jwt_token_cookie != cookie) {
                await ctx.commit('updateJWT', cookie)
                return true
            }
            return false
        },
        async me(ctx) {
            if(!ctx.state.jwt_token_cookie) return

            let { data } = await axios.get(ctx.rootState.host + '/users/me', {
                headers: {
                    'Authorization': ctx.getters.getJWT
                } 
            }).catch(({ response}) => {
                return response
                // this.$router.push('/')
            }).finally(() => {
            //   this.setRefferalCookie()
            })

            if(data?.error || data?.message) return null

            ctx.commit('updateUser', data)
            return data

        }
    },
    mutations: {
        updateJWT(state, jwt) {
            state.jwt_token_cookie = jwt
        },
        updateUser(state, newUser) {
            state.user = {
                ...state.user,
                newUser
            }
        },
    },
    state: {
        jwt_token_cookie: null,
        user: null,
    },
    getters: {
        getJWT(state) {
            return 'Bearer ' + state.jwt_token_cookie
        },
        getUser(state) {
            return {
                id: state.user._id,
                username: state.user.username,
                email: state.user.email,
                confirmation: state.user.confirmation,
                role: state.user.role,
                subscription: state.user.subscription,
                refferal: state.user.refferal,
                registration_date: state.user.registration_date,
            }
        }
    }
}