package com.example.squadmap.network

import com.example.squadmap.common.AppSession
import com.example.squadmap.data.repository.LoginRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.*
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthInterceptor @Inject constructor(
    private val appSession: AppSession,
    private val loginRepository: LoginRepository,
) : Interceptor, Authenticator {

    override fun intercept(chain: Interceptor.Chain): Response {

        val jwt = appSession.jwt

        val requestBuilder = chain.request()
            .newBuilder()

        jwt?.let {
            requestBuilder.addHeader(
                "Authorization",
                "Bearer ${it.accessToken}"
            )
        }

        return chain.proceed(requestBuilder.build())
    }

    override fun authenticate(route: Route?, response: Response): Request? {
        val token = runBlocking(Dispatchers.IO) {
            val jwt = appSession.jwt
            val tokenCode = jwt?.let {
                loginRepository.saveJwt(it)
//                loginRepository.setAppSession(tokenCode)
                it
            }
            tokenCode
        } ?: return null

        return response.request
            .newBuilder()
            .removeHeader("Authorization")
            .addHeader("Authorization", token.accessToken)
            .build()
    }
}
