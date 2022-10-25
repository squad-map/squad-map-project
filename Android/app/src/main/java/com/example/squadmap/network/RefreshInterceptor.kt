package com.example.squadmap.network

import com.example.squadmap.common.AppSession
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class RefreshInterceptor @Inject constructor(
    private val appSession: AppSession
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val jwt = appSession.jwt

        val requestBuilder = chain.request()
            .newBuilder()

        jwt?.let {
            requestBuilder.addHeader(
                "Authorization",
                "Bearer ${it.refreshToken}"
            )
        }

        return chain.proceed(requestBuilder.build())
    }
}
