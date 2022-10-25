package com.example.squadmap.di

import com.example.squadmap.data.datasource.*
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

    @Singleton
    @Binds
    abstract fun bindLoginDataSource(
        loginDataSourceImpl: LoginDataSourceImpl
    ): LoginDataSource

    @Singleton
    @Binds
    abstract fun bindProfileDataSource(
        proDataSourceImpl: ProfileDataSourceImpl
    ): ProfileDataSource

    @Singleton
    @Binds
    abstract fun bindMyMapDataSource(
        myMapDataSourceImpl: MyMapDataSourceImpl
    ): MyMapDataSource

}