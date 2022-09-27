package com.example.squadmap.di

import com.example.squadmap.common.Constants.SEARCH_URL
import com.example.squadmap.data.dto.StoreSearchResultDTO
import com.example.squadmap.network.StoreSearchApi
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import javax.inject.Named
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    @Named("nonToken")
    fun provideNonTokenOkHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(
                HttpLoggingInterceptor().apply {
                    level = HttpLoggingInterceptor.Level.BODY
                }
            ).build()
    }

    @OptIn(ExperimentalSerializationApi::class)
    @Provides
    @Singleton
    fun provideStoreSearchApi(
        @Named("nonToken") okHttpClient: OkHttpClient
    ): StoreSearchApi {
        val contentType = "application/json".toMediaType()
        return Retrofit.Builder()
            .baseUrl(SEARCH_URL)
            .client(okHttpClient)
            .addConverterFactory(Json.asConverterFactory(contentType))
            .build()
            .create(StoreSearchApi::class.java)
    }

}
