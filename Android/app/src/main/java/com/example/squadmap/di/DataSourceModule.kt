package com.example.squadmap.di

import com.example.squadmap.data.datasource.StoreSearchDataSource
import com.example.squadmap.data.datasource.StoreSearchDataSourceImpl
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class DataSourceModule {

    @Singleton
    @Binds
    abstract fun bindStoreSearchDataSource(
        storeSearchDataSourceImpl: StoreSearchDataSourceImpl
    ): StoreSearchDataSource
}