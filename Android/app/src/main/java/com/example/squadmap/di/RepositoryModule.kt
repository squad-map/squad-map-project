package com.example.squadmap.di

import com.example.squadmap.data.repository.StoreSearchRepository
import com.example.squadmap.data.repository.StoreSearchRepositoryImpl
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Singleton
    @Binds
    abstract fun bindStoreSearchRepository(
        storeSearchRepositoryImpl: StoreSearchRepositoryImpl
    ): StoreSearchRepository

}